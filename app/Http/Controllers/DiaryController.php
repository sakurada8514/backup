<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDiary;
use App\Diary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DiaryController extends Controller
{
    //日記作成処理
    public function create(StoreDiary $request, Diary $diary)
    {
        //日記作成データ配列
        $diaryData = [
            'currency' => $request->currency,
            'entry_at' => $request->entry_at,
            'entry_rate' => $request->entry_rate,
            'position' => $request->position,
            'lot' => $request->lot,
            'rationale' => $request->rationale,
            'result' => $request->result,
        ];

        //エントリー時の画像があればawss3へ保存
        if (!empty($request->entry_img)) {
            $request->validate([
                'entry_img' => 'image|max:500'
            ]);

            $entry_img_post = $request->entry_img;
            $entry_img_path = Storage::disk('s3')->put('fxdiary', $entry_img_post, 'public');

            //ファイル名を日記作成データ配列へ加える
            $diaryData += ['entry_img' => $entry_img_path];
        }

        //エグジット時の画像があればawss3へ保存
        if (!empty($request->exit_img)) {
            $request->validate([
                'exit_img' => 'image|max:500'
            ]);

            $exit_img_post = $request->exit_img;
            $exit_img_path = Storage::disk('s3')->put('fxdiary', $exit_img_post, 'public');

            //ファイル名を日記作成データ配列へ加える
            $diaryData += ['exit_img' => $exit_img_path];
        }

        //結果がエントリー中でなければ（損切りまたは利確）エグジットデータを保存
        if (!($request->result === 'entry')) {
            $request->validate([
                'exit_at' => 'required|date',
                'exit_rate' => 'required|numeric',
                'reflection' => 'required',
                'settlement' => 'required|numeric'
            ]);

            //結果が損切りの場合決済損益の数値を負数にする
            if ($request->result === 'lose') {
                $settlement_post = $request->settlement;
                $settlement = -$settlement_post;
            } else {
                $settlement = $request->settlement;
            }

            //エグジットデータを日記作成データ配列へ加える
            $diaryData += [
                'exit_at' => $request->exit_at,
                'exit_rate' => $request->exit_rate,
                'reflection' => $request->reflection,
                'settlement' => $settlement
            ];
        }

        //DBへ保存
        Auth::user()->diaries()->save($diary->fill($diaryData));

        //ログイン中ユーザーの日記一覧を取得（エントリー日時順）し返却
        $diariesData = Auth::user()->diaries()->orderByDesc('entry_at')->get();

        return $diariesData;
    }


    //日記編集処理
    public function update(StoreDiary $request, string $id)
    {
        //更新する日記取得
        $diary = Diary::find($id);

        //基本的には作成と同じ処理
        $diaryData = [
            'currency' => $request->currency,
            'entry_at' => $request->entry_at,
            'entry_rate' => $request->entry_rate,
            'position' => $request->position,
            'lot' => $request->lot,
            'rationale' => $request->rationale,
            'result' => $request->result,
        ];

        $disk = Storage::disk('s3');

        if (!empty($request->entry_img)) {
            //もし編集前に画像データがあった場合s3の古い画像削除後新しい画像保存
            if ($diary->entry_img) {
                $disk->delete($diary->entry_img);
            }

            $request->validate([
                'entry_img' => 'image|max:500'
            ]);

            $entry_img_post = $request->entry_img;
            $entry_img_path = $disk->put('fxdiary', $entry_img_post, 'public');

            $diaryData += ['entry_img' => $entry_img_path];
        }

        if (!empty($request->exit_img)) {
            if ($diary->exit_img) {
                $disk->delete($diary->exit_img);
            }

            $request->validate([
                'exit_img' => 'image|max:500'
            ]);

            $exit_img_post = $request->exit_img;
            $exit_img_path = $disk->put('fxdiary', $exit_img_post, 'public');

            $diaryData += ['exit_img' => $exit_img_path];
        }

        if (!($request->result === 'entry')) {
            $request->validate([
                'exit_at' => 'required|date',
                'exit_rate' => 'required|numeric',
                'reflection' => 'required',
                'settlement' => 'required|numeric'
            ]);

            if ($request->result === 'lose') {
                $settlement_post = $request->settlement;
                $settlement = -$settlement_post;
            } else {
                $settlement = $request->settlement;
            }

            $diaryData += [
                'exit_at' => $request->exit_at,
                'exit_rate' => $request->exit_rate,
                'reflection' => $request->reflection,
                'settlement' => $settlement
            ];
        }

        //日記更新
        $diary->fill($diaryData)->save();

        //ログイン中のユーザーの日記一覧を取得（エントリー日時順）し返却
        $diariesData = Auth::user()->diaries()->orderByDesc('entry_at')->get();

        return $diariesData;
    }

    //日記削除処理
    public function delete(string $id)
    {
        $diary = Diary::find($id);
        $disk = Storage::disk('s3');

        //画像がある場合s3の画像削除
        if ($diary->entry_img) {
            $disk->delete($diary->entry_img);
        }
        if ($diary->exit_img) {
            $disk->delete($diary->exit_img);
        }

        //日記削除
        $diary->delete();

        //ログイン中のユーザーの日記一覧を取得（エントリー日時順）し返却
        $diariesData = Auth::user()->diaries()->orderByDesc('entry_at')->get();
        return $diariesData;
    }

    public function analysis()
    {
        $diariesData = Auth::user()->diaries()->get();

        $winCount = $diariesData->where('result', 'win')->count();
        $settledCount = $diariesData->where('result', '<>', 'entry')->count();
        $winRate = round($winCount / $settledCount * 100, 1);

        $totalProfitAndLoss = $diariesData->sum('settlement');

        $currency = DB::table('diaries')->where('user_id', Auth::user()->id)
            ->select(DB::raw('count(*) as currency_count, currency'))
            ->groupBy('currency')
            ->get();

        $position = DB::table('diaries')->where('user_id', Auth::user()->id)
            ->select(DB::raw('count(*) as position_count, position'))
            ->groupBy('position')
            ->get();

        return [
            'winRate' => $winRate,
            'totalProfitAndLoss' => $totalProfitAndLoss,
            'currency' => $currency,
            'position' => $position
        ];
    }
}

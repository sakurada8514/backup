<?php

namespace App\Http\Controllers;

use App\ShareDiary;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    //ログイン中のユーザー情報とMY日記一覧を返却
    public function userCheck()
    {
        $user = Auth::user();

        if ($user) {
            $diaries = $user->diaries()->orderByDesc('entry_at')->get();
        } else {
            $diaries = [];
        }

        return ['user' => $user, 'diaries' => $diaries];
    }

    //プロフィール変更処理
    public function profileUpdate(Request $request)
    {
        $request->validate([
            'img' => 'required|image|max:500',
            'name' => 'max:20'
        ]);

        $user = User::find(Auth::user()->id);
        $disk = Storage::disk('s3');

        //古いプロフィール画像を削除
        if ($user->img) {
            $disk->delete($user->img);
        }

        //s３へ保存後パスをDBへ保存
        $img_post = $request->img;
        $img_path = $disk->put('fxdiary', $img_post, 'public');

        $userData = ['img' => $img_path, 'name' => $request->name];

        $user->fill($userData)->save();

        return ['user' => $user];
    }

    //ログイン中ユーザーが投稿している共有日記取得　無限スクロールのため10件ずつ
    public function shareDiariesRead()
    {
        $id = Auth::user()->id;
        $shareDiaries = ShareDiary::where('user_id', $id)->with('diary', 'user')->orderBy(ShareDiary::CREATED_AT, 'desc')->paginate(10);

        return $shareDiaries;
    }

    //ログイン中ユーザーがいいねしている共有日記取得
    public function referenceShareDiariesRead()
    {
        $user = Auth::user();

        $referenceShareDiaries = $user->references()->with('diary', 'user')->orderBy(ShareDiary::CREATED_AT, 'desc')->paginate(10);

        return $referenceShareDiaries;
    }
}

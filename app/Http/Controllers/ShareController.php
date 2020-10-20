<?php

namespace App\Http\Controllers;

use App\Comment;
use App\ShareDiary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShareController extends Controller
{

    //共有日記一覧取得
    public function read()
    {
        //日記データとユーザーデータを一緒に取得（作成日順）無限スクロールのため10件ずつ
        $shareDiaries = ShareDiary::with('diaries', 'users')->orderBy(ShareDiary::CREATED_AT, 'desc')->paginate(10);

        return $shareDiaries;
    }

    public function ranking()
    {
        //日記データとユーザーデータを一緒に取得（作成日順）無限スクロールのため10件ずつ
        $shareDiaryRanking = ShareDiary::withCount('references')->with('diaries', 'users')->orderBy('references_count', 'desc')->paginate(10);

        return $shareDiaryRanking;
    }

    //日記投稿処理
    public function create(Request $request, ShareDiary $shareDiary)
    {
        //日記タイトルと日記IDを保存
        $request->validate([
            'title' => 'required|max:50',
            'id' => 'required|unique:share_diaries,diaries_id|numeric'
        ]);

        $formData = [
            'title' => $request->title,
            'diaries_id' => $request->id,
        ];

        Auth::user()->shareDiaries()->save($shareDiary->fill($formData));

        return $shareDiary;
    }

    //共有日記詳細
    public function readDetails(string $id)
    {
        //日記データとユーザーデータを一緒に取得
        $shareDiary = ShareDiary::where('id', $id)->with('diaries', 'users', 'comments.user')->first();

        return $shareDiary;
    }

    public function delete(string $id)
    {
        $shareDiary = ShareDiary::find($id);

        //日記削除
        $shareDiary->delete();

        return ;
    }

    public function reference(string $id)
    {
        $shareDiary = ShareDiary::where('id', $id)->with('references')->first();

        if(!$shareDiary){
            abort(404);
        }

        $shareDiary->references()->detach(Auth::user()->id);
        $shareDiary->references()->attach(Auth::user()->id);

        return ['shareDiary_id' => $id];
    }
    public function unreference(string $id)
    {
        $shareDiary = ShareDiary::where('id', $id)->with('references')->first();

        if(!$shareDiary){
            abort(404);
        }

        $shareDiary->references()->detach(Auth::user()->id);

        return ['shareDiary_id' => $id];
    }

    public function addComment(Request $request, string $id)
    {
        
        $request->validate([
            'content' => 'required|max:100'
        ]);

        $shareDiary = ShareDiary::where('id', $id)->first();

        $formData = [
            'content' => $request->content,
            'user_id' => Auth::user()->id,
            'share_diaries_id' => $shareDiary->id
        ];

        $comment = new Comment();

        $shareDiary->comments()->save($comment->fill($formData));

        $newComment = Comment::where('id', $comment->id)->with('user')->first();

        return $newComment;
    }

}

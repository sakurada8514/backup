<?php

namespace Tests\Feature;

use App\Comment;
use App\Diary;
use App\ShareDiary;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

//Commentモデルテスト
class CommentTest extends TestCase
{
    use RefreshDatabase;

    //ファクトリーが使えることを確認
    /**
     * @test
     */
    public function testFactoryable()
    {
        $eloquent = app(Comment::class);
        $this->assertEmpty($eloquent->get()); 
        $entity = factory(Comment::class)->create([
            'share_diaries_id' => 1
        ]); 
        $this->assertNotEmpty($eloquent->get());
    }

    //ユーザーとのリレーション
    /**
     * @test
     */
    public function commentBelongsToUser()
    {
        $shareDiaryEloquent = app(ShareDiary::class);
        $diaryEloquent = app(Diary::class);
        $commentEloquent = app(Comment::class);
        $user = factory(User::class)->create();
        $diary = factory(Diary::class)->create([
            'user_id' => $user->id
        ]); 
        $shareDiary = factory(ShareDiary::class)->create([
            'user_id' => $diary->user_id,
            'diaries_id' => $diary->id,
        ]); 
        $comment = factory(Comment::class)->create([
            'user_id' => $shareDiary->user_id,
            'share_diaries_id' => $shareDiary->id
        ]);
        $this->assertNotEmpty($comment->refresh()->user);
    }
}

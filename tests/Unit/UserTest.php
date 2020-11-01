<?php

namespace Tests\Feature;

use App\Diary;
use App\ShareDiary;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


//Userモデルテスト
class UserTest extends TestCase
{
    use RefreshDatabase;

    //ファクトリーが使えることを確認
    /**
     * @test
     */
    public function testFactoryable()
    {
        $eloquent = app(User::class);
        $this->assertEmpty($eloquent->get()); 
        $entity = factory(User::class)->create(); 
        $this->assertNotEmpty($eloquent->get());
    }

    //日記とのリレーションテスト
    /**
     * @test
     */
    public function UserHasManyDiaries()
    {
        $count = 5;
        $userEloquent = app(User::class);
        $diaryEloquent = app(Diary::class);
        $user = factory(User::class)->create();
        $diaries = factory(Diary::class, $count)->create([
            'user_id' => $user->id,
        ]); 
        $this->assertEquals($count, count($user->refresh()->diaries));
    }

    //共有日記とのリレーションテスト
    /**
     * @test
     */
    public function UserHasManyShareDiaries()
    {
        $count = 5;
        $userEloquent = app(User::class);
        $sharediaryEloquent = app(ShareDiary::class);
        $user = factory(User::class)->create();
        $shareDiaries = factory(ShareDiary::class, $count)->create([
            'user_id' => $user->id,
        ]); 
        $this->assertEquals($count, count($user->refresh()->shareDiaries));
    }
}

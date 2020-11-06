<?php

namespace Tests\Feature;

use App\Diary;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

//Diaryモデルテスト
class DiaryTest extends TestCase
{
    use RefreshDatabase;

    //ファクトリーが使えることを確認
    /**
     * @test
     */
    public function testFactoryable()
    {
        $userEloquent = app(User::class);
        $eloquent = app(Diary::class);
        $this->assertEmpty($eloquent->get()); 
        $user = factory(User::class)->create();
        $entity = factory(Diary::class)->create([
            'user_id' => $user->id
        ]); 
        $this->assertNotEmpty($eloquent->get());
    }
}

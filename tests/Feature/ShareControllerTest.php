<?php

namespace Tests\Feature;

use App\Diary;
use App\ShareDiary;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShareControllerTest extends TestCase
{
    use RefreshDatabase;
    public function setUp(): void
    {
        parent::setUp();

        // テストユーザー作成
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_正しい構造のJSONを返却する()
    {
        factory(Diary::class, 2)->create()->each(function ($diary) {
            factory(ShareDiary::class)->create([
                'diaries_id' => $diary->id,
                'user_id' => $diary->user_id
            ]);
        });

        $response = $this->actingAs($this->user)->json('GET', route('share.read'));

        // 生成した写真データを作成日降順で取得
        $shareDiaries = ShareDiary::with('diaries', 'users')->orderBy(ShareDiary::CREATED_AT, 'desc')->paginate(10);

        // data項目の期待値
        // $expected_data =
        //     $shareDiaries->map(function ($shareDiary) {
        //         return [
        //             'id' => $shareDiary->id,
        //             'created_at' => $shareDiary->created_at,
        //             'title' => $shareDiary->title,
        //             'references_count' => 0,
        //             'referenced_by_user' => false,
        //             'diaries' => $shareDiary->diaries,
        //             'users' => [
        //                 'name' => $shareDiary->users->name,
        //                 'img_url' => $shareDiary->users->img_url
        //             ],
        //         ];
        //     })->all();

        $response->assertStatus(200)
            // レスポンスJSONのdata項目に含まれる要素が2つであること
            ->assertJsonCount(2, 'data');
            // レスポンスJSONのdata項目が期待値と合致すること
            // ->assertJsonFragment([
            //     'data' => $expected_data
            // ]);
    }
} 

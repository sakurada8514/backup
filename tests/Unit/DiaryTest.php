<?php

namespace Tests\Feature;

use App\Diary;
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
        $eloquent = app(Diary::class);
        $this->assertEmpty($eloquent->get()); 
        $entity = factory(Diary::class)->create(); 
        $this->assertNotEmpty($eloquent->get());
    }
}

<?php

namespace Tests\Feature;

use App\Diary;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Support\Str;

class DiaryControllerTest extends TestCase
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
    public function should_エントリーのみで日記を作成できる()
    {
        $data = [
            'currency' => 'EUR/JPY',
            'entry_at' => date("Y-m-d H:i:s"),
            'entry_rate' => rand(),
            'position' => 'long',
            'lot' => 10,
            'rationale' => Str::random(40),
            'result' => 'entry',
        ];

        $response = $this->actingAs($this->user)
            ->json('POST', route('diaries.create'), $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('diaries', ['entry_at' => $data['entry_at'], 'entry_rate' => $data['entry_rate']]);
    }

    /**
     * @test
     */
    public function should_エントリーとエグジットの日記を作成できる()
    {
        $data = [
            'currency' => 'EUR/JPY',
            'entry_at' => date("Y-m-d H:i:s"),
            'entry_rate' => rand(),
            'position' => 'long',
            'lot' => 10,
            'rationale' => Str::random(40),
            'result' => 'win',
            'exit_at' => date("Y-m-d H:i:s"),
            'exit_rate' => rand(),
            'reflection' => Str::random(40),
            'settlement' => rand()
        ];

        $response = $this->actingAs($this->user)
            ->json('POST', route('diaries.create'), $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('diaries', ['exit_at' => $data['exit_at'], 'exit_rate' => $data['exit_rate']]);
    }

    /**
     * @test
     */
    public function should_画像がある場合画像を保存できる()
    {
        Storage::fake('s3');

        $data = [
            'currency' => 'EUR/JPY',
            'entry_at' => date("Y-m-d H:i:s"),
            'entry_rate' => rand(),
            'position' => 'long',
            'lot' => 10,
            'rationale' => Str::random(40),
            'result' => 'win',
            'exit_at' => date("Y-m-d H:i:s"),
            'exit_rate' => rand(),
            'reflection' => Str::random(40),
            'settlement' => rand(),
            'exit_img' => UploadedFile::fake()->image('exit.jpg'),
            'entry_img' => UploadedFile::fake()->image('entry.jpg'),
        ];

        $response = $this->actingAs($this->user)
            ->json('POST', route('diaries.create'), $data);

        $diary = Diary::first();

        $response->assertStatus(200);

        Storage::cloud()->assertExists($diary->entry_img);
    }

    /**
     * @test
     */
    public function should_日記を編集できる()
    {
        $diary = factory(Diary::class)->create();

        Storage::fake('s3');

        $data = [
            'currency' => 'EUR/USD',
            'entry_at' => date("Y-m-d H:i:s"),
            'entry_rate' => rand(),
            'position' => 'short',
            'lot' => 10,
            'rationale' => Str::random(40),
            'result' => 'win',
            'exit_at' => date("Y-m-d H:i:s"),
            'exit_rate' => rand(),
            'reflection' => Str::random(40),
            'settlement' => rand(),
            'exit_img' => UploadedFile::fake()->image('exit.jpg'),
            'entry_img' => UploadedFile::fake()->image('entry.jpg'),
        ];

        $response = $this->actingAs($this->user)
            ->json('POST', route('diaries.update', [$diary->id]), $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('diaries', ['entry_at' => $data['entry_at'], 'entry_rate' => $data['entry_rate']]);
    }

    /**
     * @test
     */
    public function should_日記を削除できる()
    {
        Storage::fake('s3');
        $diary = factory(Diary::class)->create();

        $response = $this->actingAs($this->user)
            ->json('POST', route('diaries.delete', [$diary->id]));

        $response->assertStatus(200);
        $this->assertDatabaseMissing('diaries', ['id' => $diary->id]);
    }
}

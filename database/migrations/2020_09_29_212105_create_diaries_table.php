<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    //日記テーブル
    public function up()
    {
        Schema::create('diaries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->string('currency',);
            $table->string('entry_img')->nullable();
            $table->string('exit_img')->nullable();
            $table->dateTime('entry_at');
            $table->dateTime('exit_at')->nullable();
            $table->double('entry_rate');
            $table->double('exit_rate')->nullable();
            $table->string('position');
            $table->bigInteger('lot');
            $table->text('rationale');
            $table->text('reflection')->nullable();
            $table->string('result');
            $table->bigInteger('settlement')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('diaries');
    }
}

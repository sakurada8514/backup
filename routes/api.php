<?php

use App\Http\Controllers\DiaryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//会員登録
Route::post('/register', 'Auth\RegisterController@register')->name('register');

//ログイン
Route::post('/login', 'Auth\LoginController@login')->name('login');

//ログアウト
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

//ログイン中のユーザー情報
Route::get('/user', 'UserController@userCheck')->name('user');

//認証が必要
Route::group(['middleware' => 'auth'], function () {
    //日記作成
    Route::post('/diaries', 'DiaryController@create')->name('diaries.create');

    //日記編集
    Route::post('/diaries/{id}', 'DiaryController@update')->name('diaries.update');

    //日記削除
    Route::post('/diaries/{id}/delete', 'DiaryController@delete')->name('diaries.delete');

    //分析
    Route::get('/analysis', 'DiaryController@analysis')->name('analysis');

    //プロフィール更新
    Route::post('/user/update', 'UserController@update')->name('user.update');

    //ログイン中のユーザーが投稿しいる日記取得
    Route::get('/user/share', 'UserController@shareDiariesRead')->name('user.shareDiariesRead');
    Route::get('/user/share/reference', 'UserController@referenceShareDiariesRead')->name('user.referenceShareDiariesRead');

    //投稿した日記削除
    Route::post('/share/delete/{id}', 'ShareController@delete')->name('share.delete');

    //日記投稿
    Route::post('/share', 'ShareController@create')->name('share.create');
    Route::post('/share/{id}/reference', 'ShareController@reference')->name('share.reference');
    Route::post('/share/{id}/unreference', 'ShareController@unreference')->name('share.unreference');

    //共有日記取得
    Route::get('/share', 'ShareController@read')->name('share.read');
    Route::get('/share/ranking', 'ShareController@ranking')->name('share.ranking');

    //共有日記詳細取得
    Route::get('/share/{id}', 'ShareController@readDetails')->name('share.readDetails');
});

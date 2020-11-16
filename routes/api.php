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
    Route::group(['prefix' => 'diaries', 'as' => 'diaries.'], function () {
        //日記作成
        Route::post('/', 'DiaryController@create')->name('create');

        //日記編集
        Route::post('{id}', 'DiaryController@update')->name('update');

        //日記削除
        Route::post('{id}/delete', 'DiaryController@delete')->name('delete');
    });

    //分析
    Route::get('/analysis', 'DiaryController@analysis')->name('analysis');

    Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
        //プロフィール更新
        Route::post('update', 'UserController@profileUpdate')->name('profileUpdate');

        //ログイン中のユーザーが投稿している共有日記取得
        Route::get('share', 'UserController@shareDiariesRead')->name('shareDiariesRead');

        //ログイン中のユーザーがいいねした共有日記取得
        Route::get('share/reference', 'UserController@referenceShareDiariesRead')->name('referenceShareDiariesRead');
    });

    Route::group(['prefix' => 'share', 'as' => 'share.'], function () {
        //共有日記投稿
        Route::post('/', 'ShareController@create')->name('create');

        //共有日記取得
        Route::get('/', 'ShareController@read')->name('read');

        //共有日記いいね数ランキング
        Route::get('ranking', 'ShareController@ranking')->name('ranking');
        
        //投稿した日記削除
        Route::post('delete/{id}', 'ShareController@delete')->name('delete');
        
        //いいね付与
        Route::post('{id}/reference', 'ShareController@reference')->name('reference');
        
        //いいね解除
        Route::post('{id}/unreference', 'ShareController@unreference')->name('unreference');
        
        //コメント
        Route::post('{id}/comment', 'ShareController@addComment')->name('comment');

        //共有日記詳細取得
        Route::get('{id}', 'ShareController@readDetails')->name('readDetails');
    });
});
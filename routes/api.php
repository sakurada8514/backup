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
});

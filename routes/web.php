<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//googleアカウントログイン
Route::prefix('login')->name('login.')->group(function () {
    Route::get('/google', 'Auth\LoginController@redirectToGoogle')->name('google');
    Route::get('/google/callback', 'Auth\LoginController@handleGoogleCallback')->name('google.callback');
});

//初期HTML
Route::get('/{any?}', function () {
    return view('index');
})->where('any', '.+')->name('top');

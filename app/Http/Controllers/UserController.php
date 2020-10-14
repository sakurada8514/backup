<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //ログイン中のユーザー情報と日記一覧を返却
    public function userCheck()
    {
        $user = Auth::user();
        if ($user) {
            $diaries = $user->diaries()->orderByDesc('entry_at')->get();
        }else {
            $diaries = [];
        }

        return ['user' => $user, 'diaries' => $diaries];
    }
}

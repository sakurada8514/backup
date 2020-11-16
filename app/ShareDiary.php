<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ShareDiary extends Model
{
    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'share_diaries';

    protected $fillable = [
        'title', 'diary_id'
    ];

    //JSONに含めるアクセサ
    protected $appends = [
        'references_count', 'referenced_by_user'
    ];

    //JSONに含めない
    protected $hidden = [
        'user_id', 'diary_id', self::UPDATED_AT, 'references'
    ];

    //日記とのリレーション
    public function diary()
    {
        return $this->hasOne('App\Diary', 'id', 'diary_id');
    }

    //ユーザーとのリレーション
    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    //いいねとのリレーション
    public function references()
    {
        return $this->belongsToMany('App\User', 'references', 'share_diary_id')->withTimestamps();
    }

    //コメントとのリレーション
    public function comments()
    {
        return $this->hasMany('App\Comment', 'share_diary_id', 'id');
    }

    //いいね数取得
    public function getReferencesCountAttribute()
    {
        return $this->references->count();
    }

    //ログイン中ユーザーがいいねしているか判別
    public function getReferencedByUserAttribute()
    {
        return $this->references->contains(function ($user) {
            return $user->id === Auth::user()->id;
        });
    }
}
<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'img'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'email',
        'email_verified_at',
        'password',
        'remember_token',
        'img',
        self::CREATED_AT,
        self::UPDATED_AT,
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'img_url'
    ];

    //日記とのリレーション
    public function diaries()
    {
        return $this->hasMany('App\Diary');
    }

    //共有日記とのリレーション
    public function shareDiaries()
    {
        return $this->hasMany('App\ShareDiary');
    }

    //いいねとのリレーション
    public function references()
    {
        return $this->belongsToMany('App\ShareDiary', 'references', 'user_id', 'share_diary_id')->withTimestamps();
    }

    //プロフィール画像URL取得
    public function getImgUrlAttribute()
    {
        if ($this->attributes['img']) {
            return Storage::cloud()->url($this->attributes['img']);
        }

        return null;
    }
}

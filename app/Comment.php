<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'content', 'user_id', 'share_diary_id', 'id'
    ];

    protected $visible = [
        'user', 'content',
    ];

    //ユーザーとのリレーション
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id', 'users');
    }
}

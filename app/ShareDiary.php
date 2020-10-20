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
        'title', 'diaries_id'
    ];

    protected $appends = [
        'references_count', 'referenced_by_user'
    ];

    protected $hidden = [
        'user_id', 'diaries_id', self::UPDATED_AT, 'references'
    ];

    public function diaries()
    {
        return $this->hasOne('App\Diary', 'id', 'diaries_id');
    }

    public function users()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function references()
    {
        return $this->belongsToMany('App\User', 'references', 'share_diaries_id')->withTimestamps();
    }

    public function getReferencesCountAttribute()
    {
        return $this->references->count();
    }

    public function getReferencedByUserAttribute()
    {
        return $this->references->contains(function ($user) {
            return $user->id === Auth::user()->id;
        });
    }
}

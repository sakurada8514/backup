<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Diary extends Model
{
    protected $fillable = [
        'currency',
        'entry_img',
        'exit_img',
        'entry_at',
        'exit_at',
        'entry_rate',
        'exit_rate',
        'position',
        'lot',
        'rationale',
        'reflection',
        'result',
        'settlement'
    ];

    protected $appends = [
        'entry_img_url', 'exit_img_url'
    ];

    protected $hidden = [
        'user_id', 'entry_img', 'exit_img',
        self::CREATED_AT, self::UPDATED_AT,
    ];

    //awss3に保存された画像のURL取得
    public function getEntryImgUrlAttribute()
    {
        if($this->attributes['entry_img']) {
            return Storage::cloud()->url($this->attributes['entry_img']);
        }else {
            return null;
        }
    }
    public function getExitImgUrlAttribute()
    {
        if($this->attributes['exit_img']) {
            return Storage::cloud()->url($this->attributes['exit_img']);
        }else {
            return null;
        }
    }
}

<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ShareDiary;
use Faker\Generator as Faker;

$factory->define(ShareDiary::class, function (Faker $faker) {
    return [
        'title' => $faker->text,
        'diaries_id' => $faker->randomDigit
    ];
});

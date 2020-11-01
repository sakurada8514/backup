<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use App\User;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    $user = factory(User::class)->create();
    return [
        'user_id' => $user->id,
        'content' => $faker->text
    ];
});

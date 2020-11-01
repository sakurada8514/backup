<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Diary;
use App\User;
use Faker\Generator as Faker;

$factory->define(Diary::class, function (Faker $faker) {
    $user = factory(User::class)->create();
    return [
        'user_id' => $user->id,
        'currency' => $faker->randomElement(['EUR/USD', 'USD/JPY']),
        'entry_img' => $faker->image(),
        'exit_img' => $faker->image(),
        'entry_at' => $faker->dateTime,
        'exit_at' => $faker->dateTime,
        'entry_rate' => $faker->randomDigit,
        'exit_rate' => $faker->randomDigit,
        'position' => $faker->randomElement(['long', 'short']),
        'lot' => $faker->randomDigit,
        'rationale' => $faker->sentence,
        'reflection' => $faker->sentence,
        'result' => $faker->randomElement(['win', 'lose', 'entry']),
        'settlement' => $faker->randomDigit
    ];
});

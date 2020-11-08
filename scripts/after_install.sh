#!/bin/bash

set -eux

cd ~/fx-diary
php artisan vendor:publish --tag=laravel-admin
php artisan admin:install
php artisan migrate --force
php artisan config:cache
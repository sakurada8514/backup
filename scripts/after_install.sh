#!/bin/bash

set -eux

cd ~/fx-diary

php artisan migrate --force
php artisan config:cache


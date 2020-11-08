#!/bin/bash

set -eux

cd ~/fx-diary
php artisan config:cache
php artisan migrate --force


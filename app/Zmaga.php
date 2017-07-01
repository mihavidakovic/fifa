<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Zmaga extends Model
{
    protected $fillable = [
        'oseba', 'izgovor'
    ];

    protected $table = "zmage";
}

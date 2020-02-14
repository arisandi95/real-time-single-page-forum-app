<?php

namespace App\Model;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function likes()
    {
        $this->hasMany(Like::class);
    }

    public function question()
    {
        $this->belongsTo(Question::class);
    }
}

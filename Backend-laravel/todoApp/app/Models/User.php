<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory; 
    
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function todos() {
        return $this->hasMany(Todo::class);
    }
}

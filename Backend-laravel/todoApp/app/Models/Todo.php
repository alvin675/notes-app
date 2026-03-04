<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
    'title',
    'user_id',
    'category_id',
    'priority_id',
    'status_id',
    'description',
    'due_date',
    ];

    
    // Many to One (Many todolist -> One Category)
    public function category(){
        return $this->belongsTo(Category::class);
    }

    // Many to One
    public function status(){
        return $this->belongsTo(Status::class);
    }

    // Many to One
    public function priority(){
        return $this->belongsTo(Priority::Class);
    }

}

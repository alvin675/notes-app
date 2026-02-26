<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    //protected $table = 'todos'; // if I am not used todos it assumes plurals like todo_models
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

    // Define a relationship
    
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

    // One to Many
    // public function checklists() {  // for having has many use lower and plural because it returns list
    //     return $this->hasMany(Checklist::Class, 'todo_id');
    // }
}

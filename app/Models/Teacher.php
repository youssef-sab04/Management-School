<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens as HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;





class Teacher extends Authenticatable

{
    //
use HasFactory , SoftDeletes , HasApiTokens;  

protected $casts = [
    'date_of_birth' => 'date:Y-m-d',
  ];
  
 protected $hidden = [
    'password',
    'remember_token',
  ];
    protected $fillable = [
        'firstname',
        'lastname',
        'date_of_birth',
        'gender',
        'address',
        'blood_type',
        'phone',
        'email',
        'password',
    ];
  protected $appends = ['role'];


  public function getRoleAttribute()
  {
    return 'teacher';
  }
  

}

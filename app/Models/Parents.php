<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens as HasApiTokens;


class Parents  extends Authenticatable
{
    //
    use HasApiTokens, HasFactory,  SoftDeletes;

    protected $fillable = [
    'firstname',
    'lastname',
    'date_of_birth',
    'last_login_date',
    'gender',
    'blood_type',
    'address',
    'phone',
    'email',
    'password',
  ];
  protected $hidden = [
    'password',
    'email_verified_at',
    'last_login_date',
    'deleted_at',
    'remember_token',
    'created_at',
  ];
  
  protected $appends = ['role'];

  public function getRoleAttribute()
  {
    return 'parent';
  }
  protected $casts = [
    'date_of_birth' => 'date:Y-m-d',
  ];

   
}

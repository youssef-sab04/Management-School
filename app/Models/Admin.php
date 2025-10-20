<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens as HasApiTokens;





use Illuminate\Database\Eloquent\Model;

class Admin extends Authenticatable

{
    Use HasFactory , SoftDeletes , HasApiTokens;
    //
     protected $hidden = [
    'password',
    'remember_token',
  ];
  protected $appends = ['role'];

  public function getRoleAttribute()
  {
    return 'admin';
  }
}

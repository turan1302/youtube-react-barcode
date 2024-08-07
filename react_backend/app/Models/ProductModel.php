<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "products";
    protected $guarded = [];

    protected $primaryKey = "pd_id";
    public const CREATED_AT = "pd_created_at";
    public const UPDATED_AT = "pd_updated_at";
}

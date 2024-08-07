<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'product','as'=>'product.'],function (){
    Route::post('barcode',[\App\Http\Controllers\api\product\indexController::class,'barcode'])->name('barcode');
});

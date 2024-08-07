<?php

namespace App\Http\Controllers\api\product;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\ProductModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function barcode(Request $request)
    {
        $data = $request->except("_token");

        $result = ProductModel::where("pd_barcode",$data['barcode'])->first();

        if ($result){
            return parent::success("Ürün Bulundu",$result);
        }else{
            return parent::error("Ürün Bulunamadı",[],404);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Zmaga;

class ZmageController extends Controller
{
    public function zmage($ime) {
    	$zmage = Zmaga::where('oseba', '=', $ime)->count();

    	return response()->json(['zmage' => $zmage]);
    }
    public function dodaj($ime, Request $request) {
    	$z = new Zmaga;
    	$z->oseba = $ime;
    	$z->izgovor = $request->input('izgovor');
    	$z->save();

    	return response()->json(['z' => $z]);
    }
}

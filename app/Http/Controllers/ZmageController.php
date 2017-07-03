<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Zmaga;

class ZmageController extends Controller
{
    public function vseZmage() {
        $myha = Zmaga::where('oseba', '=', 'myha')->count();
        $juske = Zmaga::where('oseba', '=', 'juske')->count();

        return response()->json(['myha' => $myha, 'juske' => $juske]);
    }
    public function zmage($ime) {
        $zmage = Zmaga::where('oseba', '=', $ime)->count();
        $izgovori = Zmaga::where('oseba', '!=', $ime)->orderBy('created_at', 'desc')->get();

        return response()->json(['zmage' => $zmage, 'izgovori' => $izgovori]);
    }
    public function dodaj($ime, Request $request) {
    	$z = new Zmaga;
    	$z->oseba = $ime;
    	$z->izgovor = $request->input('izgovor');
    	$z->save();

    	return response()->json(['z' => $z]);
    }
}

<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

Route::get('zmage', [
	'as' => 'vseZmage',
	'uses' => 'ZmageController@vseZmage'
]);

Route::get('zmage/{ime}', [
	'as' => 'zmage',
	'uses' => 'ZmageController@zmage'
]);

Route::post('dodaj/{ime}', [
	'as' => 'dodaj',
	'uses' => 'ZmageController@dodaj'
]);

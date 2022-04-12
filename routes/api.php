<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;
use App\Http\Controllers\MyPlaylistController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/song-list', [SongController::class, 'index'])->name('song.list');

Route::get('/get-playlist/{usertoken}', [MyPlaylistController::class, 'index'])->name('playlist.list');
Route::post('/addto-playlist', [MyPlaylistController::class, 'add'])->name('playlist.add');
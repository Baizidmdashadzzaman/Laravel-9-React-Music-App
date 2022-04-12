<?php

namespace App\Http\Controllers;

use App\Models\MyPlaylist;
use Illuminate\Http\Request;

class MyPlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($usertoken)
    {
        $allData = MyPlaylist::join('songs','my_playlists.song_id','songs.id')
        ->select(
            'my_playlists.*',
            'songs.name as name',
            'songs.musicSrc as musicSrc',
            'songs.cover as cover',
            'songs.singer as singer',
            'songs.duration as duration',
            'songs.lyric as lyric',
        )
        ->where('my_playlists.user_token',$usertoken)
        ->latest()->get();
		return response()->json([
		  'allData' => $allData
		]); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request)
    {
        $check=MyPlaylist::where('user_token',$request->user_token)
        ->where('song_id',$request->song_id)
        ->first();
        if($check == null)
        {
            $data= new MyPlaylist();
            $data->user_token = $request->user_token;
            $data->song_id = $request->song_id;
            $data->save();

            $status=1;
            $message="Song added to your playlist.";
            return response()->json([
                'status' => $status,
                'message' => $message,
            ]); 
        }
        else
        {
            $status=0;
            $message="Song already added in your playlist.";
            return response()->json([
                'status' => $status,
                'message' => $message,
            ]); 
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MyPlaylist  $myPlaylist
     * @return \Illuminate\Http\Response
     */
    public function show(MyPlaylist $myPlaylist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MyPlaylist  $myPlaylist
     * @return \Illuminate\Http\Response
     */
    public function edit(MyPlaylist $myPlaylist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MyPlaylist  $myPlaylist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MyPlaylist $myPlaylist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MyPlaylist  $myPlaylist
     * @return \Illuminate\Http\Response
     */
    public function destroy(MyPlaylist $myPlaylist)
    {
        //
    }
}

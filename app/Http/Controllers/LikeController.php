<?php

namespace App\Http\Controllers;

use App\Model\Like;
use App\Model\Reply;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('JWT');
    }

   public function likeIt(Reply $reply, Request $request)
   {
       $reply->likes()->create([
           'user_id' => auth()->id(),
       ]);

       return response('LIKE', Response::HTTP_OK);
   }

    public function unlikeIt(Reply $reply)
    {
        $reply->likes()->where('user_id', auth()->id() )->first()->delete();

        return response('UNLIKE', Response::HTTP_OK);
    }
}

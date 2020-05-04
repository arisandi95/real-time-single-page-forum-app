<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NotificationController extends Controller
{
    public function notifications()
    {
        $unreadNotifications = [] ;
        $readNotifications = [];

        foreach (auth()->user()->unreadNotifications as $notification) {
            array_push($unreadNotifications, $notification);
        }
        foreach (auth()->user()->notifications as $notification) {
            if(!empty($notification->read_at)){
                array_push($readNotifications, $notification);
            }
        }

        $result = [
            'read' => $readNotifications,
            'unread' => $unreadNotifications
        ];
        return response()->json($result, Response::HTTP_OK);
    }

    public function markAsRead(Request $request)
    {
        auth()->user()->notifications->where('id', $request->id)->markAsRead();

        return response()->json('Read',Response::HTTP_OK);
    }
}

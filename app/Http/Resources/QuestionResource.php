<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'title' => $this->title,
            'path' => $this->path,
            'slug' => $this->slug,
            'replies' => ReplyResource::collection($this->replies),
            'reply_counter' => $this->replies->count(),
            'category_id' => $this->category_id,
            'body' => $this->body,
            'user' => $this->user->name,
            'user_id' => $this->user->id,
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}

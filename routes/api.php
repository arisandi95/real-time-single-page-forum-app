<?php

Route::apiResource('/question', 'QuestionController')->except(['create']);
Route::apiResource('/category', 'CategoryController');
Route::apiResource('/question/{question}/reply', 'ReplyController');

<?php

Route::apiResource('/question', 'QuestionController')->except(['create']);
Route::apiResource('/category', 'CategoryController')->except(['create']);

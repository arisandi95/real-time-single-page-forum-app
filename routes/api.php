<?php

Route::apiResource('/question', 'QuestionController')->except(['create']);

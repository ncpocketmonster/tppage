<?php
Route::get('fuck', function () { return 'fuck fuck fuck'; });
Route::resource('api/article','article/index');
Route::resource('api/login','login/index');
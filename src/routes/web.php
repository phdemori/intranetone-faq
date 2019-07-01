<?php
/*
  funções declaradas dentro do web.php geram erro no artisan config:cache, mensagem de declaração duplicada
  sem existir, por isso foi usado o helper;
*/

Route::group(['prefix' => 'admin', 'middleware' => ['web','admin'], 'as' => 'admin.'],function(){
    Route::group(['prefix' => 'faq'], function () {
    Route::get('/','FaqController@index');
    Route::get('teste', 'FaqController@teste');
    Route::get('list', 'FaqController@list');
    Route::get('view/{id}', 'FaqController@view');
    Route::post('create', 'FaqController@create');
    Route::post('update/{id}', 'FaqController@update');
    Route::get('delete/{id}', 'FaqController@delete');			
  });
});

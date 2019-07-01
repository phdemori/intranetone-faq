<?php

namespace Agileti\IOFaq;

use Illuminate\Support\ServiceProvider;

class IOFaqServiceProvider extends ServiceProvider
{
    public static function pkgAddr($addr){
      return __DIR__.'/'.$addr;
    }

    public function boot()
    {
      $this->loadViewsFrom(__DIR__.'/views', 'Faq');
      //$this->loadMigrationsFrom(__DIR__.'\database\migrations');
    }

    public function register()
    {
      $this->commands([
        Console\Install::class,
        Console\Remove::class
      ]);

      $this->app['router']->group(['namespace' => 'agileti\iofaq'], function () {
        include __DIR__.'/routes/web.php';
      });
      
      //buscar uma forma de não precisar fazer o make de cada classe
      $this->app->make('Agileti\IOFaq\FaqController');
      $this->app->make('Agileti\IOFaq\FaqRequest');
    }
}

<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Auth;
use DB;
Use App\Documentation;
use App\Version;
use App\Message;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
       // $this->app->bind('path.public', function() {
       //   return base_path().'/';
       // });
        // $this->app->bind('path.public', function() {
        //     return base_path().'/';
        // });
    
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {


    }
}

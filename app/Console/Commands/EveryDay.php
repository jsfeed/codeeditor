<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Auth;
use App\User;
use App\SubPayment;
use App\PostDownload;
use Carbon\Carbon;
use App\Rate;
use App\PostEarning;


class EveryDay extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'daily:update';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Daily check earning of user!';
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }
    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {



        $checksubplans = SubPayment::where("PaymentStatus", "=", "approved")->where("OrderStatus", "=", "success")->get();
        
            foreach ($checksubplans as $checksubplan) {
                $now = Carbon::now();
                $planexpire = $checksubplan->expiredDate < $now->toDateString();

                if($planexpire){
                    
                    $planexpire = SubPayment::where("PayId", "=", $checksubplan->PayId)->first();
                    $planexpire->OrderStatus = 'expire';
                    $planexpire->save();

                    $user = User::where("id", "=", $checksubplan->UserId)->first();
                    $user->account_pro = '0';
                    $user->save();
                }else{
                    $user = User::where("id", "=", $checksubplan->UserId)->first();
                    $user->account_pro = '1';
                    $user->save();
                }
            }



    }
}

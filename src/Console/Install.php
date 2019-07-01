<?php
namespace Agileti\IOFaq\Console;
use Dataview\IntranetOne\Console\IOServiceInstallCmd;
use Agileti\IOFaq\IOFaqServiceProvider;
use Agileti\IOFaq\FaqSeeder;

class Install extends IOServiceInstallCmd
{
  public function __construct(){
    parent::__construct([
      "service"=>"faq",
      "provider"=> IOFaqServiceProvider::class,
      "seeder"=>FaqSeeder::class,
    ]);
  }

  public function handle(){
    parent::handle();
  }
}

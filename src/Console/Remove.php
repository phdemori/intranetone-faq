<?php
namespace Agileti\IOFaq\Console;

use Dataview\IntranetOne\Console\IOServiceRemoveCmd;
use Dataview\IntranetOne\IntranetOne;
use Agileti\IOFaq\IOFaqServiceProvider;


class Remove extends IOServiceRemoveCmd
{
  public function __construct(){
    parent::__construct([
      "service"=>"faq",
      "tables" =>['faq'],
    ]);
  }

  public function handle(){
    parent::handle();
  }
}

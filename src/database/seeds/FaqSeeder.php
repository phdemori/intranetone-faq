<?php
namespace Agileti\IOFaq;

use Dataview\IntranetOne\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Sentinel;

class FaqSeeder extends Seeder
{
    public function run()
    {
        //cria o serviço se ele não existe
        if (!Service::where('service', 'Condomínio')->exists()) {
            Service::insert([
                'service' => "Faq",
                'alias' => 'faq',
                'ico' => 'ico-building',
                'description' => 'Faq do Site',
                'order' => Service::max('order') + 1,
            ]);
        }
        //seta privilegios padrão para o role odin
        $odinRole = Sentinel::findRoleBySlug('odin');
        $odinRole->addPermission('faq.view');
        $odinRole->addPermission('faq.create');
        $odinRole->addPermission('faq.update');
        $odinRole->addPermission('faq.delete');
        $odinRole->save();

        //seta privilegios padrão para o role admin
        $adminRole = Sentinel::findRoleBySlug('admin');
        $adminRole->addPermission('faq.view');
        $adminRole->addPermission('faq.create');
        $adminRole->addPermission('faq.update');
        $adminRole->addPermission('faq.delete');
        $adminRole->save();
    }
}

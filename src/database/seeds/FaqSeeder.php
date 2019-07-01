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
                'alias' => 'faqs',
                'ico' => 'ico-building',
                'description' => 'Faqs do Site',
                'order' => Service::max('order') + 1,
            ]);
        }
        //seta privilegios padrão para o role odin
        $odinRole = Sentinel::findRoleBySlug('odin');
        $odinRole->addPermission('faqs.view');
        $odinRole->addPermission('faqs.create');
        $odinRole->addPermission('faqs.update');
        $odinRole->addPermission('faqs.delete');
        $odinRole->save();

        //seta privilegios padrão para o role admin
        $adminRole = Sentinel::findRoleBySlug('admin');
        $adminRole->addPermission('faqs.view');
        $adminRole->addPermission('faqs.create');
        $adminRole->addPermission('faqs.update');
        $adminRole->addPermission('faqs.delete');
        $adminRole->save();
    }
}

<?php
namespace Agileti\IOFaq;

use Dataview\IntranetOne\IOModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faq extends IOModel
{
    use SoftDeletes;
    //public $incrementing = false; //necessário para a pk não virar int
    protected $primaryKey = 'id';

    protected $fillable = ['pergunta','resposta','observacao'];

    protected $dates = ['deleted_at'];

    public static function boot()
    {
        parent::boot();
    }
}

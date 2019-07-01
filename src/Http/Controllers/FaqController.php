<?php
namespace Agileti\IOFaq;

use DataTables;
use Dataview\IntranetOne\IOController;
use Agileti\IOFaq\Faq;
use Agileti\IOFaq\FaqRequest;
use Illuminate\Http\Response;

class FaqController extends IOController
{

    public function __construct()
    {
        $this->service = 'faq';
    }

    public function index()
    {
        return view('Faq::index');
    }

    function list() {
        $query = Faq::select('*')->orderBy('created_at', 'desc')->get();
        
        return Datatables::of(collect($query))->make(true);
    }

    public function create(FaqRequest $request)
    {
        $check = $this->__create($request);
        
        if (!$check['status']) {
            return response()->json(['errors' => $check['errors']], $check['code']);
        }
        
        $obj = new Faq($request->all());
        $obj->save();

        return response()->json(['success' => true, 'data' => null]);
    }

    public function view($id)
    {
        $check = $this->__view();
        if (!$check['status']) {
            return response()->json(['errors' => $check['errors']], $check['code']);
        }

        $query = Faq::where('id', $id)->get();

        return response()->json(['success' => true, 'data' => $query]);
    }

    public function update($id, FaqRequest $request)
    {
        $check = $this->__update($request);
        if (!$check['status']) {
            return response()->json(['errors' => $check['errors']], $check['code']);
        }

        $_new = (object) $request->all();
        $_old = Faq::find($id);
        $_old->tipo = $_new->tipo;
        $_old->pergunta = $_new->pergunta;
        $_old->resposta = $_new->resposta;
        $_old->observacao = $_new->observacao;

        $_old->save();
        return response()->json(['success' => $_old->save()]);
    }

    public function delete($id)
    {
        $check = $this->__delete();
        if (!$check['status']) {
            return response()->json(['errors' => $check['errors']], $check['code']);
        }

        $obj = Faq::find($id);
        $obj = $obj->delete();
        return json_encode(['sts' => $obj]);
    }

    public function checkId($id)
    {
        return Faq::select('pergunta')->where('id', '=', $id)->get();
    }

    public function get_enum_values( $table, $field )
    {
        $type = Faq::query( "SHOW COLUMNS FROM {$table} WHERE Field = '{$field}'" )->row( 0 )->Type;
        preg_match("/^enum\(\'(.*)\'\)$/", $type, $matches);
        $enum = explode("','", $matches[1]);
        return $enum;
    }
}

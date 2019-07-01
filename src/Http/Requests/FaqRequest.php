<?php

namespace Agileti\IOFaq;

use Dataview\IntranetOne\IORequest;
use Illuminate\Validation\Rule;

class FaqRequest extends IORequest
{
    public function sanitize()
    {
        $input = parent::sanitize();
        $this->replace($input);
        return $input;
    }

    public function rules()
    {
        $input = $this->sanitize();
        return [           
            'pergunta' => 'required',
            'resposta' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'pergunta' => 'A Pergunta é obrigatória',
            'resposta' => 'A Resposta é obrigatória'
        ];
    }
}

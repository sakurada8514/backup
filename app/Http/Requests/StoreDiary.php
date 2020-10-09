<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiary extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    //日記作成、編集のバリデーション
    public function rules()
    {
        return [
            'currency' => 'required|max:20',
            'entry_at' => 'required|date',
            'entry_rate' => 'required',
            'position' => 'required',
            'lot' => 'required|numeric|gte:1',
            'rationale' => 'required',
            'result' => 'required',
        ];
    }
}

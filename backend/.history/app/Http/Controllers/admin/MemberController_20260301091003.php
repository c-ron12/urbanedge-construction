<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    // FETCH ALL MEMBERS API.
    public function index()
    {
        $members = Member :: orderby ('create_ar', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $members,
        ]);
    }
}

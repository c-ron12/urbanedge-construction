<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    // FETCH ALL MEMBERS API.
    public function index()   // This method is used to list all members in the admin Members page.
    {
        $members = Member::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $members,
        ]);
    }



}

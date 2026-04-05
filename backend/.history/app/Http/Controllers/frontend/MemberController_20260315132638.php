<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    public function index()   // Method to return a all list of active members for frontend in the Aboutus page.
    {
        $members = Member::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }


}

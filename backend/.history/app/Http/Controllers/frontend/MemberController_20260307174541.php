<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    public function latestMembers(Request $request)  // Method to return 4 latest active members for frontend in the Home Page. (Request $request) is written to get limit from frontend.
    {
        $testimonials = Member::orderBy('created_at', 'desc')->where('status', 1)->limit($request->limit ?? 4)->get();
        return response()->json([
            'status' => true,
            'data' => $testimonials
        ], 200);
    }

    public function index()   // Method to return a all list of active testimonials for frontend in the Testimonials page.
    {
        $testimonials = Member::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testimonials
        ], 200);
    }


}

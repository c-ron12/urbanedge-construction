<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{

    public function latestServices(Request $request)  // Method to return 4 latest active services for frontend in the Home Page. (Request $request) is written to get limit from frontend.
    {
        $services = Service::orderBy('created_at', 'desc')->where('status', 1)->limit($request->limit ?? 4)->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ], 200);
    }

    public function index()   // Method to return a all list of active services for frontend in the Services page.
    {
        $services = Service::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ], 200);
    }

}

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
        ]);
    }

    public function index()   // Method to return a all list of active services for frontend in the Services page.
    {
        $services = Service::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    public function service($id)   // Method to return a specific active service for frontend in the Service Detail page.
    {
        $service = Service::where('status', 1)->findOrFail($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }
        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }
    

}

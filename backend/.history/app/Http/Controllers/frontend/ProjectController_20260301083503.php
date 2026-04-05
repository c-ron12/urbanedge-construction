<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function latestProjects(Request $request)   // Method to return  4 latest active projects for the frontend in Home Page. (Request $request) is written to get limit from frontend.
    {
        $project = Project::orderBy('created_at', 'desc')->where('status', 1)->limit($request->limit ?? 4)->get(); 
        return response()->json([
            'status' => true,
            'data' => $project
        ], 200);
    }

    public function index()   // Method to return a all list of active projects for the frontend in Projects page.
    {
        $project = Project::orderBy('created_at', 'desc')->where('status', 1)->get();
        return response()->json([
            'status' => true,
            'data' => $project
        ], 200);
    }
}

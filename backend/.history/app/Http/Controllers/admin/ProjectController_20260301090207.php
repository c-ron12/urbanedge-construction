<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Project;
use Illuminate\Support\Str;
use App\Models\TempImage;
use File;
use App\Helper\ImageHelper;

class ProjectController extends Controller
{

    // FETCH ALL PROJECTS API.
    public function index()     // This method is used to list all projects.
    {
        $projects = Project::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => 'All Projects list',
            'data' => $projects
        ], 200);
    }

    // CREATE PROJECT API, create Project model and projects table.
    public function store(Request $request)    // This method is used to store a new project.
    {
        $request->merge(['slug' => Str::slug($request->slug)]);   // Ensure slug is URL-friendly.

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug',
            'short_desc' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'construction_type' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $project = new Project();
        $project->title = $request->input('title');
        $project->slug = Str::slug($request->input('slug'));
        $project->short_desc = $request->input('short_desc');
        $project->content = $request->input('content');
        $project->construction_type = $request->input('construction_type');
        $project->sector = $request->input('sector');
        $project->location = $request->input('location');
        $project->status = $request->input('status') ?? 0;

        // Save Temp Image Here.
        if ($request->input('imageId') > 0) {    // imageId is sent from frontend Projects/Create.jsx
            $tempImage = TempImage::find($request->input('imageId'));

            if ($tempImage) {
                // Use the Helper: pass the temp model and the folder name 'projects'
                $imageName = ImageHelper::processAndCleanup($tempImage, 'projects');

                $project->image = $imageName;

                // DATABASE CLEANUP: Delete the temp record
                $tempImage->delete();
            }
        }

        // Save EVERYTHING in one single query at the end.
        $project->save();

        return response()->json([
            'status' => true,
            'message' => 'Project created successfully',
            'data' => $project
        ], 201);
    }

    // UPDATE PROJECT API.
    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found.'
            ], 404);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);   // Ensure slug is URL-friendly.

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $id . ',id',
            'short_desc' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'construction_type' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Assign text values to the model
        $project->title = $request->input('title');
        $project->slug = Str::slug($request->input('slug'));
        $project->short_desc = $request->input('short_desc');
        $project->content = $request->input('content');
        $project->construction_type = $request->input('construction_type');
        $project->sector = $request->input('sector');
        $project->location = $request->input('location');
        $project->status = $request->input('status') ?? 0;

        // Handle Image Update
        if ($request->input('imageId') > 0) {
            $oldImageName = $project->image;
            $tempImage = TempImage::find($request->input('imageId'));

            if ($tempImage) {
                // Use Helper to process the new image in the 'projects' folder
                $imageName = ImageHelper::processAndCleanup($tempImage, 'projects');

                // Update the model property
                $project->image = $imageName;

                // Delete old images from disk if they exist
                if (!empty($oldImageName)) {
                    File::delete(public_path('uploads/projects/small/' . $oldImageName));
                    File::delete(public_path('uploads/projects/large/' . $oldImageName));
                }

                // Clean up the database temp record
                $tempImage->delete();
            }
        }

        // Final Save: Saves text changes AND the new image name (if any)
        $project->save();

        return response()->json([
            'status' => true,
            'message' => 'Project updated successfully.',
            'data' => $project
        ], 200);
    }

    // FETCH SINGLE PROJECT API.
    public function show($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Project details',
            'data' => $project

        ], 200);
    }

    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found.'
            ], 404);
        }

        File::delete(public_path('uploads/projects/small/' . $project->image));
        File::delete(public_path('uploads/projects/large/' . $project->image));

        $project->delete();

        return response()->json([
            'status' => true,
            'message' => 'Project deleted successfully.'
        ], 200);
    }
}
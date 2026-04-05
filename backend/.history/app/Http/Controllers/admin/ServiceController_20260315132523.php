<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\TempImage;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Helper\ImageHelper;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // FETCH ALL SERVICES API.
    public function index()      // This method is used to list all services in the admin Services page. 
    {

        $services = Service::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => 'All Services list',
            'data' => $services
        ]);
    }


    // CREATE SERVICE API, create Service model and services table.
    public function store(Request $request)       // This method is used to create a new service record in the database.
    {
        $request->merge(['slug' => Str::slug($request->slug)]);   // Ensure slug is URL-friendly.

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services,slug',
            'short_desc' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $model = new Service();
        $model->title = $request->input('title');
        $model->slug = Str::slug($request->input('slug'));
        $model->short_desc = $request->input('short_desc');
        $model->content = $request->input('content');
        $model->status = $request->input('status') ?? 0;

        // Handle Image logic BEFORE the main save
        if ($request->input('imageId') > 0) {   // imageId is sent from frontend Services/Create.jsx
            $tempImage = TempImage::find($request->input('imageId'));

            if ($tempImage) {
                // Use the Helper: pass the temp model and the folder name 'services'
                // This processes the images and deletes the temp files from the disk
                $imageName = ImageHelper::processAndCleanup($tempImage, 'services');

                $model->image = $imageName;
 
                // DATABASE CLEANUP: Delete the temp record from the temp_images table
                $tempImage->delete();
            }
        }

        // Save everything (Text fields + Image name) in one single database query
        $model->save();

        return response()->json([
            'status' => true,
            'message' => 'Service created successfully.',
            'data' => $model
        ], 201);
    }

    /**
     * Display the specified resource.
     */

    // FETCH SINGLE SERVICE API.
    public function show($id)      // This method is used to fetch details of a single service.
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found.'
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Service details',
            'data' => $service
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //.
    }

    /**
     * Update the specified resource in storage.
     */

    // UPDATE SERVICE API.
    public function update(Request $request, $id)
    {
        // Find the service record
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found.'
            ], 404);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);   // Ensure slug is URL-friendly.

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services,slug,' . $id . ',id',
            'short_desc' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Update service properties
        $service->title = $request->input('title');
        $service->slug = Str::slug($request->input('slug'));
        $service->short_desc = $request->input('short_desc');
        $service->content = $request->input('content');
        $service->status = $request->input('status') ?? 0;

        // Save Temp Image Here if a new image was uploaded
        if ($request->input('imageId') > 0) { // imageId is sent from frontend Services/Edit.jsx after uploading image to TempImageController.

            $oldImageName = $service->image; // image is the column name in services migration table. Store old image name to delete later.

            $tempImage = TempImage::find($request->input('imageId'));

            if ($tempImage != null) {
                // Use the Helper: pass the temp model instance and the folder name 'services'
                // This processes small/large images and deletes the temp files from disk
                $imageName = ImageHelper::processAndCleanup($tempImage, 'services');

                // Update the model with the new permanent image name
                $service->image = $imageName;

                // Delete old permanent images from services folder to save disk space
                if (!empty($oldImageName)) {
                    File::delete(public_path('uploads/services/small/' . $oldImageName));
                    File::delete(public_path('uploads/services/large/' . $oldImageName));
                }

                // DATABASE CLEANUP: Delete the temp record from temp_images table
                $tempImage->delete();
            }
        }

        // Save all changes (Text updates and Image name) in one single database query
        $service->save();

        return response()->json([
            'status' => true,
            'message' => 'Service updated successfully.',
            'data' => $service
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */

    // DELETE SERVICE API.
    public function destroy($id)    // This method is used to delete a service record from the database and also delete its associated images from the disk.
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found.'
            ], 404);
        }
        File::delete(public_path('uploads/services/small/' . $service->image));
        File::delete(public_path('uploads/services/large/' . $service->image));

        $service->delete();

        return response()->json([
            'status' => true,
            'message' => 'Service deleted successfully.'
        ]);
    }
}

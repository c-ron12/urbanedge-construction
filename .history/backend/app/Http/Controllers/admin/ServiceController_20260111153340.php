<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\TempImage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // FETCH ALL SERVICES API
    public function index()
    {
        
        $services = Service::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => 'Services',
            'data' => $services   
            
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */

    // CREATE SERVICE API, create Service model and services table
    public function store(Request $request)
    {
        $request->merge(['slug' => str::slug($request->slug)]);   // Ensure slug is URL-friendly

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services,slug',
            'short_desc' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',    // we have stored image in different file, TempImageController 
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $model = new Service();
        $model->title = $request->input('title');
        $model->slug = Str::slug($request->input('slug'));
        $model->short_desc = $request->input('short_desc');
        $model->content = $request->input('content');
        // $model->image = $request->input('image');    // we have stored image in different file, TempImageController 
        $model->status = $request->input('status') ?? 0;
        $model->save();

        if ($request->imageId > 0) {

            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $extension = last($extArray);

                $imageName = strtotime('now') . $model->id . '.' . $extension;

                // Create small thumnail here
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/services/small/' . $imageName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                // Create large thumbnail here
                // $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/services/large/' . $imageName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $model->image = $imageName;
                $model->save();

               
            }
        }
        return response()->json([
            'status' => true,
            'message' => 'Service created successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     */

    // FETCH SINGLE SERVICE API
    public function show($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found.'
            ]); 
    }
        return response()->json([
            'status' => true,
            'data' => $service,
        ]);
    }   

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    // UPDATE SERVICE API
    public function update(Request $request, $id)
    {
       
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found.'
            ], 404);
        }

        $request->merge(['slug' => str::slug($request->slug)]);   // Ensure slug is URL-friendly
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services,slug,'.$id.',id',
            'short_desc' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            // 'image' => 'nullable|string|max:255',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 404);
        }

        $service->slug = Str::slug($request->input('slug'));
        $service->short_desc = $request->input('short_desc');
        $service->title = $request->input('title');
        $service->content = $request->input('content');
        $service->status = $request->input('status') ?? 0;
        $service->save();   

        // Save Temp Image Here
        if ($request->imageId > 0)  {
            $oldImageName = $service->image;  // Store old image name to delete later
            // Delete old images
            
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $extension = last($extArray);

                $imageName = strtotime('now'). $service->id.'.'.$extension;

                // Create small thumnail here
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/services/small/' . $imageName); 
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);
 
                // Create large thumbnail here
                // $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/services/large/' . $imageName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $service->image = $imageName;
                $service->save();

                // Delete old images, $oldImageName is set at the start of this block
                if ($oldImageName != null && $oldImageName != '') {
                    File::delete(public_path('uploads/services/small/' . $oldImageName));
                    File::delete(public_path('uploads/services/large/' . $oldImageName));
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Service updated successfully.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */

    // DELETE SERVICE API
    public function destroy($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found.'
            ]);
        }
        File::delete(public_path('uploads/services/small/' . $service->image));
        File::delete(public_path('uploads/services/large/' . $service->image));

        $service->delete();

        return response()->json([
            'status' => true,
            'message' => 'Service deleted successfully.'
        ],200);
    }
}

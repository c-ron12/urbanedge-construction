<?php

namespace App\Http\Controllers\admin;
use Illuminate\Support\Facades\Validator;
use App\Models\TempImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class TempImageController extends Controller
{

    // CREATE TEMP IMAGE UPLOAD API, create temp_images table to store temp images before associating them with services or projects and also.
    // create TempImage model.
    public function store(Request $request)
    {
        // Logic to handle temporary image upload.
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $image = $request->file('image');

        // Save data in temp images table  .
        $extension = $image->getClientOriginalExtension();
        $imageName = time() . '-' . uniqid() . '.' . $extension;
        $model = new TempImage();
        $model->name = $imageName;    // name keyword here is the column name in the temp_images table.
        $model->save();   // Save record in temp_images table, $model id is generated here and can be used to associate with services or projects later in frontend and backend.

        // Save image to public/uploads/temp directory.
        $image->move(public_path('uploads/temp'), $imageName);

        // Create small thumnail here.
        $sourcePath = public_path('uploads/temp/'.$imageName);
        $destPath = public_path('uploads/temp/thumbnails/'.$imageName);
        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destPath);

        return response()->json([
            'status' => true,
            'data' => $model
        ]);

    }
}

<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Testimonial;
use App\Models\TempImage;
use App\Helper\ImageHelper;
use File;

class TestimonialController extends Controller
{
    // FETCH ALL TESTIMONIALS API.
    public function index()     // This method is used to list all testimonials in the admin Testimonials page.
    {
        $testimonials = Testimonial::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'message' => 'All Testimonials list',
            'data' => $testimonials
        ]);
    }


    // FETCH SINGLE TESTIMONIAL API.
    public function show($id)       // This method is used to fetch details of a single testimonial.
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Testimonial details',
            'data' => $testimonial
        ]);

    }

    // CREAT TESTIMONIALS API, create Testimonial model and testimonials table.
    public function store(Request $request)    // This method is used to create a new testimonial record in the database.
    {
        $validator = Validator::make($request->all(), [
            'testimonial' => 'required|string',
            'citation' => 'required|string|max:100',
            'designation' => 'nullable|string|max:100',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $testimonial = new Testimonial();
        $testimonial->testimonial = $request->input('testimonial');
        $testimonial->citation = $request->input('citation');
        $testimonial->designation = $request->input('designation', null); // Optional field
        $testimonial->status = $request->input('status', 1); // Default status to 1 (active) if not provided.

        // Save Temp Image Here.
        if ($request->input('imageId') > 0) {
            $tempImage = TempImage::find($request->input('imageId'));

            if ($tempImage) {
                // Use the Helper: pass the temp model and the folder name 'testimonials'
                // Use the Helper: skip large image creation
                $imageName = ImageHelper::processAndCleanup($tempImage, 'testimonials', false);

                $testimonial->image = $imageName;

                // DATABASE CLEANUP: Delete the temp record
                $tempImage->delete();
            }
        }

        // One-Save Logic: Saves text and image name (if any) in one query.
        $testimonial->save();

        return response()->json([
            'status' => true,
            'message' => 'Testimonial created successfully',
            'data' => $testimonial
        ], 201);
    }

    public function update(Request $request, $id)    // This method is used to update an existing testimonial record in the database.
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required|string',
            'citation' => 'required|string|max:100',
            'designation' => 'nullable|string|max:100',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $testimonial->testimonial = $request->input('testimonial');
        $testimonial->citation = $request->input('citation');
        $testimonial->designation = $request->input('designation', null); // Optional field
        $testimonial->status = $request->input('status', $testimonial->status);

        // Handle Image Update Logic Here.
        if ($request->input('imageId') > 0) {
            $tempImage = TempImage::find($request->input('imageId'));

            if ($tempImage != null) {
                // Store the old image name before updating it
                $oldImage = $testimonial->image;

                // Use the Helper: pass the temp model instance and the folder name 'testimonials'
                // Set createLarge to false since testimonials don't need large images
                $imageName = ImageHelper::processAndCleanup($tempImage, 'testimonials', false);

                // Update the model with the new permanent image name
                $testimonial->image = $imageName;

                // Delete old permanent images from testimonials folder
                if (!empty($oldImage)) {
                    // Delete the small image
                    File::delete(public_path('uploads/testimonials/small/' . $oldImage));

                }

                // DATABASE CLEANUP: Delete the temp record from temp_images table.
                $tempImage->delete();
            }
        }

        // Save EVERYTHING in one single query at the end.
        $testimonial->save();

        return response()->json([
            'status' => true,
            'message' => 'Testimonial updated successfully',
            'data' => $testimonial
        ], 200);
    }

    // DELETE TESTIMONIAL API.
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found.'
            ], 404);
        }
        File::delete(public_path('uploads/testimonials/small/' . $testimonial->image));

        $testimonial->delete();

        return response()->json([
            'status' => true,
            'message' => 'Testimonial deleted successfully.'
        ], 200);
    }
}

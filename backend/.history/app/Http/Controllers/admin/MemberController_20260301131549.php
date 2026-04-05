<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Member;
use Illuminate\Support\Facades\Validator;
use App\Models\TempImage;
use App\Helper\ImageHelper;
use File;
class MemberController extends Controller
{
    // FETCH ALL MEMBERS API.
    public function index()   // This method is used to list all members in the admin Members page.
    {
        $members = Member::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => 'All Members list',
            'data' => $members,
        ]);
    }

    // CREATE MEMBER API, create Member model and members table.
    public function store(Request $request)    // This method is used to create a new member record in the database.
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->designation = $request->designation;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status ?? 0;

        // Save temp image members here
        if ($request->input('imageId') > 0) {
            $tempImage = TempImage::find($request->input('imageId'));
            if ($tempImage) {
                $imageName = ImageHelper::processAndCleanup($tempImage, 'members');
                $member->image = $imageName;

                // DATABASE CLEANUP: Delete the temp record
                $tempImage->delete();
            }
        }

        // Save EVERYTHING in one single query at the end.
        $member->save();
        return response()->json([
            'status' => true,
            'message' => 'Member Created Successfully',
            'data' => $member
        ], 201);


    }

    // FETCH SINGLE MEMBER API.
    public function show($id)       // This method is used to fetch details of a single member.
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found'
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Member details',
            'data' => $member
        ], 200);
    }

    // UPDATE MEMBER API.
    public function update(Request $request, $id)    // This method is used to update an existing member record in the database.
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found'
            ], 404);
        }

        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'status' => 'nullable|integer|in:0,1',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $member->name = $request->name;
        $member->designation = $request->designation;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status ?? 0;

        // Save temp image members here
        if ($request->input('imageId') > 0) {
            $oldImageName = $member->image; // Store old image name for deletion after new image is saved.
            $tempImage = TempImage::find($request->input('imageId'));
            if ($tempImage) {
                $imageName = ImageHelper::processAndCleanup($tempImage, 'members');
                $member->image = $imageName;

                // DATABASE CLEANUP: Delete the temp record
                $tempImage->delete();
            }
            // Delete old image file from disk if it exists and is different from the new image.
            if (!empty($oldImageName)) {
                File::delete(public_path('uploads/members/large/' . $oldImageName));
                File::delete(public_path('uploads/members/small/' . $oldImageName));

                // Clean up the database temp record if it exists
                $tempImage->delete();
            }
        }

        // Final Save: Saves text changes AND the new image name (if any)
        $member->save();

        return response()->json([
            'status' => true,
            'message' => 'Member updated successfully.',
            'data' => $member
        ], 200);
    }

    // DELETE MEMBER API.
    public function destroy($id)   // This method is used to delete a member record from the database and also delete its associated images from the disk.
    {

    }
}

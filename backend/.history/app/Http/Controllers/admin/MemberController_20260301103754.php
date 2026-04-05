<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Member;
use Illuminate\Support\Facades\Validator;
use App\Models\TempImage;
use App\Helper\ImageHelper;

class MemberController extends Controller
{
    // FETCH ALL MEMBERS API.
    public function index()   // This method is used to list all members in the admin Members page.
    {
        $members = Member::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $members,
        ]);
    }

    // CREATE MEMBER API, create Member model and members table.
    public function store(Request $request)    // This method is used to create a new member record in the database.
    {
        $validator = Validator::make(request()->all(),[
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ],422);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->designation = $request->designation;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status ?? 0;

        // Save temp image members here
        if ($request->input ('imageId') > 0) {
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
        ]);
        

    }

    // FETCH SINGLE MEMBER API.
    public function show($id)       // This method is used to fetch details of a single member.
    {

    }

    // UPDATE MEMBER API.
    public function update(Request $request, $id)    // This method is used to update an existing member record in the database.
    {

    }

    // DELETE MEMBER API.
    public function destroy($id)   // This method is used to delete a member record from the database and also delete its associated images from the disk.
    {

    }
}

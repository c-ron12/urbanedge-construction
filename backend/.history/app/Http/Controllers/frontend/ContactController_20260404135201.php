<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Mail;
use App\Mail\ContactEmail;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $validator =  Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]); 

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }

        $mailData = [
            'fullname' => $request->fullname,
            'address' => $request->address,
            'email' => $request->email,
            'subject' => $request->subject,
            'phone' => $request->phone,
            'message' => $request->message,
        ];

        Mail::to('admin@example.com')->send(new ContactEmail()); 

    }
}

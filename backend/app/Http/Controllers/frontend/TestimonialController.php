<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function latestTestimonials(Request $request)  // Method to return 4 latest active testimonials for frontend in the Home Page. (Request $request) is written to get limit from frontend.
    {
        $testimonials = Testimonial::orderBy('created_at', 'desc')->where('status', 1)->limit($request->limit ?? 4)->get();
        return response()->json([
            'status' => true,
            'data' => $testimonials
        ]);
    }

    public function index()   // Method to return a all list of active testimonials for frontend in the Testimonials page.
    {
        $testimonials = Testimonial::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testimonials
        ]);
    }


}

<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{

    public function latestArticles(Request $request)  // Method to return 4 latest active articles for frontend the Home Page. (Request $request) is written to get limit from frontend.
    {
        $articles = Article::orderBy('created_at', 'desc')->where('status', 1)->limit($request->limit ?? 4)->get();
        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }


    public function index()  // Method to return a all list of active articles for frontend in the Article & Blog page .
    {
        $articles = Article::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }
   
}

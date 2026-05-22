<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Article;
use Illuminate\Support\Str;
use App\Models\TempImage;
use File;
use App\Helper\ImageHelper;

use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // FETCH ALL ARTICLES API.
    public function index()     // This Method is usedto fetch all articles in the admin Articles page.
    {
        $articles = Article::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'message' => 'All articles list',
            'data' => $articles
        ]);
    }

    // CREATE ARTICLE API, create Article model and articles table.
    public function store(Request $request)   // This method is used to create a new article record in the database.
    {
        $request->merge(['slug' => Str::slug($request->slug)]);   // Ensure slug is URL-friendly.

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug',
            'author' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $article = new Article();
        $article->title = $request->input('title');
        $article->slug = Str::slug($request->input('slug'));
        $article->author = $request->input('author');
        $article->content = $request->input('content');
        $article->status = $request->input('status', 0); // Default to 0 if not provided.

        // Save Temp Image Here.
        if ($request->input('imageId') > 0) {    // imageId is sent from frontend Articles/Create.jsx
            $tempImage = TempImage::find($request->input('imageId'));

            if ($tempImage) {
                // Use the Helper: pass the temp model and the specific folder name 'articles'
                $imageName = ImageHelper::processAndCleanup($tempImage, 'articles');

                $article->image = $imageName;

                // DATABASE CLEANUP: Delete the temp record from database
                $tempImage->delete();
            }
        }

        // Save EVERYTHING at once (Text and Image)
        $article->save();

        return response()->json([
            'status' => true,
            'message' => 'Article created successfully',
            'data' => $article
        ], 201);
    }

    // FETCH SINGLE ARTICLE API.
    public function show($id)      // This method is used to fetch details of a single article.
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Article details',
            'data' => $article
        ]);
    }

    // UPDATE ARTICLE API.
    public function update(Request $request, $id)      // This method is used to update an existing article record in the database.
    {
        // Find the article record
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found.'
            ], 404);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);   // Ensure slug is URL-friendly.

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug,' . $id . ',id',
            'author' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Update article properties (Don't save to DB yet)
        $article->title = $request->input('title');
        $article->slug = Str::slug($request->input('slug'));
        $article->author = $request->input('author');
        $article->content = $request->input('content');
        $article->status = $request->input('status') ?? 0;

        // Save Temp Image Here if a new image was uploaded
        if ($request->input('imageId') > 0) { // imageId is sent from frontend Articles/Edit.jsx

            $oldImageName = $article->image; // Store old image name to delete later.

            $tempImage = TempImage::find($request->input('imageId'));

            if ($tempImage != null) {
                // Use the Helper: pass the temp model instance and the folder name 'articles'
                // This processes small/large images and deletes the temp files from disk
                $imageName = ImageHelper::processAndCleanup($tempImage, 'articles');

                // Update the model property with the new permanent image name
                $article->image = $imageName;

                // Delete old permanent images from articles folder to save disk space
                if (!empty($oldImageName)) {
                    File::delete(public_path('uploads/articles/small/' . $oldImageName));
                    File::delete(public_path('uploads/articles/large/' . $oldImageName));
                }

                // DATABASE CLEANUP: Delete the temp record from temp_images table
                $tempImage->delete();
            }
        }

        // Save all changes (Text updates and New image name) in ONE single query
        $article->save();

        return response()->json([
            'status' => true,
            'message' => 'Article updated successfully.',
            'data' => $article
        ]);
    }

    // FETCH TRASHED ARTICLES (For the Restore Data page)
    public function trashed()
    {
        // onlyTrashed() fetches only records where deleted_at is NOT NULL
        $articles = Article::onlyTrashed()->orderBy('deleted_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'message' => 'Trash list retrieved successfully',
            'data' => $articles
        ]);
    }

    // RESTORE A DELETED ARTICLE
    public function restore($id)
    {
        $article = Article::onlyTrashed()->find($id);

        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found in Trash.'
            ], 404);
        }

        $article->restore(); // Clears the deleted_at column

        return response()->json([
            'status' => true,
            'message' => 'Article restored successfully.',
            'data' => $article
        ]);
    }

    // DELETE / PERMANENT DELETE LOGIC
    public function destroy($id)
    {
        // findWithTrashed allows us to find the record even if it is soft-deleted
        $article = Article::withTrashed()->find($id);

        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found.'
            ], 404);
        }

        // Case 1: Item is already in Trash -> Permanent Delete
        if ($article->trashed()) {
            // Delete actual files only when permanently wiping
            if ($article->image) {
                File::delete(public_path('uploads/articles/small/' . $article->image));
                File::delete(public_path('uploads/articles/large/' . $article->image));
            }

            $article->forceDelete(); // Removes from DB permanently

            return response()->json([
                'status' => true,
                'message' => 'Article permanently deleted.'
            ]);
        }

        // Case 2: Item is active -> Move to Trash (Soft Delete)
        $article->delete();

        return response()->json([
            'status' => true,
            'message' => 'Article moved to Trash successfully.'
        ]);
    }
}

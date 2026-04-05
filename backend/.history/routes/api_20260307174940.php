<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\MemberController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\TestimonialController;
use App\Http\Controllers\frontend\ServiceController as FrontendServiceController;
use App\Http\Controllers\frontend\ProjectController as FrontendProjectController;
use App\Http\Controllers\frontend\ArticleController as FrontendArticleController;
use App\Http\Controllers\frontend\TestimonialController as FrontendTestimonialController;
use App\Http\Controllers\frontend\MemberController as FrontendMemberController;


// frontend and public routes.
Route::post('authenticate', [AuthenticationController::class, 'authenticate']);

Route::get('get-services', [FrontendServiceController::class, 'index']);    // Public route to get all active services for the frontend.
Route::get('get-latest-services', [FrontendServiceController::class, 'latestServices']);     // Public route to get latest active with limit services list for the frontend.

Route::get('get-projects', [FrontendProjectController::class, 'index']);     // Public route to get all active projects for the frontend.
Route::get('get-latest-projects', [FrontendProjectController::class, 'latestProjects']);     // Public route to get latest active with limit projects list for the frontend.

Route::get('get-articles', [FrontendArticleController::class, 'index']);     // Public route to get all active articles for the frontend.
Route::get('get-latest-articles', [FrontendArticleController::class, 'latestArticles']);     // Public route to get all active with limit articles list for the frontend.

Route::get('get-testimonials', [FrontendTestimonialController::class, 'index']);     // Public route to get all active testimonials for the frontend.
Route::get('get-latest-testimonials', [FrontendTestimonialController::class, 'latestTestimonials']);     // Public route to get latest active with limit testimonials list for the frontend.

Route::get('get-members', [FrontendMemberController::class, 'index']);     // Public route to get all active members for the frontend.


Route::group(['middleware' => 'auth:sanctum'], function () {  // Routes inside this group are protected by Laravel Sanctum middleware. Only users who send a valid Bearer token (from login) can access these routes.

    // Bakend Admin Dashboard and Authentication Routes.
    Route::get('dashboard', [AdminDashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']); 

    // Bakend Admin User Profile Routes.
    // Service Routes.
    Route::post('services', [ServiceController::class, 'store']); 
    Route::get('services', [ServiceController::class, 'index']); 
    Route::get('services/{id}', [ServiceController::class, 'show']); 
    Route::put('services/{id}', [ServiceController::class, 'update']); 
    Route::delete('services/{id}', [ServiceController::class, 'destroy']); 

    // Project Routes.
    Route::post('projects', [ProjectController::class, 'store']);
    Route::get('projects', [ProjectController::class, 'index']);
    Route::get('projects/{id}', [ProjectController::class, 'show']);
    Route::put('projects/{id}', [ProjectController::class, 'update']);
    Route::delete('projects/{id}', [ProjectController::class, 'destroy']);
    
    // Article Routes.
    Route::post('articles', [ArticleController::class, 'store']);
    Route::get('articles', [ArticleController::class, 'index']);
    Route::get('articles/{id}', [ArticleController::class, 'show']);
    Route::put('articles/{id}', [ArticleController::class, 'update']);
    Route::delete('articles/{id}', [ArticleController::class, 'destroy']);
    
    //Testimonial Routes.
    Route::post('testimonials', [TestimonialController::class, 'store']);
    Route::get('testimonials', [TestimonialController::class, 'index']);
    Route::get('testimonials/{id}', [TestimonialController::class, 'show']);
    Route::put('testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('testimonials/{id}', [TestimonialController::class, 'destroy']);

    //Member Routes.
    Route::post('members', [MemberController::class, 'store']);
    Route::get('members', [MemberController::class, 'index']);
    Route::get('members/{id}', [MemberController::class, 'show']);
    Route::put('members/{id}', [MemberController::class, 'update']);
    Route::delete('members/{id}', [MemberController::class, 'destroy']);

    // Temporary Image Upload Route.
    Route::post('temp-images', [TempImageController::class, 'store']); 

}); 
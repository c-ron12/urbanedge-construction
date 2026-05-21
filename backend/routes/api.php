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
use App\Http\Controllers\frontend\ContactController;
use App\Http\Controllers\frontend\ServiceController as FrontendServiceController;
use App\Http\Controllers\frontend\ProjectController as FrontendProjectController;
use App\Http\Controllers\frontend\ArticleController as FrontendArticleController;
use App\Http\Controllers\frontend\TestimonialController as FrontendTestimonialController;
use App\Http\Controllers\frontend\MemberController as FrontendMemberController;

// Frontend & Public Routes

Route::post('authenticate', [AuthenticationController::class, 'authenticate']);
Route::post('contact', [ContactController::class, 'index']);

// Frontend Services
Route::controller(FrontendServiceController::class)->group(function () {
    Route::get('get-services', 'index');
    Route::get('get-latest-services', 'latestServices');
    Route::get('get-service/{id}', 'service');
});

// Frontend Projects
Route::controller(FrontendProjectController::class)->group(function () {
    Route::get('get-projects', 'index');
    Route::get('get-latest-projects', 'latestProjects');
    Route::get('get-project/{id}', 'project');
});

// Frontend Articles
Route::controller(FrontendArticleController::class)->group(function () {
    Route::get('get-articles', 'index');
    Route::get('get-latest-articles', 'latestArticles');
    Route::get('get-article/{id}', 'article');
});

// Frontend Testimonials
Route::controller(FrontendTestimonialController::class)->group(function () {
    Route::get('get-testimonials', 'index');
    Route::get('get-latest-testimonials', 'latestTestimonials');
});

// Frontend Members
Route::controller(FrontendMemberController::class)->group(function () {
    Route::get('get-members', 'index');
});


// Backend Admin Routes (Protected by Sanctum)

Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'admin'], function () {

    // Auth & Dashboard
    Route::get('dashboard', [AdminDashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);
    Route::post('temp-images', [TempImageController::class, 'store']);

    // Admin Service Routes
    Route::prefix('services')->controller(ServiceController::class)->group(function () {
        Route::get('trash', 'trashed');
        Route::put('{id}/restore', 'restore');
    });
    Route::apiResource('services', ServiceController::class);

    // Admin Project Routes
    Route::prefix('projects')->controller(ProjectController::class)->group(function () {
        Route::get('trash', 'trashed');
        Route::put('{id}/restore', 'restore');
    });
    Route::apiResource('projects', ProjectController::class);

    // Admin Article Routes
    Route::prefix('articles')->controller(ArticleController::class)->group(function () {
        Route::get('trash', 'trashed');
        Route::put('{id}/restore', 'restore');
    });
    Route::apiResource('articles', ArticleController::class);

    // Admin Testimonial Routes
    Route::prefix('testimonials')->controller(TestimonialController::class)->group(function () {
        Route::get('trash', 'trashed');
        Route::put('{id}/restore', 'restore');
    });
    Route::apiResource('testimonials', TestimonialController::class);

    // Admin Member Routes
    Route::prefix('members')->controller(MemberController::class)->group(function () {
        Route::get('trash', 'trashed');
        Route::put('{id}/restore', 'restore');
    });
    Route::apiResource('members', MemberController::class);
});
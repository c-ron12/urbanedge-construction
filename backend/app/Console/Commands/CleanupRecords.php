<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TempImage;
use App\Models\Service;
use App\Models\Project;
use App\Models\Article;
use App\Models\Testimonial;
use App\Models\Member;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class CleanupRecords extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'cleanup:all';

    /**
     * The console command description.
     */
    protected $description = 'Clean up temporary images (24h) and permanently delete trashed records (30d)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Starting System Cleanup...");

        // --- LOGIC 1: TEMP IMAGES (24 HOURS) ---
        $oldImages = TempImage::where('created_at', '<', Carbon::now()->subHours(24))->get();

        foreach ($oldImages as $image) {
            /** @var TempImage $image */
            $sourcePath = public_path('uploads/temp/' . $image->name);
            $thumbPath = public_path('uploads/temp/thumbnails/' . $image->name);

            if (File::exists($sourcePath))
                File::delete($sourcePath);
            if (File::exists($thumbPath))
                File::delete($thumbPath);

            $image->delete(); 
        }

        $this->info("✓ Cleaned up " . $oldImages->count() . " temporary images.");

        // --- TRASHED RECORDS (30 DAYS) ---
        $modelsToClean = [
            'Service' => Service::class,
            'Project' => Project::class,
            'Article' => Article::class,
            'Testimonial' => Testimonial::class,
            'Member' => Member::class,
        ];

        foreach ($modelsToClean as $name => $modelPath) {
            $expiredRecords = $modelPath::onlyTrashed()
                ->where('deleted_at', '<', Carbon::now()->subDays(30))
                ->get();

            foreach ($expiredRecords as $record) {
                // Handle file deletion
                if (!empty($record->image)) {
                    $folder = strtolower($name) . 's';

                    $smallPath = public_path("uploads/$folder/small/" . $record->image);
                    $largePath = public_path("uploads/$folder/large/" . $record->image);

                    if (File::exists($smallPath))
                        File::delete($smallPath);
                    if (File::exists($largePath))
                        File::delete($largePath);
                }

                $record->forceDelete();
            }

            $this->info("✓ Permanently removed " . $expiredRecords->count() . " expired $name(s).");
        }

        $this->info("Full cleanup completed successfully!");
    }
}
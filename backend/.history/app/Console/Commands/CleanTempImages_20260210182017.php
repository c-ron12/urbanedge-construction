<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class CleanTempImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'temp-images:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete temporary images older than 24 hours from disk and database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Find records created more than 24 hours ago
        $oldImages = TempImage::where('created_at', '<', Carbon::now()->subDays(1)->toDateTimeString())->get();

        $count = $oldImages->count();

        if ($count > 0) {
            foreach ($oldImages as $image) {
                // Path to the main temp image
                $sourcePath = public_path('uploads/temp/' . $image->name);

                // Path to the dashboard thumbnail
                $thumbPath = public_path('uploads/temp/thumbnails/' . $image->name);

                // Delete physical files from disk if they exist
                if (File::exists($sourcePath)) {
                    File::delete($sourcePath);
                }

                if (File::exists($thumbPath)) {
                    File::delete($thumbPath);
                }

                // Delete the record from the database
                $image->delete();
            }

            $this->info("Successfully cleaned up $count old temporary images.");
        } else {
            $this->info("No old temporary images found to clean.");
        }
    }
}
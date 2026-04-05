<?php
namespace App\Helper;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageHelper
{
    /**
     * Processes temp images, moves them to target folder, and cleans up.
     */
    public static function processAndCleanup($tempImage, $folder)
    {
        $extArray = explode('.', $tempImage->name);
        $extension = last($extArray);
        $imageName = time() . '-' . Str::random(5) . '.' . $extension;

        $sourcePath = public_path('uploads/temp/' . $tempImage->name);
        $manager = new ImageManager(Driver::class);

        // 1. Process Small
        $smallPath = public_path("uploads/$folder/small/" . $imageName);
        $manager->read($sourcePath)->coverDown(500, 600)->save($smallPath);

        // 2. Process Large
        $largePath = public_path("uploads/$folder/large/" . $imageName);
        $manager->read($sourcePath)->scaleDown(1200)->save($largePath);

        // 3. PHYSICAL CLEANUP: Delete the temp files immediately
        File::delete($sourcePath);
        File::delete(public_path('uploads/temp/thumbnails/' . $tempImage->name));

        return $imageName;
    }
}
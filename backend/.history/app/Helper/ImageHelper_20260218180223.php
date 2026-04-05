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
     * @param $tempImage - The temp image model
     * @param $folder - The target folder name
     * @param bool $createLarge - Whether to create a large version (default: true)
     */
    public static function processAndCleanup($tempImage, $folder, $createLarge = true)
    {
        $extArray = explode('.', $tempImage->name);
        $extension = last($extArray);
        $imageName = time() . '-' . Str::random(5) . '.' . $extension;

        $sourcePath = public_path('uploads/temp/' . $tempImage->name);
        $manager = new ImageManager(Driver::class);

        // Always create small image (required)
        $smallDir = public_path("uploads/$folder/small/");
        if (!File::exists($smallDir)) {
            File::makeDirectory($smallDir, 0755, true);
        }

        $smallPath = $smallDir . $imageName;
        $manager->read($sourcePath)->coverDown(500, 600)->save($smallPath);

        // Conditionally create large image
        if ($createLarge) {
            $largeDir = public_path("uploads/$folder/large/");
            if (!File::exists($largeDir)) {
                File::makeDirectory($largeDir, 0755, true);
            }

            $largePath = $largeDir . $imageName;
            $manager->read($sourcePath)->scaleDown(1200)->save($largePath);
        }

        // PHYSICAL CLEANUP: Delete the temp files immediately
        File::delete($sourcePath);
        File::delete(public_path('uploads/temp/thumbnails/' . $tempImage->name));

        return $imageName;
    }
}
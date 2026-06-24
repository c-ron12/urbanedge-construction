import React from 'react';
import { request } from '../components/common/httpClient';
import { getErrorMessage } from '../components/common/apiErrorHandler';
import { toast } from 'react-toastify';

export const useFormHelpers = (initialContent = '') => {
  // Form submission & Image states
  const [isDisabled, setIsDisabled] = React.useState(false); // Disable the submit button during image upload, false means enabled by default, true means disabled.
  const [imageId, setImageId] = React.useState(null); // Store the uploaded image ID to associate it with the form submission later. Initially null, meaning no image has been uploaded yet.
  const [imagePreview, setImagePreview] = React.useState(null); // Store the preview URL of the selected image to show it in the form before submission. Initially null, meaning no image has been selected yet.

  // WYSIWYG Editor states
  const editor = React.useRef(null); // Editor instance reference
  const [content, setContent] = React.useState(initialContent); // Editor content state

  // Image upload handler
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file)); // Show image preview immediately after file selection
    setIsDisabled(true);

    const formData = new FormData(); // FormData is built-in JS object to handle file uploads, like image, PDF etc, it helps to send file data as multipart/form-data.
    formData.append('image', file); // true means immediately disable the submit button during image upload, as soon as file is picked.

    try {
      const result = await request('temp-images', {
        method: 'POST',
        body: formData, // When using FormData, we should not set Content-Type header to multipart/form-data manually, because browser will automatically set it with the correct boundary. If we set it manually, the request will fail.
      });

      if (result.status === false) {
        toast.error(result.errors?.image?.[0] || 'Image upload failed');
        setImagePreview(null); // Clear image preview if upload fails
      } else {
        setImageId(result.data.id); // Store uploaded image id to use it during form submission, data and id are coming from backend API response from controller after successful image upload.
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Image upload failed'));
      setImagePreview(null); // Clear image preview if upload fails
    } finally {
      setIsDisabled(false); // false here means, RE-ENABLE THE SUBMIT BUTTON after API call is finished, whether it succeeded or failed. This ensures the user can try again if there was an error.
    }
  };

  const handleClearImage = (inputId = 'image', onClearCallback = null) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);
    setImageId(null);

    const fileInput = document.getElementById(inputId);
    if (fileInput) fileInput.value = '';

    // If a component passes a custom cleanup callback, run it now!
    if (typeof onClearCallback === 'function') {
      onClearCallback();
    }
  };

  return {
    isDisabled,
    setIsDisabled,
    imageId,
    setImageId,
    imagePreview,
    setImagePreview,
    handleFile,
    handleClearImage,
    // Editor exports
    editor,
    content,
    setContent,
  };
};

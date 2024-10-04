import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';

const ImageUpload = ({ onUpload, multiple = false }) => {
    const [isUploading, setIsUploading] = useState(false);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'vdlfsgok');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dbwefnkfe/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        setIsUploading(true);
        const uploadedUrls = await Promise.all(acceptedFiles.map(uploadImage));
        onUpload(multiple ? uploadedUrls : uploadedUrls[0]);
        setIsUploading(false);
    }, [onUpload, multiple]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple });

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary-500 bg-rose-50' : 'border-gray-300 hover:border-primary-500'
                    }`}
            >
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                {isDragActive ? (
                    <p className="text-primary-500">Drop the image(s) here ...</p>
                ) : (
                    <p className="text-gray-500">Drag 'n' drop image(s) here, or click to select files</p>
                )}
            </div>
            {isUploading && (
                <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin text-primary-500 text-2xl mr-2" />
                    <p>Uploading...</p>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;  // Make sure this line is present

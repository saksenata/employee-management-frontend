"use client";

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createUser, updateUser } from '@/services/userService';

interface UserFormInputs {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
  imageFile?: FileList;
}

interface UserFormProps {
  mode: 'add' | 'edit';
  user?: UserFormInputs;
  userId?: string;
}

function UserForm({ mode, user, userId }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserFormInputs>();

  const password = watch("password");
  const watchedImageFile = watch("imageFile");

  useEffect(() => {
    if (mode === 'edit' && user) {
      reset(user);
      if (user.image) {
        setImagePreview(user.image);
      }
    }
  }, [mode, user, reset]);

  useEffect(() => {
    if (watchedImageFile && watchedImageFile.length > 0) {
      const file = watchedImageFile[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [watchedImageFile]);

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const formData = {
        name: data.name,
        email: data.email,
      };

      let file: File | undefined;
      if (data.imageFile && data.imageFile.length > 0) {
        file = data.imageFile[0];
      }

      if (mode === 'add') {
        await createUser({
          ...formData,
          password: data.password!,
        }, file);
      } else if (mode === 'edit' && userId) {
        const updateData: any = {
          ...formData,
        };
        
        // Only include password if it's provided
        if (data.password) {
          updateData.password = data.password;
        }
        
        await updateUser(userId, updateData, file);
      }
      
      router.push('/users');
    } catch (err: any) {
      setError(err.message || `Failed to ${mode} user`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">
          {mode === 'add' ? 'Add New User' : 'Edit User'}
        </h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 w-full sm:w-auto"
        >
          Back
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-4 sm:p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {mode === 'add' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">
            Image {mode === 'edit' && '(leave empty to keep current)'}
          </label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            {...register("imageFile", { 
              validate: (value) => {
                if (value && value.length > 0) {
                  const file = value[0];
                  const maxSize = 5 * 1024 * 1024; // 5MB
                  if (file.size > maxSize) {
                    return "Image size must be less than 5MB";
                  }
                  if (!file.type.startsWith('image/')) {
                    return "Please select a valid image file";
                  }
                }
                return true;
              }
            })}
            className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.imageFile && (
            <p className="mt-2 text-sm text-red-600">{errors.imageFile.message}</p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </label>
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  // Clear the file input
                  const fileInput = document.getElementById('imageFile') as HTMLInputElement;
                  if (fileInput) {
                    fileInput.value = '';
                  }
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? (mode === 'add' ? 'Creating...' : 'Updating...') : (mode === 'add' ? 'Create User' : 'Update User')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm; 
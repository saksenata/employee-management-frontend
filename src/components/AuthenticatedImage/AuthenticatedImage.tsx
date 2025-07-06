"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { refreshToken } from '@/services/authService';

interface AuthenticatedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

function AuthenticatedImage({ src, alt, className, fallback }: AuthenticatedImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchImageWithAuth = async (url: string, retryCount = 0): Promise<Blob> => {
    try {
      // First try with accessToken
      let token = Cookies.get('accessToken');
      
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401 && retryCount === 0) {
        // Token might be expired, try to refresh
        try {
          await refreshToken();
          // Get the new token
          token = Cookies.get('accessToken');
          
          if (!token) {
            throw new Error('Failed to refresh token');
          }

          // Retry with new token
          const retryResponse = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!retryResponse.ok) {
            throw new Error(`Failed to fetch image: ${retryResponse.status}`);
          }

          return await retryResponse.blob();
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          throw new Error('Authentication failed');
        }
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }

      return await response.blob();
    } catch (err) {
      console.error('Error fetching image:', err);
      throw err;
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      if (!src) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);
        
        const blob = await fetchImageWithAuth(src);
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (err) {
        console.error('Error loading image:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();

    // Cleanup function to revoke object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [src]);

  if (loading) {
    return (
      <div className={`bg-gray-200 animate-pulse ${className}`}>
        <div className="w-full h-full bg-gray-300"></div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return fallback || (
      <div className={`bg-gray-200 flex items-center justify-center text-gray-500 text-xs ${className}`}>
        No img
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

export default AuthenticatedImage; 
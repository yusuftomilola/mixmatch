'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Music, Loader2 } from 'lucide-react';

const mockSpotifyLogin = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    token: 'mock-spotify-jwt-token',
  };
};

const mockAppleMusicLogin = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    token: 'mock-apple-music-jwt-token',
  };
};

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{
    spotify: boolean;
    apple: boolean;
  }>({
    spotify: false,
    apple: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSpotifyLogin = async () => {
    setIsLoading({ ...isLoading, spotify: true });
    setError(null);

    try {
      const response = await mockSpotifyLogin();

      if (response.success) {
        localStorage.setItem('auth_token', response.token);

        router.push('/onboarding');
      }
    } catch (err) {
      console.error('Spotify login error:', err);
      setError('Failed to login with Spotify. Please try again.');
    } finally {
      setIsLoading({ ...isLoading, spotify: false });
    }
  };

  const handleAppleMusicLogin = async () => {
    setIsLoading({ ...isLoading, apple: true });
    setError(null);

    try {
      const response = await mockAppleMusicLogin();

      if (response.success) {
        localStorage.setItem('auth_token', response.token);

        router.push('/onboarding');
      }
    } catch (err) {
      console.error('Apple Music login error:', err);
      setError('Failed to login with Apple Music. Please try again.');
    } finally {
      setIsLoading({ ...isLoading, apple: false });
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome
        </CardTitle>
        <CardDescription className="text-center">
          Sign in with your music streaming service
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}

        <Button
          variant="outline"
          className="w-full h-12 bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#1DB954] hover:text-[#1DB954] border-[#1DB954]/30 hover:border-[#1DB954]/50 font-medium"
          onClick={handleSpotifyLogin}
          disabled={isLoading.spotify || isLoading.apple}
        >
          {isLoading.spotify ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg
              className="mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              fill="currentColor"
            >
              <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 30.6 6.1 4.1 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
            </svg>
          )}
          Continue with Spotify
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 bg-black/5 hover:bg-black/10 text-black dark:bg-white/10 dark:hover:bg-white/20 dark:text-white border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 font-medium"
          onClick={handleAppleMusicLogin}
          disabled={isLoading.spotify || isLoading.apple}
        >
          {isLoading.apple ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg
              className="mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="currentColor"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
          )}
          Continue with Apple Music
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Music className="h-4 w-4 mr-1" />
          Find your musical matches
        </div>
      </CardFooter>
    </Card>
  );
}

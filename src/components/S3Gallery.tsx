"use client";
import { useState, useEffect } from 'react';
import { Card } from './Card'; // Import Card component

export default function S3Gallery() {
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImageKeys() {
      try {
        const res = await fetch('/api/listImages');
        if (!res.ok) {
          throw new Error('Failed to fetch image list');
        }
        const data = await res.json();
        setImageKeys(data.images);
      } catch (err) {
        setError('Failed to load images');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImageKeys();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {imageKeys.map((key) => (
        <Card key={key} imageKey={key} />
      ))}
    </div>
  );
}

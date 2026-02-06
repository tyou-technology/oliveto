'use client';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloudName = 'dvrq9mc1u';

  // Optimization parameters
  const params = [
    'f_auto',             // Automatic format selection (WebP/AVIF)
    'c_limit',            // Resize ensuring it fits within dimensions
    `w_${width}`,         // Dynamic width
    `q_${quality || 'auto'}` // Automatic quality
  ];

  // If it's a full URL, use Cloudinary Fetch API
  if (src.startsWith('http')) {
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${src}`;
  }

  // Remove leading slash if present
  let publicId = src.startsWith('/') ? src.slice(1) : src;

  // Enforce 'oliveto/' prefix if not present
  if (!publicId.startsWith('oliveto/')) {
    publicId = `oliveto/${publicId}`;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${publicId}`;
}

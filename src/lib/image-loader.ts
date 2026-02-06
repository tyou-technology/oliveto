'use client';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  // If the image is a local asset (starts with /), serve it directly
  if (src.startsWith('/')) {
    return src;
  }

  // If the image is already hosted on Cloudinary (e.g. from a previous upload),
  // we might want to handle it differently, but for "Fetch" optimization
  // of external URLs (S3, etc.), we use the fetch API.
  // Note: If src is already a Cloudinary URL, this double-wrapping might be redundant
  // but "fetch" generally handles it or we could optimize further.
  // For now, we assume src is a generic external URL.

  const cloudName = 'dvrq9mc1u';
  const params = [
    'f_auto',        // Auto format (WebP/AVIF)
    'c_limit',       // Resize limit (don't scale up)
    `w_${width}`,    // Width
    `q_${quality || 'auto'}` // Quality
  ];

  // Construct the Cloudinary Fetch URL
  // https://cloudinary.com/documentation/fetch_remote_images
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${src}`;
}

'use client';

interface ImageLoaderProps {
  src: string; // Aqui você passará o "Public ID" da imagem
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloudName = 'dvrq9mc1u';

  // Parâmetros de otimização
  const params = [
    'f_auto',             // Formato automático (WebP/AVIF)
    'c_limit',            // Redimensiona respeitando o limite
    `w_${width}`,         // Largura dinâmica
    `q_${quality || 'auto'}` // Qualidade automática
  ];

  // Se o src for uma URL completa, ainda usamos o fetch (opcional)
  if (src.startsWith('http')) {
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${src}`;
  }

  // Se for apenas o nome/ID da imagem (ex: "logo-empresa")
  // Removemos a barra inicial se existir para evitar erro na URL
  const publicId = src.startsWith('/') ? src.slice(1) : src;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${publicId}`;
}
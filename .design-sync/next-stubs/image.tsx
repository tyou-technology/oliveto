// Browser stub for next/image — renders a plain <img>, dropping Next-only props.
// Used only by the design-sync preview/bundle build, never by the real app.
import * as React from "react";

type ImgSrc = string | { src: string; height?: number; width?: number };

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "height" | "width"> {
  src: ImgSrc;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  loader?: unknown;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  sizes?: string;
}

function NextImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  quality,
  loader,
  placeholder,
  blurDataURL,
  unoptimized,
  style,
  ...rest
}: ImageProps) {
  const resolved = typeof src === "string" ? src : src?.src;
  const fillStyle: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
    : {};
  return (
    <img
      src={resolved}
      alt={alt}
      width={fill ? undefined : (width as number | undefined)}
      height={fill ? undefined : (height as number | undefined)}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  );
}

export default NextImage;

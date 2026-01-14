'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithSkeletonProps extends ImageProps {
  skeletonClassName?: string;
}

export default function ImageWithSkeleton({
  src,
  alt,
  className,
  skeletonClassName,
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${props.fill ? 'h-full w-full' : ''}`}>
      {isLoading && <div className={`animate-shimmer absolute inset-0 z-10 ${skeletonClassName || ''}`} />}
      <Image
        src={src}
        alt={alt}
        className={`${className || ''} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) {
            // @ts-ignore
            onLoad(e);
          }
        }}
        {...props}
      />
    </div>
  );
}

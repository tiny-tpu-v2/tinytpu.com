"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Slideshow({
  slides,
  title,
  aspectRatio = "aspect-square",
  description,
  intervalMs = 100,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prefetchedImages, setPrefetchedImages] = useState(new Set());
  const intervalRef = useRef(null);

  const totalSlides = slides.length;

  useEffect(() => {
    slides.forEach((src) => {
      if (!prefetchedImages.has(src)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
        setPrefetchedImages(prev => new Set([...prev, src]));
      }
    });
  }, [slides, prefetchedImages]);

  let descriptionText = null;
  if (Array.isArray(description)) {
    descriptionText = description[currentSlide] ?? null;
  } else if (typeof description === "string") {
    descriptionText = description;
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 500);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPlaying(false);
  };

  return (
    <div className="mt-2 mb-8">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}

      <div className={`w-full ${aspectRatio} rounded-2xl overflow-hidden`}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide]}
              alt={`clk ${currentSlide}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              quality={100}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      {descriptionText && (
        <p className="mt-2 text-sm text-gray-600 text-center">
          {descriptionText}
        </p>
      )}

      <div className="flex justify-center items-center gap-4 mt-4 mb-6">
        <span className="text-base md:text-lg text-neutral-600">
          clk {currentSlide}
        </span>
        <button
          onClick={goToPrevious}
          className="w-12 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-neutral-600"
            fill="currentColor"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-neutral-600"
              fill="currentColor"
            >
              <path d="M6 6h4v12H6zM14 6h4v12h-4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-neutral-600"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={stop}
          className="w-12 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-neutral-600"
            fill="currentColor"
          >
            <path d="M6 6h12v12H6z" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-neutral-600"
            fill="currentColor"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

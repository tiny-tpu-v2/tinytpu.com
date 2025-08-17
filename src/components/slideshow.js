'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Slideshow({ slides, title, aspectRatio = 'aspect-square' }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastViewedSlide, setLastViewedSlide] = useState(null);
  const intervalRef = useRef(null);

  const totalSlides = slides.length;

  const goToPrevious = () => {
    setLastViewedSlide(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setLastViewedSlide(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          setLastViewedSlide(prev);
          return (prev + 1) % totalSlides;
        });
      }, 2000);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPlaying(false);
    setLastViewedSlide(currentSlide);
    setCurrentSlide(0);
  };

  const returnBack = () => {
    if (lastViewedSlide !== null) {
      const temp = currentSlide;
      setCurrentSlide(lastViewedSlide);
      setLastViewedSlide(temp);
    }
  };

  return (
    <div className="my-8">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      
      <div className={`w-full ${aspectRatio} bg-white border border-neutral-300 rounded-2xl overflow-hidden`}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 -bottom-[80px]">
            <Image
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-contain scale-[1.011]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              quality={100}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start items-center gap-4 mt-4 mb-6">
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

        <button
          onClick={returnBack}
          disabled={lastViewedSlide === null}
          className="px-3 py-2 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center text-xs font-medium text-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Return back to where I last clicked from"
        >
          Return Back
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-neutral-600">
          Slide {currentSlide + 1} of {totalSlides}
        </span>
      </div>
    </div>
  );
}
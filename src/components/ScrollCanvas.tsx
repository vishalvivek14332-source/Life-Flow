import React, { useEffect, useRef, useState } from 'react';

interface ScrollCanvasProps {
  scrollProgress: number; // 0 to 1
}

const TOTAL_FRAMES = 300;

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentProgressRef = useRef<number>(0);
  const lastDrawnIndexRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  // Helper to get frame path
  const getFrameSrc = (index: number) => {
    const num = String(index + 1).padStart(3, '0');
    return `/frames/ezgif-frame-${num}.jpg`;
  };

  // Find nearest loaded frame
  const getNearestLoadedImage = (targetIdx: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[targetIdx]?.complete && images[targetIdx]?.naturalWidth) {
      return images[targetIdx];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIdx - offset;
      if (prev >= 0 && images[prev]?.complete && images[prev]?.naturalWidth) {
        return images[prev];
      }
      const next = targetIdx + offset;
      if (next < TOTAL_FRAMES && images[next]?.complete && images[next]?.naturalWidth) {
        return images[next];
      }
    }
    return null;
  };

  // Draw frame to canvas edge-to-edge without zooming in/out
  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover: fills canvas edge-to-edge, maintaining 1:1 aspect ratio with no zoom
    const scale = Math.max(cw / iw, ch / ih);
    const drawW = iw * scale;
    const drawH = ih * scale;
    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.fillStyle = '#060103';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // Resize canvas according to devicePixelRatio
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      lastDrawnIndexRef.current = -1; // Force redraw
    }
  };

  // Preload images
  useEffect(() => {
    // 1. Preload frame 0 immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      updateCanvasSize();
      drawFrame(firstImg);
      lastDrawnIndexRef.current = 0;
    };
    imagesRef.current[0] = firstImg;

    // 2. Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        imagesRef.current[i] = img;
      };
      imagesRef.current[i] = img;
    }

    const handleResize = () => {
      updateCanvasSize();
      const currIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );
      const img = getNearestLoadedImage(currIdx);
      if (img) drawFrame(img);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Smooth lerp render loop
  useEffect(() => {
    const render = () => {
      const target = scrollProgress;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.0001) {
        currentProgressRef.current = target;
      } else {
        currentProgressRef.current += diff * 0.08;
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastDrawnIndexRef.current) {
        const img = getNearestLoadedImage(frameIndex);
        if (img) {
          drawFrame(img);
          lastDrawnIndexRef.current = frameIndex;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [scrollProgress]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ transform: 'none' }}
      />
    </div>
  );
};

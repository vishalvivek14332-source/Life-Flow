import React, { useEffect, useState, RefObject } from 'react';

interface Point {
  x: number;
  y: number;
}

interface VascularFlowOverlayProps {
  containerRef: RefObject<HTMLDivElement | null>;
  card1Ref: RefObject<HTMLDivElement | null>;
  card2Ref: RefObject<HTMLDivElement | null>;
  card3Ref: RefObject<HTMLDivElement | null>;
  card4Ref: RefObject<HTMLDivElement | null>;
  centerRef: RefObject<HTMLDivElement | null>;
  opacity: number;
  scrollIntensity?: number;
}

export const VascularFlowOverlay: React.FC<VascularFlowOverlayProps> = ({
  containerRef,
  card1Ref,
  card2Ref,
  card3Ref,
  card4Ref,
  centerRef,
  opacity,
  scrollIntensity = 0,
}) => {
  const [paths, setPaths] = useState<{
    path1: string;
    path2: string;
    path3: string;
    path4: string;
  }>({ path1: '', path2: '', path3: '', path4: '' });

  const updateCoordinates = () => {
    if (!containerRef.current || !centerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    const getCenterPt = (): Point => ({
      x: centerRect.left + centerRect.width / 2 - containerRect.left,
      y: centerRect.top + centerRect.height / 2 - containerRect.top,
    });

    const getCardRightPt = (cardRef: RefObject<HTMLDivElement | null>): Point | null => {
      if (!cardRef.current) return null;
      const rect = cardRef.current.getBoundingClientRect();
      return {
        x: rect.right - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    };

    const getCardLeftPt = (cardRef: RefObject<HTMLDivElement | null>): Point | null => {
      if (!cardRef.current) return null;
      const rect = cardRef.current.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    };

    const centerPt = getCenterPt();
    const pt1 = getCardRightPt(card1Ref);
    const pt2 = getCardRightPt(card2Ref);
    const pt3 = getCardLeftPt(card3Ref);
    const pt4 = getCardLeftPt(card4Ref);

    // Generate smooth anatomical cubic Bezier curve
    const createLeftCurve = (from: Point, to: Point) => {
      const dx = to.x - from.x;
      const cp1x = from.x + dx * 0.45;
      const cp1y = from.y;
      const cp2x = from.x + dx * 0.65;
      const cp2y = to.y;
      return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
    };

    const createRightCurve = (from: Point, to: Point) => {
      const dx = from.x - to.x;
      const cp1x = from.x - dx * 0.45;
      const cp1y = from.y;
      const cp2x = from.x - dx * 0.65;
      const cp2y = to.y;
      return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
    };

    setPaths({
      path1: pt1 ? createLeftCurve(pt1, centerPt) : '',
      path2: pt2 ? createLeftCurve(pt2, centerPt) : '',
      path3: pt3 ? createRightCurve(pt3, centerPt) : '',
      path4: pt4 ? createRightCurve(pt4, centerPt) : '',
    });
  };

  useEffect(() => {
    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    const interval = setInterval(updateCoordinates, 100); // Keep synced during parallax movement

    return () => {
      window.removeEventListener('resize', updateCoordinates);
      clearInterval(interval);
    };
  }, []);

  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-15 overflow-hidden transition-opacity duration-150"
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 6px rgba(220, 38, 38, 0.4))' }}
      >
        <defs>
          {/* Subtle neon arterial glow gradient */}
          <linearGradient id="vesselGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.25)" />
            <stop offset="70%" stopColor="rgba(239, 68, 68, 0.85)" />
            <stop offset="100%" stopColor="rgba(255, 75, 75, 1)" />
          </linearGradient>

          <linearGradient id="vesselGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.25)" />
            <stop offset="70%" stopColor="rgba(239, 68, 68, 0.85)" />
            <stop offset="100%" stopColor="rgba(255, 75, 75, 1)" />
          </linearGradient>

          {/* Particle glow filter */}
          <filter id="bloodCellGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- VESSEL 1 (Card 1 -> Center) --- */}
        {paths.path1 && (
          <g>
            <path
              id="vesselPath1"
              d={paths.path1}
              fill="none"
              stroke="url(#vesselGradientLeft)"
              strokeWidth={1.5 + scrollIntensity * 0.8}
              strokeDasharray="4 3"
              strokeOpacity={0.65}
            />
            {/* Pulsing Core Line */}
            <path
              d={paths.path1}
              fill="none"
              stroke="rgba(255, 100, 100, 0.9)"
              strokeWidth="1"
              strokeOpacity={0.4}
            />
            {/* Traveling Blood Cell Particles */}
            <circle r="3" fill="#ff3344" filter="url(#bloodCellGlow)">
              <animateMotion path={paths.path1} dur="2.4s" repeatCount="indefinite" begin="0s" />
            </circle>
            <circle r="2" fill="#ff8899">
              <animateMotion path={paths.path1} dur="2.4s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle r="2.5" fill="#ee1133">
              <animateMotion path={paths.path1} dur="2.4s" repeatCount="indefinite" begin="1.6s" />
            </circle>
          </g>
        )}

        {/* --- VESSEL 2 (Card 2 -> Center) --- */}
        {paths.path2 && (
          <g>
            <path
              id="vesselPath2"
              d={paths.path2}
              fill="none"
              stroke="url(#vesselGradientLeft)"
              strokeWidth={1.5 + scrollIntensity * 0.8}
              strokeDasharray="4 3"
              strokeOpacity={0.65}
            />
            <path
              d={paths.path2}
              fill="none"
              stroke="rgba(255, 100, 100, 0.9)"
              strokeWidth="1"
              strokeOpacity={0.4}
            />
            <circle r="3" fill="#ff3344" filter="url(#bloodCellGlow)">
              <animateMotion path={paths.path2} dur="2.7s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle r="2" fill="#ff8899">
              <animateMotion path={paths.path2} dur="2.7s" repeatCount="indefinite" begin="1.2s" />
            </circle>
            <circle r="2.5" fill="#ee1133">
              <animateMotion path={paths.path2} dur="2.7s" repeatCount="indefinite" begin="2.0s" />
            </circle>
          </g>
        )}

        {/* --- VESSEL 3 (Card 3 -> Center) --- */}
        {paths.path3 && (
          <g>
            <path
              id="vesselPath3"
              d={paths.path3}
              fill="none"
              stroke="url(#vesselGradientRight)"
              strokeWidth={1.5 + scrollIntensity * 0.8}
              strokeDasharray="4 3"
              strokeOpacity={0.65}
            />
            <path
              d={paths.path3}
              fill="none"
              stroke="rgba(255, 100, 100, 0.9)"
              strokeWidth="1"
              strokeOpacity={0.4}
            />
            <circle r="3" fill="#ff3344" filter="url(#bloodCellGlow)">
              <animateMotion path={paths.path3} dur="2.5s" repeatCount="indefinite" begin="0.1s" />
            </circle>
            <circle r="2" fill="#ff8899">
              <animateMotion path={paths.path3} dur="2.5s" repeatCount="indefinite" begin="0.9s" />
            </circle>
            <circle r="2.5" fill="#ee1133">
              <animateMotion path={paths.path3} dur="2.5s" repeatCount="indefinite" begin="1.7s" />
            </circle>
          </g>
        )}

        {/* --- VESSEL 4 (Card 4 -> Center) --- */}
        {paths.path4 && (
          <g>
            <path
              id="vesselPath4"
              d={paths.path4}
              fill="none"
              stroke="url(#vesselGradientRight)"
              strokeWidth={1.5 + scrollIntensity * 0.8}
              strokeDasharray="4 3"
              strokeOpacity={0.65}
            />
            <path
              d={paths.path4}
              fill="none"
              stroke="rgba(255, 100, 100, 0.9)"
              strokeWidth="1"
              strokeOpacity={0.4}
            />
            <circle r="3" fill="#ff3344" filter="url(#bloodCellGlow)">
              <animateMotion path={paths.path4} dur="2.8s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle r="2" fill="#ff8899">
              <animateMotion path={paths.path4} dur="2.8s" repeatCount="indefinite" begin="1.4s" />
            </circle>
            <circle r="2.5" fill="#ee1133">
              <animateMotion path={paths.path4} dur="2.8s" repeatCount="indefinite" begin="2.2s" />
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
};

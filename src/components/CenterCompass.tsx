import React, { useState } from 'react';
import { Droplet, Heart, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface CenterCompassProps {
  onOpenDonate: (bloodType?: string) => void;
  isDark?: boolean;
  badgeRef?: React.RefObject<HTMLDivElement | null>;
  scrollLightWave?: number; // 0 to 1 intensity
}

const BLOOD_INFO: Record<
  string,
  {
    canGiveTo: string[];
    canReceiveFrom: string[];
    tag: string;
    urgency: 'Critical' | 'High' | 'Normal';
    impact: string;
  }
> = {
  'O-': {
    canGiveTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-'],
    tag: 'Universal Red Cell Donor',
    urgency: 'Critical',
    impact: 'First choice for trauma and emergency rooms worldwide.',
  },
  'O+': {
    canGiveTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O+', 'O-'],
    tag: 'Most Needed Blood Type',
    urgency: 'High',
    impact: 'Given to more patients than any other blood type.',
  },
  'A+': {
    canGiveTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
    tag: 'High Platelet Value',
    urgency: 'High',
    impact: 'Crucial for cancer patients and surgical trauma recovery.',
  },
  'A-': {
    canGiveTo: ['A-', 'A+', 'AB-', 'AB+'],
    canReceiveFrom: ['A-', 'O-'],
    tag: 'Rare & Vital',
    urgency: 'Critical',
    impact: 'Only 6% of the population has A- negative blood.',
  },
  'B+': {
    canGiveTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
    tag: 'Essential Supply',
    urgency: 'Normal',
    impact: 'Supports sickle-cell and surgical treatment programs.',
  },
  'B-': {
    canGiveTo: ['B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['B-', 'O-'],
    tag: 'Rare Blood Group',
    urgency: 'Critical',
    impact: 'Extremely scarce supply needed for regular transfusions.',
  },
  'AB+': {
    canGiveTo: ['AB+'],
    canReceiveFrom: ['All Blood Types'],
    tag: 'Universal Recipient',
    urgency: 'Normal',
    impact: 'Universal recipient for red cells and ideal plasma donor.',
  },
  'AB-': {
    canGiveTo: ['AB-', 'AB+'],
    canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
    tag: 'Rarest Blood Type',
    urgency: 'High',
    impact: 'Rarest blood group on Earth, accounting for under 1%.',
  },
};

export const CenterCompass: React.FC<CenterCompassProps> = ({
  onOpenDonate,
  isDark = true,
  badgeRef,
  scrollLightWave = 0,
}) => {
  const [selectedType, setSelectedType] = useState<string>('O+');
  const info = BLOOD_INFO[selectedType];

  return (
    <div className="relative w-full max-w-md mx-auto my-auto flex flex-col items-center text-center px-4 py-3">
      {/* Dynamic ambient red light wave aura expanding during scroll */}
      <div
        className="absolute inset-0 max-w-sm mx-auto -z-10 rounded-full pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 50% 35%, rgba(239, 68, 68, ${0.15 + scrollLightWave * 0.35}) 0%, rgba(185, 28, 28, ${0.08 + scrollLightWave * 0.15}) 45%, transparent 75%)`,
          transform: `scale(${1 + scrollLightWave * 0.4})`,
        }}
        aria-hidden="true"
      />

      {/* Central Heart/Droplet badge with anatomical cardiac lub-dub pulse */}
      <div className="relative mb-5 flex items-center justify-center">
        {/* Radiating arterial light waves */}
        <div className="absolute -inset-4 rounded-full bg-red-600/25 animate-arterial-wave pointer-events-none" />
        <div className="absolute -inset-4 rounded-full bg-red-500/20 animate-arterial-wave-delayed pointer-events-none" />

        {/* Scroll-responsive light wave flare */}
        {scrollLightWave > 0.05 && (
          <div
            className="absolute -inset-8 rounded-full pointer-events-none transition-opacity duration-200"
            style={{
              background: 'radial-gradient(circle, rgba(255, 50, 50, 0.4) 0%, transparent 70%)',
              opacity: scrollLightWave,
              transform: `scale(${1.2 + scrollLightWave * 0.6})`,
            }}
          />
        )}

        {/* Main pulsating heart badge */}
        <div
          ref={badgeRef}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-500 via-rose-600 to-red-700 flex items-center justify-center text-white cursor-pointer animate-cardiac-beat transition-transform duration-200"
        >
          <Droplet className="w-8 h-8 sm:w-9 sm:h-9 fill-white/25 stroke-white stroke-[2.2] drop-shadow-sm" />
        </div>
      </div>

      {/* Blood Type Selector Bar */}
      <div className="w-full">
        <p className={`text-xs uppercase tracking-wider font-semibold mb-2.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Select Your Blood Group
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {Object.keys(BLOOD_INFO).map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md scale-105 ring-2 ring-red-400/50'
                    : isDark
                    ? 'bg-black/50 text-slate-300 hover:text-white hover:bg-white/15 border border-white/10 shadow-2xs'
                    : 'bg-white/90 text-slate-700 hover:text-slate-950 hover:bg-red-50 border border-slate-200/80 shadow-2xs'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimalist Compatibility Preview Card */}
      <div
        className={`mt-4 w-full p-4 rounded-2xl backdrop-blur-xl border text-left transition-all ${
          isDark
            ? 'bg-black/60 border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-slate-100'
            : 'bg-white/95 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-900'
        }`}
      >
        <div className={`flex items-center justify-between gap-2 border-b pb-2.5 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-red-500">{selectedType}</span>
            <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>· {info.tag}</span>
          </div>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              info.urgency === 'Critical'
                ? 'bg-red-900/60 text-red-200 border border-red-700/50'
                : info.urgency === 'High'
                ? 'bg-rose-900/60 text-rose-200 border border-rose-700/50'
                : 'bg-emerald-900/60 text-emerald-200 border border-emerald-700/50'
            }`}
          >
            {info.urgency} Need
          </span>
        </div>

        <p className={`mt-2 text-xs leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {info.impact}
        </p>

        <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-xs ${isDark ? 'border-white/10 text-slate-300' : 'border-slate-100/80 text-slate-700'}`}>
          <div>
            <span className={isDark ? 'text-slate-400 font-medium' : 'text-slate-600 font-medium'}>Can give to: </span>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {info.canGiveTo.slice(0, 4).join(', ')}
              {info.canGiveTo.length > 4 ? ` +${info.canGiveTo.length - 4}` : ''}
            </span>
          </div>
          <button
            onClick={() => onOpenDonate(selectedType)}
            className="text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded"
          >
            <span>Book</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ArrowRight, Droplet, Activity } from 'lucide-react';

interface BloodAvailabilityProps {
  onFindBloodNearMe: () => void;
  onSelectBloodGroup?: (type: string) => void;
}

interface BloodGroupData {
  group: string;
  status: 'Available' | 'Low' | 'Critical';
  level: number; // 0 to 100%
  units: number;
}

const BLOOD_GROUPS: BloodGroupData[] = [
  { group: 'A+', status: 'Available', level: 82, units: 246 },
  { group: 'A−', status: 'Low', level: 38, units: 54 },
  { group: 'B+', status: 'Available', level: 75, units: 198 },
  { group: 'B−', status: 'Critical', level: 18, units: 22 },
  { group: 'AB+', status: 'Available', level: 68, units: 89 },
  { group: 'AB−', status: 'Critical', level: 12, units: 14 },
  { group: 'O+', status: 'Low', level: 32, units: 84 },
  { group: 'O−', status: 'Critical', level: 15, units: 19 },
];

export const BloodAvailabilitySection: React.FC<BloodAvailabilityProps> = ({
  onFindBloodNearMe,
  onSelectBloodGroup,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blood-availability"
      className="relative z-10 w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#080205] via-[#0e0207] to-[#060103] text-white rounded-t-[36px] sm:rounded-t-[54px] -mt-12 sm:-mt-16 border-t border-red-500/40 shadow-[0_-20px_50px_rgba(0,0,0,0.85),0_-2px_18px_rgba(225,29,72,0.35)]"
    >
      {/* Luminous Glowing Red Arterial Top Border Line */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_rgba(239,68,68,0.95)] pointer-events-none rounded-t-[54px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-red-600/20 via-rose-600/5 to-transparent blur-md pointer-events-none"
        aria-hidden="true"
      />

      {/* Central Illuminated Node on the Border */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-20">
        <div className="px-4 py-1 rounded-full bg-[#0d0206] border border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.65)] flex items-center gap-2 text-[11px] text-red-300 font-bold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>INVENTORY MATRIX</span>
        </div>
      </div>

      {/* Soft Ambient Medical CGI Red/Pink Luminous Glow Aura */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_25%,rgba(244,63,94,0.12),rgba(225,29,72,0.05),transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[340px] bg-red-600/[0.07] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header Area */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-3 mb-3.5">
            <span className="w-8 sm:w-12 h-px bg-red-500/60" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.24em] text-red-500 uppercase drop-shadow-sm flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 stroke-[2.5]" />
              LIVE INVENTORY
            </span>
            <span className="w-8 sm:w-12 h-px bg-red-500/60" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            Blood Availability
          </h2>

          <p className="mt-3.5 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal max-w-xl mx-auto">
            Check blood availability and find the help you need.
          </p>
        </div>

        {/* 4x2 Grid of 8 Compact Blood-Group Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          {BLOOD_GROUPS.map((item, index) => {
            const isCritical = item.status === 'Critical';
            const isLow = item.status === 'Low';
            const isAvailable = item.status === 'Available';

            return (
              <div
                key={item.group}
                onClick={() => onSelectBloodGroup?.(item.group)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectBloodGroup?.(item.group);
                  }
                }}
                className={`group relative p-5 rounded-3xl backdrop-blur-xl border transition-all duration-700 ease-out cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 select-none ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                } ${
                  isCritical
                    ? 'bg-red-950/[0.18] border-red-500/30 shadow-[0_8px_30px_rgba(220,38,38,0.15)] hover:border-red-500/60 hover:shadow-[0_12px_36px_rgba(239,68,68,0.3)]'
                    : isLow
                    ? 'bg-rose-950/[0.12] border-rose-500/25 shadow-[0_8px_30px_rgba(244,63,94,0.1)] hover:border-rose-400/50 hover:shadow-[0_12px_36px_rgba(244,63,94,0.22)]'
                    : 'bg-white/[0.04] border-white/[0.1] shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-emerald-500/40 hover:shadow-[0_12px_36px_rgba(16,185,129,0.18)]'
                } hover:-translate-y-1.5`}
                style={{
                  transitionDelay: `${index * 65}ms`,
                }}
              >
                {/* Subtle card glow accent */}
                <div
                  className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 ${
                    isCritical
                      ? 'bg-gradient-to-b from-red-500/20 to-transparent'
                      : isLow
                      ? 'bg-gradient-to-b from-rose-500/15 to-transparent'
                      : 'bg-gradient-to-b from-emerald-500/15 to-transparent'
                  }`}
                />

                {/* Specular glass top border highlight */}
                <div
                  className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-3xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Row: Blood Group Letter & Status Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-[26px] font-black tracking-tight text-white group-hover:text-red-400 transition-colors">
                      {item.group}
                    </span>
                    <Droplet
                      className={`w-3.5 h-3.5 ${
                        isCritical
                          ? 'fill-red-500 text-red-500'
                          : isLow
                          ? 'fill-rose-400 text-rose-400'
                          : 'fill-emerald-400 text-emerald-400'
                      }`}
                    />
                  </div>

                  {/* Status Pill Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                      isCritical
                        ? 'bg-red-950/80 border-red-700/60 text-red-300 shadow-2xs'
                        : isLow
                        ? 'bg-rose-950/70 border-rose-600/50 text-rose-300'
                        : 'bg-emerald-950/70 border-emerald-600/50 text-emerald-300'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCritical
                          ? 'bg-red-500 animate-ping'
                          : isLow
                          ? 'bg-rose-400'
                          : 'bg-emerald-400'
                      }`}
                    />
                    {item.status}
                  </span>
                </div>

                {/* Minimal Animated Blood-Level Indicator */}
                <div className="space-y-1.5 mt-2">
                  <div className="flex justify-between items-center text-[11px] font-medium text-slate-400">
                    <span>Reserve Level</span>
                    <span className="text-white font-semibold">{item.level}%</span>
                  </div>

                  {/* Gauge Container with animated liquid fill */}
                  <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden p-0.5 border border-white/[0.05]">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                        isCritical
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                          : isLow
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      }`}
                      style={{
                        width: isVisible ? `${item.level}%` : '0%',
                        transitionDelay: `${index * 65 + 200}ms`,
                      }}
                    >
                      {/* Gentle shimmering wave pulse passing across liquid */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    </div>
                  </div>
                </div>

                {/* Footer Count */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                  <span>Available stock</span>
                  <span className="font-semibold text-slate-200">
                    {item.units} Units
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prominent "Find Blood Near Me" Action Button */}
        <div
          className={`transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={onFindBloodNearMe}
            className="group relative inline-flex items-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-semibold text-sm sm:text-base shadow-[0_6px_28px_rgba(225,29,72,0.45)] hover:shadow-[0_8px_38px_rgba(225,29,72,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <MapPin className="w-5 h-5 text-red-200 group-hover:scale-110 transition-transform" />
            <span>Find Blood Near Me</span>
            <ArrowRight className="w-4 h-4 text-red-200 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

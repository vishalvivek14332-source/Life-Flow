import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Calendar,
  ShieldCheck,
  HeartPulse,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroCard } from './components/HeroCard';
import { CenterCompass } from './components/CenterCompass';
import { ScrollCanvas } from './components/ScrollCanvas';
import { VascularFlowOverlay } from './components/VascularFlowOverlay';
import { BloodAvailabilitySection } from './components/BloodAvailabilitySection';
import {
  DonateModal,
  BeDonorModal,
  FindDonorModal,
  CampsModal,
  SaveLivesModal,
  SearchModal,
  AboutModal,
  ContactModal,
} from './components/Modals';

export default function App() {
  // Modal states
  const [donateOpen, setDonateOpen] = useState(false);
  const [beDonorOpen, setBeDonorOpen] = useState(false);
  const [findDonorOpen, setFindDonorOpen] = useState(false);
  const [campsOpen, setCampsOpen] = useState(false);
  const [saveLivesOpen, setSaveLivesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [prefilledBloodType, setPrefilledBloodType] = useState('O+');

  // Element Refs for anatomical vascular connections
  const heroGridRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const card4Ref = useRef<HTMLDivElement | null>(null);
  const centerBadgeRef = useRef<HTMLDivElement | null>(null);

  // Section 1 scroll tracking & smooth lerp loop
  const section1TrackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const [lerpedProgress, setLerpedProgress] = useState(0);
  const lerpedProgressRef = useRef(0);

  // Dynamic light waves intensity on scroll activity
  const [scrollLightWave, setScrollLightWave] = useState(0);
  const targetLightWaveRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!section1TrackRef.current) return;
      const rect = section1TrackRef.current.getBoundingClientRect();
      const scrollableDistance = section1TrackRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) {
        setScrollProgress(0);
        targetProgressRef.current = 0;
        return;
      }
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
      setScrollProgress(progress);
      targetProgressRef.current = progress;

      // Calculate scroll activity for arterial red light waves
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollYRef.current);
      lastScrollYRef.current = currentY;
      targetLightWaveRef.current = Math.min(1, targetLightWaveRef.current + delta * 0.035);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // High performance RAF lerp loop (60fps/120fps)
    let animId: number;
    const lerpLoop = () => {
      // 1. Lerp scroll progress with 0.08 damping for silky synchrony
      const diff = targetProgressRef.current - lerpedProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        lerpedProgressRef.current += diff * 0.08;
        setLerpedProgress(lerpedProgressRef.current);
      }

      // 2. Smoothly decay scroll light wave ripple
      targetLightWaveRef.current *= 0.92;
      setScrollLightWave((prev) => {
        const next = prev + (targetLightWaveRef.current - prev) * 0.15;
        return next < 0.005 ? 0 : next;
      });

      animId = requestAnimationFrame(lerpLoop);
    };
    animId = requestAnimationFrame(lerpLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleOpenDonateWithBlood = (bloodType?: string) => {
    if (bloodType) setPrefilledBloodType(bloodType);
    setDonateOpen(true);
  };

  const handleQuickAction = (type: string) => {
    if (type === 'donate') setDonateOpen(true);
    if (type === 'find-donor') setFindDonorOpen(true);
    if (type === 'camps') setCampsOpen(true);
    if (type === 'save-lives') setSaveLivesOpen(true);
  };

  // Parallax downward displacement for left and right cards
  const cardsParallaxY = Math.min(320, lerpedProgress * 650);
  const cardsOpacity = Math.max(0, 1 - lerpedProgress * 3.2);

  // Subtle 3D perspective slide and tilt values
  const leftSlideX = -lerpedProgress * 35;
  const rightSlideX = lerpedProgress * 35;
  const cardTiltY = lerpedProgress * 4.5; // degrees

  // Vascular flow lines opacity
  const vascularLinesOpacity = Math.max(0, 1 - lerpedProgress * 3.4);

  // Center heart, blood bag and center compass remain fixed and stable
  const centerCompassOpacity = Math.max(0, 1 - lerpedProgress * 3.2);
  const headerOpacity = Math.max(0, 1 - lerpedProgress * 3.8);
  const isHeroInteractive = cardsOpacity > 0.15;

  return (
    <div className="min-h-screen bg-[#060103] text-slate-100 font-sans flex flex-col justify-between selection:bg-red-600 selection:text-white relative overflow-x-clip">
      {/* =========================================================================
          SECTION 1: 3D SMOOTH SCROLL ANIMATION & HERO INTERACTIVE MEDICAL LAYOUT
          Center heart & blood bag remain stable; cards slide in with subtle 3D parallax;
          Thin glowing red blood-flow lines carry animated blood particles to center heart.
          ========================================================================= */}
      <section
        ref={section1TrackRef}
        className="relative w-full h-[450vh] z-0"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
          {/* Edge-to-Edge Fixed 3D Scroll Canvas (Heart & Blood Bag stay centered and stable) */}
          <ScrollCanvas scrollProgress={scrollProgress} />

          {/* Section 1 Overlaid Content */}
          <div
            className={`relative z-10 w-full h-full flex flex-col justify-between ${
              isHeroInteractive ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {/* Top Navigation Bar */}
            <div
              style={{ opacity: headerOpacity }}
              className="transition-opacity duration-100"
            >
              <Navbar
                isDark={true}
                onOpenDonate={() => setDonateOpen(true)}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenFindDonor={() => setFindDonorOpen(true)}
                onOpenCamps={() => setCampsOpen(true)}
                onOpenContact={() => setContactOpen(true)}
                onOpenAbout={() => setAboutOpen(true)}
              />
            </div>

            {/* Main Hero Viewport Area */}
            <main className="relative flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              {/* 1. Header Typography Area (Center - Remains fixed and fades out gently) */}
              <div
                className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 transition-opacity duration-100"
                style={{ opacity: headerOpacity }}
              >
                <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                  <span className="w-8 sm:w-14 h-px bg-red-500/70" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-red-500 uppercase drop-shadow-sm">
                    GIVE BLOOD &nbsp;·&nbsp; SAVE LIVES
                  </span>
                  <span className="w-8 sm:w-14 h-px bg-red-500/70" aria-hidden="true" />
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-md">
                  <span>A Drop Today</span>
                  <span className="block text-red-500 mt-1 sm:mt-2">
                    A Brighter Tomorrow
                  </span>
                </h1>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed text-balance font-normal drop-shadow">
                  Your blood can give someone a second chance.
                  <span className="block sm:inline"> Be the reason for a healthier, happier tomorrow.</span>
                </p>
              </div>

              {/* 2. Interactive Grid Container (Houses vascular lines & cards) */}
              <div
                ref={heroGridRef}
                className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-8 items-center max-w-6xl mx-auto w-full"
              >
                {/* Thin Glowing Red Blood-Flow Lines with Animated Blood Particles */}
                <VascularFlowOverlay
                  containerRef={heroGridRef}
                  card1Ref={card1Ref}
                  card2Ref={card2Ref}
                  card3Ref={card3Ref}
                  card4Ref={card4Ref}
                  centerRef={centerBadgeRef}
                  opacity={vascularLinesOpacity}
                  scrollIntensity={scrollLightWave}
                />

                {/* LEFT COLUMN: 2 Cards with 3D Parallax & Downward Slide */}
                <div
                  className="lg:col-span-3 flex flex-col items-center lg:items-end gap-4 sm:gap-5 will-change-transform z-20"
                  style={{
                    transform: `perspective(1000px) translate3d(${leftSlideX}px, ${cardsParallaxY}px, 0) rotateY(${-cardTiltY}deg)`,
                    opacity: cardsOpacity,
                    transition: 'transform 0.08s ease-out, opacity 0.15s ease-out',
                  }}
                >
                  <HeroCard
                    ref={card1Ref}
                    icon={<Users className="w-5 h-5 text-white" />}
                    title="Be a Donor"
                    description="Your small act can save up to 3 lives."
                    badgeColor="bg-gradient-to-br from-red-500 to-rose-600 text-white"
                    isDark={true}
                    onClick={() => setBeDonorOpen(true)}
                  />

                  <HeroCard
                    ref={card2Ref}
                    icon={<Calendar className="w-5 h-5 text-white" />}
                    title="Blood Donation Camps"
                    description="Find upcoming camps near you."
                    badgeColor="bg-gradient-to-br from-red-500 to-rose-600 text-white"
                    isDark={true}
                    onClick={() => setCampsOpen(true)}
                  />
                </div>

                {/* CENTER COLUMN: Central Heart Node (Fixed and stable in place with cardiac heartbeat) */}
                <div
                  className="lg:col-span-6 flex flex-col items-center justify-center my-1 sm:my-0 transition-opacity duration-100 z-20"
                  style={{ opacity: centerCompassOpacity }}
                >
                  <CenterCompass
                    badgeRef={centerBadgeRef}
                    onOpenDonate={handleOpenDonateWithBlood}
                    isDark={true}
                    scrollLightWave={scrollLightWave}
                  />
                </div>

                {/* RIGHT COLUMN: 2 Cards with Mirrored 3D Parallax & Downward Slide */}
                <div
                  className="lg:col-span-3 flex flex-col items-center lg:items-start gap-4 sm:gap-5 will-change-transform z-20"
                  style={{
                    transform: `perspective(1000px) translate3d(${rightSlideX}px, ${cardsParallaxY}px, 0) rotateY(${cardTiltY}deg)`,
                    opacity: cardsOpacity,
                    transition: 'transform 0.08s ease-out, opacity 0.15s ease-out',
                  }}
                >
                  <HeroCard
                    ref={card3Ref}
                    icon={<ShieldCheck className="w-5 h-5 text-white" />}
                    title="Find a Donor"
                    description="Get connected with verified blood donors."
                    badgeColor="bg-gradient-to-br from-red-500 to-rose-600 text-white"
                    isDark={true}
                    onClick={() => setFindDonorOpen(true)}
                  />

                  <HeroCard
                    ref={card4Ref}
                    icon={<HeartPulse className="w-5 h-5 text-white" />}
                    title="Save Lives"
                    description="Your donation brings hope."
                    badgeColor="bg-gradient-to-br from-red-500 to-rose-600 text-white"
                    isDark={true}
                    onClick={() => setSaveLivesOpen(true)}
                  />
                </div>
              </div>

              {/* 3. Bottom: Scroll to Explore Indicator */}
              <div
                className="mt-6 sm:mt-8 flex flex-col items-center justify-center text-center transition-opacity duration-100 z-20"
                style={{ opacity: headerOpacity }}
              >
                <a
                  href="#explore-section"
                  className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1"
                  aria-label="Scroll to explore more about blood donation"
                >
                  <div className="w-5 h-8 rounded-full border-[1.8px] border-slate-300 flex items-start justify-center p-1 group-hover:border-red-500 transition-colors">
                    <div className="w-1 h-2 bg-red-500 rounded-full animate-bounce" />
                  </div>

                  <span className="mt-1.5 text-xs font-medium text-slate-300 tracking-wide group-hover:text-red-400 transition-colors">
                    Scroll to Explore
                  </span>
                </a>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOOD AVAILABILITY SECTION
          Directly below the existing hero: 4x2 grid of 8 blood groups, animated levels,
          staggered scroll entrance, and Find Blood Near Me CTA.
          ========================================================================= */}
      <BloodAvailabilitySection
        onFindBloodNearMe={() => setFindDonorOpen(true)}
        onSelectBloodGroup={handleOpenDonateWithBlood}
      />

      {/* =========================================================================
          SECTION 3: IMPACT & PURPOSE WITH HANDFLOW ANIMATION VIDEO BACKGROUND
          Seamless video playing in the background with text & glassmorphism overlay
          ========================================================================= */}
      <section
        id="explore-section"
        className="relative z-10 w-full overflow-hidden border-t border-white/10 py-24 px-4 sm:px-6 lg:px-8 bg-[#060103]"
      >
        {/* Ambient Video Background Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-35 scale-105 filter saturate-125 contrast-110"
            src="/handflow.mp4"
          />
          {/* Multi-layered cinematic gradient overlays for seamless contrast & readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060103] via-black/40 to-[#040002]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-black/70" />
        </div>

        {/* Foreground Content with Crisp Text & Glassmorphic Cards */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] text-red-400 bg-red-950/60 border border-red-500/30 uppercase backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
              IMPACT & PURPOSE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
              Every Drop Counts
            </h2>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed drop-shadow">
              Learn how your contribution transforms lives across emergency care, oncology, and surgical recovery.
            </p>
          </div>

          {/* 3-Column Impact Highlights with Frosted Glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-black/55 backdrop-blur-xl border border-white/15 hover:border-red-500/50 hover:bg-black/75 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-red-600/25 border border-red-500/30 text-red-400 flex items-center justify-center font-bold text-sm mb-5 shadow-inner">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                Every 2 Seconds
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Someone in the world needs blood for accident trauma, cardiovascular surgeries, or organ transplants.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-black/55 backdrop-blur-xl border border-white/15 hover:border-red-500/50 hover:bg-black/75 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-red-600/25 border border-red-500/30 text-red-400 flex items-center justify-center font-bold text-sm mb-5 shadow-inner">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                1 Pint = 3 Lives
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A single whole blood donation can be separated into red cells, platelets, and plasma to treat up to three distinct patients.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-black/55 backdrop-blur-xl border border-white/15 hover:border-red-500/50 hover:bg-black/75 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-red-600/25 border border-red-500/30 text-red-400 flex items-center justify-center font-bold text-sm mb-5 shadow-inner">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                10-Minute Process
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The actual blood draw takes only 8–10 minutes. Your body naturally replenishes fluids within 24 hours.
              </p>
            </div>
          </div>

          {/* Quick Schedule Banner with Glassmorphic Gradient */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-950/70 via-black/80 to-slate-950/80 backdrop-blur-xl border border-white/15 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Ready to be someone's hero?
              </h3>
              <p className="text-slate-300 text-sm mt-1 max-w-lg">
                Join our volunteer network or book a 15-minute donation slot at a local mobile camp or partner hospital.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setBeDonorOpen(true)}
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 hover:border-white/50 text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Register as Donor
              </button>
              <button
                onClick={() => setDonateOpen(true)}
                className="px-6 py-2.5 rounded-full text-sm font-medium bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Minimalist Footer */}
      <footer className="w-full bg-[#040002] border-t border-white/10 py-6 px-4 sm:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">LifeFlow</span>
            <span>· Give Blood, Save Lives</span>
          </div>
          <div>
            <span>© 2026 LifeFlow Foundation. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <DonateModal
        isOpen={donateOpen}
        onClose={() => setDonateOpen(false)}
        initialBloodType={prefilledBloodType}
      />
      <BeDonorModal
        isOpen={beDonorOpen}
        onClose={() => setBeDonorOpen(false)}
      />
      <FindDonorModal
        isOpen={findDonorOpen}
        onClose={() => setFindDonorOpen(false)}
      />
      <CampsModal
        isOpen={campsOpen}
        onClose={() => setCampsOpen(false)}
      />
      <SaveLivesModal
        isOpen={saveLivesOpen}
        onClose={() => setSaveLivesOpen(false)}
        onOpenDonate={() => setDonateOpen(true)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectAction={handleQuickAction}
      />
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

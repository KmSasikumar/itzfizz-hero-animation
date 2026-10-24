import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CarSvg from "./CarSvg.jsx";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];

// Demo figures in the spirit of the reference brief. These are placeholders
// for the animation demo, not verified Itzfizz client results.
const METRICS = [
  { value: 58, suffix: "%", label: "Increase in pick-up point use" },
  { value: 23, suffix: "%", label: "Decrease in customer phone calls" },
  { value: 27, suffix: "%", label: "Increase in landing-page conversions" },
  { value: 40, suffix: "%", label: "Growth in repeat bookings" },
];

export default function Hero() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const letters = gsap.utils.toArray(".hero-letter");
      const numbers = gsap.utils.toArray(".metric-number");

      // Reduced motion: show everything in its final state, no pin, no scrub.
      if (reduced) {
        numbers.forEach((el, i) => {
          el.textContent = String(METRICS[i].value);
        });
        return;
      }

      // ---- 1. Initial load animation (plays once, not scroll-driven) ----
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-letter", { y: 70, opacity: 0, duration: 0.9, stagger: 0.045 })
        .from(".hero-tagline", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-car", { y: 40, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-cue", { opacity: 0, duration: 0.6 }, "-=0.4");

      // ---- 2. Scroll-driven animation: pinned hero, scrubbed progress ----
      // This timeline is built ONLY after the intro finishes (see the
      // onComplete hook at the end). The intro and this scrub timeline
      // animate the same properties on the headline, tagline, and cue; if
      // this timeline were created while the intro was still playing, its
      // tweens would capture the intro's transient mid-flight values as
      // their start state, so scrolling back to progress 0 would render
      // those captured values instead of the loaded state. Deferring
      // creation until the intro has finished removes the overlap, and the
      // headline/tagline/cue tweens below use fromTo with explicit natural
      // start values, so progress 0 always renders the initial loaded state.
      // scrub: 1 smooths the mapping from scroll position to animation
      // progress, which is what gives the visible easing on scroll.
      // Every animated property below is a transform or opacity — no
      // layout-affecting properties (no width/height/top/letter-spacing).
      const buildScroll = () => {
      ctx.add(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power2.inOut" },
      });

      const center = (letters.length - 1) / 2;

      tl
        // Scroll progress bar across the top.
        .to(".hero-progress", { scaleX: 1, ease: "none", duration: 1 }, 0)
        // Car drives across the hero; wheels spin twice over the same scroll.
        .to(
          ".hero-car",
          { x: () => rootRef.current.offsetWidth * 0.52, duration: 1, ease: "power1.inOut" },
          0,
        )
        .to(".car-wheel", { rotation: 720, transformOrigin: "50% 50%", duration: 1, ease: "none" }, 0)
        // Road dashes slide left, selling the driving motion.
        .to(".road-dashes", { xPercent: -25, duration: 1, ease: "none" }, 0)
        // Background blobs drift in opposite directions (parallax).
        .to(".blob-a", { yPercent: -30, duration: 1, ease: "none" }, 0)
        .to(".blob-b", { yPercent: 30, duration: 1, ease: "none" }, 0)
        // Headline letters fan outward from the centre and fade as you scroll.
        .fromTo(
          ".hero-letter",
          { x: 0, y: 0, opacity: 1 },
          {
            x: (i) => (i - center) * 16,
            y: -70,
            opacity: 0.12,
            duration: 0.8,
            stagger: 0.02,
          },
          0.1,
        )
        .fromTo(".hero-tagline", { y: 0, opacity: 1 }, { y: -30, opacity: 0, duration: 0.5 }, 0.15)
        .fromTo(".hero-cue", { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0)
        // Metric cards rise in with a stagger, tied to scroll progress.
        .from(".metric-card", { y: 60, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.35);

      // Metric numbers count up, driven by the same scroll progress.
      numbers.forEach((el, i) => {
        const target = METRICS[i].value;
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: target,
            duration: 0.55,
            ease: "power1.inOut",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
          },
          0.4 + i * 0.05,
        );
      });
      });
      };
      intro.eventCallback("onComplete", buildScroll);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0F14]"
    >
      {/* Scroll progress bar */}
      <div className="hero-progress absolute left-0 top-0 z-30 h-1 w-full origin-left scale-x-0 bg-lime-300" />

      {/* Parallax background blobs */}
      <div className="blob-a absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-lime-400/20 blur-3xl" />
      <div className="blob-b absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-8 pt-16 text-center">
        <p className="hero-tagline text-xs font-semibold uppercase tracking-[0.35em] text-lime-300">
          Scroll-driven hero &middot; Itzfizz Digital
        </p>

        <h1
          aria-label="Welcome Itzfizz"
          className="mt-6 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 text-4xl font-black leading-none tracking-[0.08em] sm:text-6xl md:text-7xl"
        >
          {WORDS.map((word) => (
            <span key={word} className="flex">
              {word.split("").map((ch, i) => (
                <span key={`${word}-${i}`} className="hero-letter">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-tagline mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          A growth-agency hero that moves with your scroll — headline, car and
          results, all driven by scroll progress rather than scroll triggers.
        </p>

        <div className="hero-car mt-8 w-full max-w-xl">
          <CarSvg />
        </div>

        {/* Road: dashes slide left as the car drives right */}
        <div className="relative mt-1 h-6 w-full overflow-hidden" aria-hidden="true">
          <div className="road-dashes flex w-[200%] gap-8 pt-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="h-[3px] w-16 shrink-0 rounded bg-white/25" />
            ))}
          </div>
        </div>

        {/* Impact metrics */}
        <div className="mt-8 grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={`${m.label}-${m.value}`}
              className="metric-card rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur sm:p-5"
            >
              <div className="text-3xl font-black text-lime-300 sm:text-5xl">
                <span className="metric-number">0</span>
                {m.suffix}
              </div>
              <p className="mt-2 text-sm leading-snug text-white/70">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-cue relative z-10 pb-8 text-center text-xs uppercase tracking-[0.3em] text-white/50">
        Scroll to drive &darr;
      </div>
    </section>
  );
}

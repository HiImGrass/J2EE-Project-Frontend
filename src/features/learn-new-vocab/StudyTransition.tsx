import { useEffect, useState } from "react";

type Origin = { x: number; y: number };

interface StudyTransitionProps {
  origin?: Origin;
  message?: string;
  duration?: number;
  onComplete: () => void;
}

const EXIT_MS = 350;

export default function StudyTransition({
  origin,
  message = "Let's get started",
  duration = 1800,
  onComplete,
}: StudyTransitionProps) {
  const [open, setOpen] = useState(false); // vòng tròn loang ra
  const [exiting, setExiting] = useState(false); // mờ dần trước khi chuyển

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    const tExit = setTimeout(() => setExiting(true), duration - EXIT_MS);
    const tDone = setTimeout(onComplete, duration);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, [duration, onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        opacity: exiting ? 0 : 1,
        transition: `opacity ${EXIT_MS}ms ease-out`,
      }}
    >
      <style>{`
        @keyframes st-text-in {
          from { opacity: 0; transform: translateY(16px) scale(.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .st-text { animation-duration: 1ms !important; animation-delay: 0ms !important; }
        }
      `}</style>

      {/* Lớp màu loang từ điểm click */}
      <div
        className="absolute inset-0 bg-primary"
        style={{
          clipPath: `circle(${open ? "150%" : "0%"} at ${x}px ${y}px)`,
          transition: "clip-path 700ms cubic-bezier(.7,0,.2,1)",
        }}
      />

      {/* Câu chữ giữa màn hình */}
      <div className="relative flex h-full items-center justify-center px-6">
        <h1
          className="st-text whitespace-nowrap text-center text-3xl font-bold text-white sm:text-5xl"
          style={{
            opacity: 0,
            animation: "st-text-in 600ms cubic-bezier(.2,.9,.3,1) 450ms forwards",
          }}
        >
          {message}
        </h1>
      </div>
    </div>
  );
}
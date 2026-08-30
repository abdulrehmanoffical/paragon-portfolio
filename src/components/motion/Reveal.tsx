"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        }
      }
    );
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

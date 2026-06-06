"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapScroll(
  ref: RefObject<HTMLElement | null>,
  animation: gsap.TweenVars,
  trigger?: Partial<ScrollTrigger.Vars>
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...animation,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          ...trigger,
        },
      });
    });

    return () => ctx.revert();
  }, [ref, animation, trigger]);
}

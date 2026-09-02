"use client";

import { useEffect, useRef, useState } from "react";

/*
    Fades a block in the first time it scrolls into view, using
    IntersectionObserver directly so the landing page does not need
    an animation library.

    The block renders visible and is only hidden once the observer
    is actually attached, so the page still reads normally if the
    javascript never runs.
*/
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"initial" | "hidden" | "shown">(
    "initial"
  );

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${className} ${
        state === "shown"
          ? "animate-fade-up"
          : state === "hidden"
          ? "opacity-0"
          : ""
      }`}
    >
      {children}
    </div>
  );
}

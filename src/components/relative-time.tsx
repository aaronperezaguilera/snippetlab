"use client";

import { useEffect } from "react";

interface RelativeTimeProps {
  datetime: Date;
}

export function RelativeTime({ datetime }: RelativeTimeProps) {
  // 1) import dinámico sólo en cliente
  useEffect(() => {
    import("@github/relative-time-element");
  }, []);

  // 2) usa directamente el tag custom
  return <relative-time datetime={datetime}></relative-time>;
}

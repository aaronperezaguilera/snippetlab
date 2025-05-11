"use client";

import { useEffect } from "react";

interface RelativeTimeProps {
  datetime: Date;
}

export function RelativeTime({ datetime }: RelativeTimeProps) {
  useEffect(() => {
    import("@github/relative-time-element");
  }, []);

  return <relative-time datetime={String(datetime)}></relative-time>;
}

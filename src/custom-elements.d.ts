// src/relative-time-element.d.ts
import "@github/relative-time-element";
import * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "relative-time": React.DetailedHTMLProps<
        React.TimeHTMLAttributes<HTMLTimeElement>,
        HTMLTimeElement
      > & { datetime: string };
    }
  }
}

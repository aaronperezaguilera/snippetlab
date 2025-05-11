export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      {...props}
    >
      <mask
        id="mask0_32_11"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="34"
        height="34"
      >
        <path d="M34 0.867554H0V32.271H34V0.867554Z" fill="white" />
        <path
          d="M19.3139 11.6964V18.4942C19.3137 18.8743 19.4112 19.2483 19.5974 19.5819L25.7576 32.2711M8.24243 32.2711L14.4024 19.5819C14.5886 19.2483 14.6861 18.8743 14.6859 18.4942V11.6964M11.8736 26.289H22.1264M12.9505 11.6964H21.0494"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_32_11)">
        <path d="M17 0.867554L34 32.271H0L17 0.867554Z" fill="#FAFAFA" />
      </g>
    </svg>
  );
}

export function LogoMuted(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      {...props}
    >
      <mask
        id="mask0_32_11"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="34"
        height="34"
      >
        <path d="M34 0.867554H0V32.271H34V0.867554Z" fill="white" />
        <path
          d="M19.3139 11.6964V18.4942C19.3137 18.8743 19.4112 19.2483 19.5974 19.5819L25.7576 32.2711M8.24243 32.2711L14.4024 19.5819C14.5886 19.2483 14.6861 18.8743 14.6859 18.4942V11.6964M11.8736 26.289H22.1264M12.9505 11.6964H21.0494"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_32_11)">
        <path d="M17 0.867554L34 32.271H0L17 0.867554Z" fill="#a1a1a1" />
      </g>
    </svg>
  );
}

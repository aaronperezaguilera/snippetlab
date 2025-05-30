export function ClerkCard() {
  return (
    <article className="border col-span-8 flex flex-col rounded-sm overflow-hidden p-8">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <h3 className="text-2xl">Secure Authentication with Clerk</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Access with email/password or through external providers (Google,
          GitHub) thanks to Clerk. Production-ready security and scalability for
          your snippets project.
        </p>
      </div>
      <div className="w-100 mx-auto flex justify-center h-full">
        <svg
          viewBox="0 0 43 12"
          fill="none"
          aria-hidden="true"
          data-sentry-element="svg"
          data-sentry-source-file="UIComponents.tsx"
          data-sentry-component="ClerkLogo"
        >
          <circle
            cx="6.834"
            cy="6"
            r="1.875"
            fill="#747686"
            data-sentry-element="circle"
            data-sentry-source-file="UIComponents.tsx"
          ></circle>
          <path
            fill="#747686"
            d="M10.212 10.44c.16.159.144.423-.044.548A5.972 5.972 0 0 1 6.834 12a5.972 5.972 0 0 1-3.335-1.012.356.356 0 0 1-.044-.549l1.37-1.37a.405.405 0 0 1 .472-.064c.46.236.983.37 1.537.37a3.36 3.36 0 0 0 1.536-.37.405.405 0 0 1 .472.064l1.37 1.37Z"
            data-sentry-element="path"
            data-sentry-source-file="UIComponents.tsx"
          ></path>
          <path
            fill="#747686"
            d="M10.169 1.011c.187.126.203.39.044.55l-1.37 1.37a.405.405 0 0 1-.472.063 3.375 3.375 0 0 0-4.542 4.542c.08.157.06.349-.064.473l-1.37 1.37a.356.356 0 0 1-.55-.044 6 6 0 0 1 8.323-8.323Z"
            opacity=".5"
            data-sentry-element="path"
            data-sentry-source-file="UIComponents.tsx"
          ></path>
          <path
            fill="#747686"
            fillRule="evenodd"
            d="M20.426 1.219c0-.052.042-.094.094-.094h1.406c.052 0 .094.042.094.094v9.562a.094.094 0 0 1-.094.094H20.52a.094.094 0 0 1-.094-.094V1.22ZM18.44 8.847a.096.096 0 0 0-.129.004 2.508 2.508 0 0 1-1.732.675 2.111 2.111 0 0 1-.827-.142 2.076 2.076 0 0 1-.7-.451c-.364-.37-.573-.9-.573-1.53 0-1.263.84-2.126 2.1-2.126.338-.005.673.063.98.2.28.124.53.3.738.52a.097.097 0 0 0 .133.009l.95-.822a.092.092 0 0 0 .009-.13c-.715-.798-1.833-1.21-2.897-1.21-2.142 0-3.661 1.445-3.661 3.57 0 1.052.377 1.937 1.014 2.562.637.625 1.544.993 2.59.993 1.312 0 2.368-.503 2.987-1.149a.091.091 0 0 0-.007-.132l-.975-.841Zm11.325-.977a.093.093 0 0 1-.092.082h-4.927a.09.09 0 0 0-.088.114c.245.908.975 1.458 1.973 1.458.336.007.67-.062.974-.202.284-.13.535-.32.738-.553a.069.069 0 0 1 .096-.009l.99.862c.038.033.044.09.011.129-.598.705-1.566 1.218-2.896 1.218-2.045 0-3.588-1.417-3.588-3.568 0-1.056.363-1.941.97-2.566.319-.322.702-.576 1.126-.746a3.4 3.4 0 0 1 1.334-.245c2.073 0 3.414 1.458 3.414 3.471a5.72 5.72 0 0 1-.035.555Zm-5.078-1.306a.09.09 0 0 0 .088.114h3.275a.09.09 0 0 0 .089-.115c-.223-.772-.79-1.288-1.67-1.288a1.826 1.826 0 0 0-1.382.572c-.184.208-.32.453-.4.717Zm9.987-2.72c.052 0 .095.042.095.095v1.574a.094.094 0 0 1-.101.094 6.153 6.153 0 0 0-.39-.021c-1.227 0-1.947.863-1.947 1.996v3.2a.094.094 0 0 1-.094.093h-1.406a.094.094 0 0 1-.094-.094V4.036c0-.052.042-.094.094-.094h1.406c.052 0 .094.042.094.094v.947a.01.01 0 0 0 .017.005c.55-.734 1.362-1.142 2.219-1.142l.107-.001Zm3.809 4.124a.03.03 0 0 1 .048.005l1.778 2.858a.094.094 0 0 0 .08.044h1.598c.074 0 .119-.08.08-.143l-2.44-3.936a.094.094 0 0 1 .01-.112L41.99 4.09a.094.094 0 0 0-.07-.156h-1.667a.094.094 0 0 0-.07.03l-2.718 2.964a.094.094 0 0 1-.163-.063V1.219a.094.094 0 0 0-.094-.094h-1.406a.094.094 0 0 0-.094.094v9.562c0 .052.042.094.094.094h1.406a.094.094 0 0 0 .094-.094V9.276c0-.023.009-.046.025-.063l1.158-1.245Z"
            clipRule="evenodd"
            data-sentry-element="path"
            data-sentry-source-file="UIComponents.tsx"
          ></path>
        </svg>
      </div>
    </article>
  );
}

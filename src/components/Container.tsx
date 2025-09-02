import * as React from "react";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export function Container({ children, className }: Props) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>{children}</div>
  );
}



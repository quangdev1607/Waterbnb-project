import { ReactNode } from "react";

export default function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}

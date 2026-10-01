"use client";

import StoreProvider from "@/store/StoreProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <StoreProvider>{children}</StoreProvider>;
}

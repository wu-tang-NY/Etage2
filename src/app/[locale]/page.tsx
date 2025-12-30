"use client";

import dynamic from "next/dynamic";
import { useBreakpoints } from "@/hooks/useBreakpoints";

const MobilePage = dynamic(() => import("@/views/Main/MobilePage"), {
  ssr: false,
});

const DefaultPage = dynamic(() => import("@/views/Main/DefaultPage"), {
  ssr: false,
});

export default function HomePage() {
  const { mobile, tablet } = useBreakpoints();

  return <>{mobile || tablet ? <MobilePage /> : <DefaultPage />}</>;
}

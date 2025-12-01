import { Suspense } from "react";
import HomePageClient from "./HomePageClient";
import SplashScreen from "@/components/splashScreen/SplashScreen";

export default function Page() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <HomePageClient />
    </Suspense>
  );
}

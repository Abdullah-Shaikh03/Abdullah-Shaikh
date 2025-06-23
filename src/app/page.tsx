import { Suspense } from "react";
import Home from "@/components/Home";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Loading.....
        </div>
      }
    >
      <Home />
    </Suspense>
  );
}

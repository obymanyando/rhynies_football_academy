import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { UtilityBar } from "./UtilityBar";

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="label-voice sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-mustard focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <UtilityBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ScrollToTop } from "@/components/common/ScrollToTop";
import { Layout } from "@/components/layout/Layout";
import About from "@/pages/About";
import Coaches from "@/pages/Coaches";
import Competitions from "@/pages/Competitions";
import Contact from "@/pages/Contact";
import Fixtures from "@/pages/Fixtures";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import News from "@/pages/News";
import NotFound from "@/pages/NotFound";
import Programmes from "@/pages/Programmes";
import Support from "@/pages/Support";
import Teams from "@/pages/Teams";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

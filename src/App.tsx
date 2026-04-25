import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import Features from "./components/Features";
import Experience from "./components/Experience";
import Skills from "./components/Stack";
import Work from "./components/Work";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandMenu from "./components/CommandMenu";
import ChatWidget from "./components/ChatWidget";

function App() {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Header onOpenCommand={() => setCmdOpen(true)} />
      <main>
        <Hero />
        <Carousel />
        <Features />
        <Experience />
        <Skills />
        <Work />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />
      <ChatWidget />
      <Analytics />
    </>
  );
}

export default App;

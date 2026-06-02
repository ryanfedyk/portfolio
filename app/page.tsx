import Hero from "./components/portfolio/Hero";
import Transformations from "./components/portfolio/Transformations";
import Patents from "./components/portfolio/Patents";
import EasterEggs from "./components/portfolio/EasterEggs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Transformations />
      <Patents />
      <EasterEggs />
    </main>
  );
}

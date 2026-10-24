import Hero from "./components/Hero.jsx";
import AfterHero from "./components/AfterHero.jsx";

export default function App() {
  return (
    <main className="overflow-x-clip bg-[#0B0F14] text-white antialiased">
      <Hero />
      <AfterHero />
    </main>
  );
}

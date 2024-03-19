import { Footer } from "@/modules/footer";
import { HeroSection } from "@/modules/home-hero";
import { NavBar } from "@/modules/nav-bar";

export default async function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <Footer />
    </>
  );
}

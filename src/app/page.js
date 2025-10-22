import Image from "next/image";
import Header from "./_features/Home/Header";
import HeroSection from "./_features/Home/HeroSection";
import { PopularMovieList } from "./_features/Home/PopularMovieList";
import { UpcomingMovie } from "./_features/Home/UpcomingMovie";
import { TopRatedMovie } from "./_features/Home/TopRatedMovie";
import Footer from "./_features/Footer";

export default function Home() {
  return (
    <div className="w-[100vh h-[100vh">
      <Header />
      <HeroSection />
      <UpcomingMovie />
      <PopularMovieList />
      <TopRatedMovie />
      <Footer />
    </div>
  );
}

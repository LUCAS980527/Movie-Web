import Image from "next/image";
import Header from "./_features/Home/Header";
import HeroSection from "./_features/Home/HeroSection";
import { PopularMovieList } from "./_features/Home/PopularMovieList";
import { UpcomingMovie } from "./_features/Home/UpcomingMovie";
import { TopRatedMovie } from "./_features/Home/TopRatedMovie";
import Footer from "./_features/Footer";
import { MovieList } from "./_features/Home/MovieList";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MovieList type="upcoming" />
      <MovieList type="popular" />
      <MovieList type="top_rated" />
    </div>
  );
}

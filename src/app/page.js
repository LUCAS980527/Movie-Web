import HeroSection from "./_features/Home/HeroSection";
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

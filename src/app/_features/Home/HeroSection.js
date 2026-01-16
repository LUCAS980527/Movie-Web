"use client";
import PlayIcon from "@/_Icons/PlayIcon";
import StarIcon from "@/_Icons/StarIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function HeroSection() {
  const [heroSectionData, setHeroSectionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [trailerLoading, setTrailerLoading] = useState(false);

  const getHeroSectionData = async () => {
    setLoading(true);
    const heroSectionEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
    const response = await fetch(heroSectionEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setHeroSectionData(data.results || []);
    setLoading(false);
  };

  const getMovieVideos = async (movieId) => {
    if (!movieId) return;
    setTrailerLoading(true);
    const movieVideosEndpoint = `${BASE_URL}/movie/${movieId}/videos?language=en-US`;
    const response = await fetch(movieVideosEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setMovieTrailer(data.results || []);
    setTrailerLoading(false);
  };

  const handleWatchTrailerButton = (id) => {
    setSelectedMovieId(id);
    getMovieVideos(id);
  };

  useEffect(() => {
    getHeroSectionData();
  }, []);

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="bg-cover bg-center h-[600px] w-[1440px]">
      <Carousel className="w-full max-w-full">
        <CarouselContent className="h-[600px]">
          {heroSectionData.slice(0, 3).map((movie) => (
            <CarouselItem key={movie.id}>
              <div className="">
                <Card>
                  <CardContent className="flex items-center justify-center h-[600px] w-[1440px]">
                    <div
                      className="relative bg-cover bg-center bg-no-repeat h-[600px] w-full"
                      style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                      }}
                    >
                      <div className="absolute flex flex-col justify-center  left-35 bottom-40 w-[404px]">
                        <span className="text-white font-inter text-base font-normal leading-6">
                          Now playing:
                        </span>
                        <h1 className="text-white text-4xl font-bold mb-2">
                          {movie.title}
                        </h1>
                        <div className="flex items-center gap-2  font-inter">
                          <StarIcon />
                        </div>
                        <p className="text-gray-300 max-w-md  font-inter mb-6">
                          {movie.overview}
                        </p>
                        <button
                          onClick={() => handleWatchTrailerButton(movie.id)}
                          style={{ cursor: "pointer" }}
                          className="flex items-center gap-2 bg-white text-black pl-4 rounded-md font-inter w-[145px] h-[40px]"
                        >
                          <PlayIcon /> Watch Trailer
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Dialog
        open={!!selectedMovieId}
        onOpenChange={() => setSelectedMovieId(null)}
      >
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Watch Trailer</DialogTitle>
          </DialogHeader>

          {trailerLoading ? (
            <div className="text-center text-white p-4">Loading trailer...</div>
          ) : movieTrailer.length > 0 ? (
            <iframe
              src={`https://www.youtube.com/embed/${
                movieTrailer.find((v) => v.site === "YouTube")?.key
              }`}
              className="w-full h-[450px] rounded-lg"
              allowFullScreen
            />
          ) : (
            <p className="text-gray-300 text-center p-4">error</p>
          )}

          <DialogFooter>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

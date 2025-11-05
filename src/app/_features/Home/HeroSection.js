"use clint";
import PlayIcon from "@/_Icons/PlayIcon";
import StarIcon from "@/_Icons/StarIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function HeroSection() {
  const images = [];
  const [heroSectionData, setHeroSectionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState({});
  const [trailerLoading, setTrailerLoading] = useState(false);

  const getHeroSectionData = async () => {
    setLoading(true);
    const heroSectionEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
    const response = await fetch(upcomingMovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,

        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setHeroSectionData(data.results);
    setTimeout(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    getHeroSectionData();
  }, []);

  const getMovieVideos = async () => {
    setTrailerLoading(true);
    const heroSectionEndpoint = `${BASE_URL}/movie/${selectedMovieId}/videos?language=en-US`;
    const response = await fetch(upcomingMovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,

        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="bg-cover bg-center h-[600px] w-[1440px]">
      <Carousel className="w-full max-full">
        <CarouselContent className="h-[600px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex  items-center justify-center h-[600px] w-[1440px]">
                    <div
                      className="relative bg-cover bg-center bg-no-repeat h-[600px] w-full"
                      style={
                        {
                          // backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                        }
                      }
                    >
                      <div className=" h-[600px] w-[1440px] bg-cover bg-center bg-no-repeat align-center  mt-6">
                        <div className=" flex w-[404px] h-[264px] ml-35 pt-45 gap-[16px] flex-col">
                          <div className="w-[404px] h-[112px]">
                            <div className="text-white font-inter font-normal text-[16px] leading-[24px] tracking-[0em]">
                              Now Playing:
                            </div>
                            <StarIcon />
                          </div>
                          <div className="flex w-[145px] h-[40px] bg-white rounded-sm items-center justify-center py-2 px-4 gap-2">
                            <PlayIcon />

                            <button className="font-inter font-medium text-[14px] leading-[20px] tracking-[0]">
                              Watch Trailer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

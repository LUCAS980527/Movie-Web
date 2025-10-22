"use client";

import ArrowIcon from "@/_Icons/ArrowIcon";
import { MovieCards } from "../../_components/Movie-Cards";
import { useEffect, useState } from "react";
const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export const UpcomingMovie = () => {
  const [upcomingMovieData, setUpcomingMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUpcomingMovieData = async () => {
    setLoading(true);
    const upcomingMovieEndpoint = `${BASE_URL}/movie/upcoming?language=en-US&page=1`;
    const response = await fetch(upcomingMovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,

        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUpcomingMovieData(data.results);
    setLoading(false);
  };
  useEffect(() => {
    getUpcomingMovieData();
  }, []);

  return (
    <div className="flex items-center justify-center w-[1437px] h-[978px] flex-col mt-[53px] gap-[32px]">
      <div className="w-[1277px] h-[36px] flex justify-between ">
        <div className="font-inter font-semibold text-[24px] leading-[32px] tracking-[-0.025em]">
          Upcoming
        </div>
        <div className="flex w-[120px] h-[36px] items-center justify-center">
          <button className="font-inter font-medium text-[14px] leading-[20px] tracking-[0]">
            See more
          </button>
          <div>
            <ArrowIcon />
          </div>
        </div>
      </div>
      <div className=" gap-8 grid grid-cols-5  w-[1437px] h-[978px] px-[80px] box-border">
        {upcomingMovieData.slice(0, 10).map((movie, index) => {
          return (
            <MovieCards
              key={index}
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
            />
          );
        })}
        {/* <div className="flex gap-[32px]">
          <MovieCards />
          <MovieCards />
          <MovieCards />
          <MovieCards />
          <MovieCards />
        </div>
        <div className="flex gap-[32px]">
          <MovieCards />
          <MovieCards />
          <MovieCards />
          <MovieCards />
          <MovieCards />
        </div> */}
      </div>
    </div>
  );
};

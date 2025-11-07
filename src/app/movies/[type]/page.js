"use client";

import { MovieCards } from "../../_components/Movie-Cards";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
const titles = {
  upcoming: "Upcoming",
  popular: "Popular",
  top_rated: "Top Rated",
};
const Page = () => {
  const [page, setPage] = useState(1);
  const { type } = useParams();

  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);

  const getUpcomingMovieData = async () => {
    setLoading(true);
    const upcomingMovieEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=${page}`;
    const response = await fetch(upcomingMovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,

        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMovieData(data.results);
    setLoading(false);
    setTotalPages(data.total_pages);
  };
  useEffect(() => {
    getUpcomingMovieData();
  }, [page, type]);

  const handleSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };
  const handleChangePage = () => {
    setPage();
  };
  console.log("MovieData", movieData);
  const handlePreviousPage = () => {
    if (page < totalPages) setPage((page) => page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage((page) => page + 1);
  };

  return (
    <div className="flex items-center justify-center w-[1437px] h-[978px] flex-col mt-[53px] gap-[32px]">
      <div className="w-[1277px] h-[36px] flex justify-between ">
        <div className="font-inter font-semibold text-[24px] leading-[32px] tracking-[-0.025em]">
          {titles[type]}
        </div>
        {/* <div className="flex w-[120px] h-[36px] items-center justify-center ">
          <button
            className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] cursor-pointer"
            onClick={handleSeeMoreButton}
          >
            See more
          </button>
          <div>
            <ArrowIcon /> 
          </div>
        </div> */}
      </div>
      <div className=" gap-8 grid grid-cols-5  w-[1437px] h-[978px] px-[80px] box-border">
        {movieData.slice(0, 10).map((movie, index) => {
          return (
            <MovieCards
              key={index}
              id={movie.id}
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
            />
          );
        })}
      </div>
      <div className="flex w-full justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePreviousPage();
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(page - 2, 0), Math.min(page + 3, totalPages))
              .map((num) => (
                <PaginationItem key={num}>
                  <PaginationLink
                    href="#"
                    isActive={page === num}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(num);
                    }}
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {page < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNextPage();
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;

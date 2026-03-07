"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import DownIcon from "@/_Icons/DownIcon";
import FilmIcon from "@/_Icons/FilmIcon";
import MoonIcon from "@/_Icons/MoonIcon";
import SearchIcon from "@/_Icons/SearchIcon";
import OneStarIcon from "@/_Icons/OneStarIcon";
import ArrowIcon from "@/_Icons/ArrowIcon";
import { useTheme } from "@/app/_context/ThemeContext";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export default function Header() {
  const { toggleTheme } = useTheme();

  const router = useRouter();
  const searchBoxRef = useRef(null);

  const [genres, setGenres] = useState([]);
  const [showGenres, setShowGenres] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      const data = await res.json();
      setGenres(data.genres || []);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const trimmed = searchValue.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/search/movie?query=${encodeURIComponent(
            trimmed,
          )}&language=en-US&page=1&include_adult=false`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          },
        );
        const data = await res.json();
        setSuggestions((data.results || []).slice(0, 5));
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    router.push(`/search?q=${searchValue}`);
    setShowSuggestions(false);
    setSearchValue("");
  };

  const handleGenre = (genreId) => {
    router.push(`/genre/${genreId}`);
    setShowGenres(false);
  };

  const handleOpenMovie = (id) => {
    router.push(`/movie/${id}`);
    setShowSuggestions(false);
    setSearchValue("");
  };

  const handleSeeAll = () => {
    if (!searchValue.trim()) return;
    router.push(`/search?q=${searchValue.trim()}`);
    setShowSuggestions(false);
    setSearchValue("");
  };

  return (
    <div className="flex w-[1440px] h-[59px] items-center justify-around relative">
      <Link href="/">
        <button className="cursor-pointer">
          <FilmIcon />
        </button>
      </Link>

      <div className="flex gap-[12px]">
        <button
          onClick={() => setShowGenres(!showGenres)}
          className="flex h-[36px] w-[97px] border rounded-md items-center justify-center gap-[8px] border-gray-200"
        >
          <DownIcon />
          Genre
        </button>

        {showGenres && (
          <div className="absolute top-[50px] left-[35%] bg-white border rounded-md shadow-lg z-50 w-[150px]">
            {genres.map((g) => (
              <div
                key={g.id}
                onClick={() => handleGenre(g.id)}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {g.name}
              </div>
            ))}
          </div>
        )}

        <div className="relative" ref={searchBoxRef}>
          <form
            onSubmit={handleSearch}
            className="flex h-[36px] w-[379px] border rounded-md items-center border-gray-200 bg-white"
          >
            <div className="flex text-gray-400 items-center ml-[12px] gap-[8px]">
              <SearchIcon />
            </div>

            <input
              value={searchValue}
              onFocus={() =>
                searchValue.trim().length >= 2 && setShowSuggestions(true)
              }
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="outline-none w-full px-2 text-sm"
            />
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-[42px] left-0 z-50 w-[560px] rounded-md border border-gray-200 bg-white shadow-lg">
              {suggestions.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleOpenMovie(movie.id)}
                  className="flex w-full items-center justify-between border-b border-gray-100 px-3 py-2 text-left last:border-b-0 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-[72px] w-[50px] overflow-hidden rounded bg-gray-200">
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title || "Movie poster"}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{movie.title}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <OneStarIcon />
                        <span>
                          {typeof movie.vote_average === "number"
                            ? movie.vote_average.toFixed(1)
                            : "0.0"}
                        </span>
                        <span>/10</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {movie.release_date
                          ? String(movie.release_date).slice(0, 4)
                          : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <span>See more</span>
                    <ArrowIcon />
                  </div>
                </button>
              ))}

              <button
                onClick={handleSeeAll}
                className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
              >
                See all results for &quot;{searchValue.trim()}&quot;
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="flex w-[36px] h-[36px] border rounded-md items-center justify-center border-gray-200 dark:border-gray-700"
      >
        <MoonIcon />
      </button>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import DownIcon from "@/_Icons/DownIcon";
import FilmIcon from "@/_Icons/FilmIcon";
import MoonIcon from "@/_Icons/MoonIcon";
import SearchIcon from "@/_Icons/SearchIcon";
import { useTheme } from "@/app/_context/ThemeContext";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export default function Header() {
  const { toggleTheme } = useTheme();

  const router = useRouter();

  const [genres, setGenres] = useState([]);
  const [showGenres, setShowGenres] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    router.push(`/search?q=${searchValue}`);
    setSearchValue("");
  };

  const handleGenre = (genreId) => {
    router.push(`/genre/${genreId}`);
    setShowGenres(false);
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

        <form
          onSubmit={handleSearch}
          className="flex h-[36px] w-[379px] border rounded-md items-center border-gray-200"
        >
          <div className="flex text-gray-400 items-center ml-[12px] gap-[8px]">
            <SearchIcon />
          </div>

          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="outline-none w-full px-2 text-sm"
          />
        </form>
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

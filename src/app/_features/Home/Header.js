"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import DownIcon from "@/_Icons/DownIcon";
import FilmIcon from "@/_Icons/FilmIcon";
import MoonIcon from "@/_Icons/MoonIcon";
import SunIcon from "@/_Icons/SunIcon";
import SearchIcon from "@/_Icons/SearchIcon";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [genreOpen, setGenreOpen] = useState(false);

  const genres = ["Action", "Comedy", "Drama", "Romance", "Horror", "Sci-Fi"];

  return (
    <header className="flex items-center justify-between w-full h-[64px] px-20  border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex items-center gap-2">
        <FilmIcon />
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setGenreOpen(!genreOpen)}
            className="flex items-center gap-2 px-3 h-[36px] border rounded-md border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <DownIcon />
            <span className="text-sm font-medium">Genre</span>
          </button>
          {genreOpen && (
            <div className="absolute top-10 left-0 w-[160px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-md z-20">
              {genres.map((g) => (
                <div
                  key={g}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {g}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            className="pl-10 pr-3 h-[36px] w-[320px] border rounded-md border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-[36px] h-[36px] border overflow-visible rounded-md border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

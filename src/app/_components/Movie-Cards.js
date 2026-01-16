"use client";

import { useRouter } from "next/navigation";
import OneStarIcon from "@/_Icons/OneStarIcon";

export function MovieCards({ rating, title, imageUrl, id }) {
  const router = useRouter();
  const image = `https://image.tmdb.org/t/p/w500${imageUrl}`;

  const handleMovieClick = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <div
      className="w-[229.73px] h-[439px] rounded-md bg-secondary cursor-pointer transition-all hover:scale-[1.03] hover:shadow-lg"
      onClick={handleMovieClick}
    >
      <div
        className="w-[229.73px] h-[340px] bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="w-[213.73px] h-[23px] flex pt-2 px-2">
        <div className="flex items-center justify-start gap-1">
          <OneStarIcon />
          <p className="font-inter font-medium text-[14px] leading-[20px]">
            {rating}
          </p>
          <p className="font-inter font-normal text-[12px] leading-[16px] text-gray-400">
            /10
          </p>
        </div>
      </div>

      <div className="w-[213.73px] h-[56px] font-inter font-normal text-[18px] leading-[28px] px-2 truncate">
        {title}
      </div>
    </div>
  );
}

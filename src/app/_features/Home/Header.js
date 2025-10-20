import DownIcon from "@/_Icons/DownIcon";
import FilmIcon from "@/_Icons/FilmIcon";
import MoonIcon from "@/_Icons/MoonIcon";
import Searchicon from "@/_Icons/SearchIcon";
export default function Header() {
  return (
    <div className="flex w-[1440px] h-[59px] items-center justify-around">
      <FilmIcon />
      <div className="flex gap-[12px]">
        <button className="flex h-[36px] w-[97px] border rounded-md items-center justify-center gap-[8px] border-gray-200">
          <DownIcon />
          Genre
        </button>
        <div className="flex h-[36px] w-[379px] border rounded-md items-center border-gray-200 ">
          <div className="flex text-gray-400 items-center justify-center margin-left ml-[12px] gap-[8px]">
            <Searchicon />
            Search..
          </div>
          <input />
        </div>
      </div>
      <button className="flex w-[36px] h-[36px] border rounded-md items-center justify-center gap-[8px] border-gray-200">
        <MoonIcon />
      </button>
    </div>
  );
}

import ArrowIcon from "@/_Icons/ArrowIcon";
import MovieCards from "../../_components/Movie-Cards";

export default function UpcomingMovie() {
  return (
    <div>
      <div className="w-[1277px] h-[36px] flex justify-between">
        <div>Upcoming</div>
        <div className="flex w-[120px] h-[36px] items-center justify-center">
          <button>See more</button>
          <div>
            <ArrowIcon />
          </div>
        </div>
      </div>
      <div>
        <MovieCards />
      </div>
    </div>
  );
}

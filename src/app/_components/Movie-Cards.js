import OneStarIcon from "@/_Icons/OneStarIcon";

export function MovieCards({ rating, title, imageUrl }) {
  const image = "https://image.tmdb.org/t/p/${imageUrl}";
  return (
    <div className="w-[229.73px] h-[439px] rounded-sm  bg-secondary cursor-pointer">
      <div
        className="w-[229.73px] h-[340px] bg-cover bg-center rounded-sm"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="w-[213.73px] h-[23px] flex pt-2 px-2">
        <div className="flex  items-center justify-start gap-1 ">
          <OneStarIcon />
          <p className="font-inter font-medium text-[14px] leading-[20px] tracking-[0]">
            {rating}
          </p>
          <p className=" font-inter font-normal text-[12px] leading-[16px] tracking-[0]">
            /10{" "}
          </p>
        </div>
      </div>
      <div className="w-[213.73px] h-[56px] font-inter font-normal text-[18px] leading-[28px] tracking-[0] px-2">
        {title}
      </div>
    </div>
  );
}

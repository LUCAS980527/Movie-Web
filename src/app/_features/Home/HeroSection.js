import PlayIcon from "@/_Icons/PlayIcon";
import StarIcon from "@/_Icons/StarIcon";

export default function HeroSection() {
  return (
    <div className=" bg-[url('/Feature.png')] h-[600px] w-[1440px] bg-cover bg-center bg-no-repeat align-center  mt-6">
      <div className=" flex w-[404px] h-[264px] ml-35 pt-45 gap-[16px] flex-col">
        <div className="w-[404px] h-[112px]">
          <div className="text-white font-inter font-normal text-[16px] leading-[24px] tracking-[0em]">
            Now Playing:
          </div>
          <h1 className="text-white font-inter font-extrabold text-[36px] leading-[40px] tracking-[-0.025em]">
            Wicked
          </h1>
          <StarIcon />
        </div>
        <div className="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] text-white">
          Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.{" "}
        </div>
        <div className="flex w-[145px] h-[40px] bg-white rounded-sm items-center justify-center">
          <div>
            <PlayIcon />
          </div>
          <button>Watch Trailer</button>
        </div>
      </div>
    </div>
  );
}

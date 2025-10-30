// import PlayIcon from "@/_Icons/Play Icon";
// import StarIcon from "@/_Icons/StarIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HeroSection() {
  const images = [];
  return (
    <div className="bg-cover bg-center h-[600px] w-[1440px]">
      <Carousel className="w-full max-full">
        <CarouselContent className="h-[600px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center h-[600px] w-[1440px]">
                    <div className="bg-cover bg-center w-[1440px] h-[600px]"></div>
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

//     <div className=" bg-[url('/Feature.png')] h-[600px] w-[1440px] bg-cover bg-center bg-no-repeat align-center  mt-6">
//       <div className=" flex w-[404px] h-[264px] ml-35 pt-45 gap-[16px] flex-col">
//         <div className="w-[404px] h-[112px]">
//           <div className="text-white font-inter font-normal text-[16px] leading-[24px] tracking-[0em]">
//             Now Playing:
//           </div>
//           <h1 className="text-white font-inter font-extrabold text-[36px] leading-[40px] tracking-[-0.025em]">
//             Wicked
//           </h1>
//           <StarIcon />
//         </div>
//         <div className="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] text-white">
//           Elphaba, a misunderstood young woman because of her green skin, and
//           Glinda, a popular girl, become friends at Shiz University in the Land
//           of Oz. After an encounter with the Wonderful Wizard of Oz, their
//           friendship reaches a crossroads.{" "}
//         </div>
//         <div className="flex w-[145px] h-[40px] bg-white rounded-sm items-center justify-center py-2 px-4 gap-2">
//           <PlayIcon />

//           <button className="font-inter font-medium text-[14px] leading-[20px] tracking-[0]">
//             Watch Trailer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

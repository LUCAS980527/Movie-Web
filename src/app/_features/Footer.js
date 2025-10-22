import CallIcon from "@/_Icons/CallIcon";
import MailIcon from "@/_Icons/MailIcon";
import ZIcon from "@/_Icons/ZIcon";

export default function Footer() {
  return (
    <div className="w-[1440px] h-[280px] bg-indigo-700 flex items-center justify-center mt-[51px]">
      <div className="w-[1280px] h-[200px] flex">
        <div>
          <ZIcon />
          <p className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] w-[247px] h-[20px] text-white">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="w-[913px] h-[200px] flex justify-end  ml-[120px]">
          <div className="w-[174px] h-[200px] ">
            <p className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-white mb-[12px]">
              Contact Information
            </p>
            <div className="w-[174px] h-[40px] flex flex-col gap-6 ">
              <div className="flex items-center gap-3">
                <MailIcon />
                <div>
                  <p className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] text-white">
                    Email:
                  </p>
                  <p className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-white">
                    support@movieZ.com
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <CallIcon />
                  <div>
                    <p className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] text-white">
                      Phone:
                    </p>
                    <p className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-white">
                      +976 (11) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-[96px]">
            <p className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-white">
              Follow us{" "}
            </p>
            <div className="w-[274px] h-[20px] flex gap-2">
              <p className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] text-white">
                Facebook
              </p>
              <p className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] text-white">
                Instagram
              </p>
              <p className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] text-white">
                Twitter
              </p>
              <p className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] text-white">
                Youtube
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

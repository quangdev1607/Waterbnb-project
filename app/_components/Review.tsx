import { Check, Key, LocateIcon, Tag } from "lucide-react";
import { GiSatelliteCommunication } from "react-icons/gi";
import { MdCleanHands } from "react-icons/md";

export function Review() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span>Cleaniness</span>
            <span>4.9</span>
          </div>
          <MdCleanHands className="h-[24px] w-[24px]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span>Accuracy</span>
            <span>4.9</span>
          </div>
          <Check className="h-[24px] w-[24px]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span>Check-in</span>
            <span>4.7</span>
          </div>
          <Key className="h-[24px] w-[24px]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span>Communication</span>
            <span>4.9</span>
          </div>
          <GiSatelliteCommunication className="h-[24px] w-[24px]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span>Location</span>
            <span>5.0</span>
          </div>
          <LocateIcon className="h-[24px] w-[24px]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span>Value</span>
            <span>4.9</span>
          </div>
          <Tag className="h-[24px] w-[24px]" />
        </div>
      </div>
    </>
  );
}

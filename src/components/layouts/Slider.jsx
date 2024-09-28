"use client";

import { Carousel } from "flowbite-react";
import slider1 from "../../img/1.webp";
import slider2 from "../../img/2.webp";
import slider3 from "../../img/3.webp";

export default function Slider() {
  return (
    <div className="w-full h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel className="!rounded-none">
        <div className="flex h-full items-center justify-center">
          <img
            src={slider1}
            alt="Slider 1"
            className="w-full h-full object-cover !rounded-none"
          />
        </div>
        <div className="flex h-full items-center justify-center">
          <img
            src={slider2}
            alt="Slider 2"
            className="w-full h-full object-cover !rounded-none"
          />
        </div>
        <div className="flex h-full items-center justify-center">
          <img
            src={slider3}
            alt="Slider 3"
            className="w-full h-full object-cover !rounded-none"
          />
        </div>
      </Carousel>
    </div>
  );
}

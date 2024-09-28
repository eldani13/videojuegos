"use client";

import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function Footeer() {
  return (
    <Footer bgDark>
      <div className="main w-full bg-[#f7002f]">
        <div className="container grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4"></div>
        <div className="w-full bg-[#f5d8dd] px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by=" DigitalGames™" year={2024} className="text-black" />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-[#f7002f] hover:text-black" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-[#f7002f] hover:text-black" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-[#f7002f] hover:text-black" />
            <Footer.Icon href="#" icon={BsGithub} className="text-[#f7002f] hover:text-black" />
          </div>
        </div>
      </div>
    </Footer>
  );
}

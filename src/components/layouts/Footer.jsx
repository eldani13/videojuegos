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
      <div className="main w-full">
        <div className="container grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4"></div>
        <div className="w-full bg-gray-700 text-white px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by=" DigitalGames™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

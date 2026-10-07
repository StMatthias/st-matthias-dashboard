import React from "react";
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between px-6 py-16 lg:px-24 lg:py-32 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-900 text-white">
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src="/Image1.jpg"
          alt="St Matthias Sabaki"
          width={500}
          height={500}
          className="w-full max-w-md lg:max-w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col items-start lg:w-1/2 space-y-6 mt-8 lg:mt-0 lg:ml-12">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight">
          St Matthias
          <br />
          Sabaki
        </h1>
        <p className="text-lg lg:text-xl text-gray-300">
          Welcome to the church Database and Dashboard, click the link below to access the dashboard.
        </p>
        <div className="flex justify-center mt-10 w-full lg:w-auto lg:justify-start">
          <Link href="/dashboard/index">
            <Button className="bg-gray-200">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
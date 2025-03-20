"use client"

import React from "react";
import { useRouter } from "next/navigation";

import Button from "../Button";

const EventCard = ({ title, description, image, links }: any) => {
  const router = useRouter();

  return (
    <div
      className="w-[90vw] max-w-md flex flex-col justify-start items-start mb-6 transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => router.push(links[0].url)}
    >
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="w-full px-3.5 py-3 bg-stone-800 rounded-tl-lg flex flex-col justify-start items-start gap-1">
        <div className="w-full text-white text-base font-bold font-['Archivo'] leading-normal tracking-tight">
          {title}
        </div>
        <div className="w-full text-white text-sm font-normal leading-tight tracking-tight font-['Chakra_Petch']">
          {description}
        </div>
        <div className="pt-2 inline-flex justify-start items-start gap-2">
          {links.map((link: any, index: number) => (
            <Button
              key={index}
              onClick={() => {
                if (link.url) {
                  router.push(link.url);
                }
              }}
              appearance="filled"
              className={`px-3.5 py-1.5 ${index === 0 ? "bg-stone-300 text-neutral-900 hover:bg-stone-500" : "outline outline-1 outline-offset-[-1px] outline-stone-300 text-white hover:bg-stone-300 hover:text-neutral-900"} text-sm font-bold flex justify-center items-center gap-2.5 overflow-hidden transition-colors duration-200`}
            >
              {link.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
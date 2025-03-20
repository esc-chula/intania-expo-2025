"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Button from "../Button";

const EventCard = ({ title, description, image, links }: any) => {
  const router = useRouter();

  return (
    <div
      className="mb-6 flex w-[90vw] max-w-md cursor-pointer flex-col items-start justify-start transition-transform duration-300 hover:scale-105"
      onClick={() => router.push(links[0].url)}
    >
      <img className="h-48 w-full object-cover" src={image} alt={title} />
      <div className="flex w-full flex-col items-start justify-start gap-1 rounded-tl-lg bg-stone-800 px-3.5 py-3">
        <div className="w-full font-['Archivo'] text-base leading-normal font-bold tracking-tight text-white">
          {title}
        </div>
        <div className="w-full font-['Chakra_Petch'] text-sm leading-tight font-normal tracking-tight text-white">
          {description}
        </div>
        <div className="inline-flex items-start justify-start gap-2 pt-2">
          {links.map((link: any, index: number) => (
            <Button
              key={index}
              onClick={() => {
                if (link.url) {
                  router.push(link.url);
                }
              }}
              appearance="filled"
              className={`px-3.5 py-1.5 ${index === 0 ? "bg-stone-300 text-neutral-900 hover:bg-stone-500" : "text-white outline outline-1 outline-offset-[-1px] outline-stone-300 hover:bg-stone-300 hover:text-neutral-900"} flex items-center justify-center gap-2.5 overflow-hidden text-sm font-bold transition-colors duration-200`}
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

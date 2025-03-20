import React from "react";

const EventCard = ({ title, description, image, links }: any) => {
    return (
        <div className="w-[90vw] max-w-md flex flex-col justify-start items-start mb-6">
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
                        <a
                            key={index}
                            href={link.url}
                            className={`px-3.5 py-1.5 ${index === 0 ? "bg-stone-300 text-neutral-900" : "outline outline-1 outline-offset-[-1px] outline-stone-300 text-white"} text-sm font-bold flex justify-center items-center gap-2.5 overflow-hidden`}
                        >
                            <div className="text-center justify-start leading-tight tracking-tight">
                                {link.name}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
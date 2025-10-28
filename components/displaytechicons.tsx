import React from "react";
import { getTechLogos, cn } from "@/lib/utils";
import Image from "next/image";

export default async function DisplayTechIcons({
  techstack,
}: {
  techstack: string[];
}) {
  const techIcons = await getTechLogos(techstack || []);

  return (
    <div className="flex items-center">
      {techIcons.slice(0, 3).map(({ tech, url }: { tech: string; url: string }, index: number) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image src={url} alt={tech} width={24} height={24} className="size-5" />
        </div>
      ))}
    </div>
  );
}


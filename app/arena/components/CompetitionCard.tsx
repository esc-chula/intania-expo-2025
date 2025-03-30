import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import Competition from "@/lib/models/Competition";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";

/**
 * Displays information about a competition.
 * 
 * @param competition The competition to display.
 * @param imagePriority Whether the image is above the fold and should be prioritized.
 */
const CompetitionCard: StyleableFC<{
  competition: Competition;
  imagePriority?: boolean;
}> = ({ competition, imagePriority, className, style }) => (
  <Card className={className} style={style}>
    <Image
      src={competition.image}
      alt={competition.title}
      width={740}
      height={370}
      priority={imagePriority}
    />
    <div className="space-y-1 px-3.5 py-3">
      <h2 className="text-title-md leading-title-md font-bold">
        {competition.title}
      </h2>
      <p>{competition.description}</p>
      <div className="flex gap-2 pt-2">
        {competition.links.map((link, index) => (
          <Button
            key={index}
            appearance={link.appearance}
            size="small"
            href={link.url}
          >
            {link.name}
          </Button>
        ))}
      </div>
    </div>
  </Card>
);

export default CompetitionCard;

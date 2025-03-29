import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import cn from "@/lib/helpers/cn";
import Major from "@/lib/models/Major";

const MajorHeader: React.FC<{
  major: Major;
}> = ({ major }) => (
  <>
    <TopAppBar appearance="minimal">
      <Button appearance="text" href="/majors">
        <Icon name="arrow_back" />
      </Button>
      <h1>{major.displayName}</h1>
    </TopAppBar>
    <div className="mb-16 flex flex-col items-center gap-10 text-center animate-[fade-up_.5s_var(--ease-emphasized-decelerate)]">
      <figure
        aria-hidden
        className={cn(`bg-cream text-dark-gray grid h-25 w-25
          place-content-center`)}
      >
        {major.icon}
      </figure>
      <h1
        aria-hidden
        className={cn(`text-headline-sm leading-headline-sm font-bold
          text-balance`)}
      >
        {major.fullName}
      </h1>
    </div>
  </>
);

export default MajorHeader;

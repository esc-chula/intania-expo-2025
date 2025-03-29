import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import MajorCard from "@/app/majors/components/MajorCard";
import Major from "@/lib/models/Major";
import { group } from "radash";

export default function Page() {
  const majors = group(Major.ALL, (major) => major.language);

  return (
    <>
      <TopAppBar>
        <Button appearance="text" href="/">
          <Icon name="arrow_back" />
        </Button>
        <h1>Find your major</h1>
      </TopAppBar>
      <h2 className="!mt-1 !text-white">ภาคไทย</h2>
      <ul className="grid !list-none grid-cols-4 gap-4 !pl-0">
        {majors.th?.map((major) => (
          <li key={major.slug}>
            <MajorCard major={major} />
          </li>
        ))}
      </ul>
      <h2 className="!mt-9 !text-white">
        International School of Engineering (ISE)
      </h2>
      <ul className="grid !list-none grid-cols-4 gap-4 !pl-0">
        {majors.en?.map((major) => (
          <li key={major.slug}>
            <MajorCard major={major} />
          </li>
        ))}
      </ul>
    </>
  );
}

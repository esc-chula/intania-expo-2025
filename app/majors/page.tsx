import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import MajorCard from "@/app/majors/components/MajorCard";
import Major from "@/lib/models/Major";
import { group } from "radash";

export default function Page() {
  const majors = group(Major.ALL, (major) => major.category);

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
        {majors.thai?.map((major) => (
          <li key={major.code}>
            <MajorCard major={major} />
          </li>
        ))}
      </ul>
      <h2 className="!mt-9 !text-white">
        International School of Engineering (ISE)
      </h2>
      <ul className="grid !list-none grid-cols-4 gap-4 !pl-0">
        {majors.ise?.map((major) => (
          <li key={major.code}>
            <MajorCard major={major} />
          </li>
        ))}
      </ul>
      <h2 className="!mt-9 !text-white">
        Chemical and Process Engineering (ChPE)
      </h2>
      <ul className="grid !list-none grid-cols-4 gap-4 !pl-0">
        {majors.chpe?.map((major) => (
          <li key={major.code}>
            <MajorCard major={major} />
          </li>
        ))}
      </ul>
    </>
  );
}

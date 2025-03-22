import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import Logo from "@/app/components/Logo";
import TopAppBar from "@/app/components/TopAppBar";
import cn from "@/lib/helpers/cn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "นโยบายคุ้มครองข้อมูลส่วนบุคคล",
};

function TermsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="space-y-8 px-4 pt-1 pb-20">
      <TopAppBar appearance="minimal">
        <Button appearance="text" href="/">
          <Icon name="arrow_back" />
        </Button>
        <h1>นโยบายการคุ้มครองข้อมูลฯ</h1>
      </TopAppBar>
      <div className="flex flex-col items-center text-center">
        <Logo size={100} />
        <h1
          aria-hidden
          className={cn(`text-headline-sm leading-headline-sm font-bold
            text-balance`)}
        >
          นโยบายการคุ้มครองข้อมูลส่วนบุคคล
        </h1>
      </div>
      <article
        className={cn(`text-body-lg leading-body-lg space-y-2 [&_h2]:mt-4
          [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-6`)}
      >
        {children}
      </article>
      <div
        className={cn(`sticky bottom-0 -mt-12 -mb-20 flex h-50 items-center
          justify-center gap-4 bg-gradient-to-t from-black via-black via-40%
          *:w-27`)}
      >
        <Button appearance="outlined" href="/">
          ย้อนกลับ
        </Button>
        <Button appearance="tonal" href="/register">
          รับทราบ
        </Button>
      </div>
    </div>
  );
}

export default TermsLayout;

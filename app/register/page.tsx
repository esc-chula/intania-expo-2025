import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import Logo from "@/app/components/Logo";
import TopAppBar from "@/app/components/TopAppBar";
import RegisterForm from "@/app/register/components/RegisterForm";
import cn from "@/lib/helpers/cn";
import User from "@/lib/models/User";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "ลงทะเบียนเข้าร่วมงาน",
};

export default async function Register() {
  const { data } = await User.fromCookies(await cookies());

  return (
    <div className="space-y-8 pt-1 pb-20">
      <TopAppBar appearance="minimal">
        <Button appearance="text" href="/terms">
          <Icon name="arrow_back" />
        </Button>
        <h1>ลงทะเบียนเข้าร่วมงาน</h1>
      </TopAppBar>
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Logo size={100} />
        <h1
          aria-hidden
          className={cn(`text-headline-sm leading-headline-sm font-bold
            text-balance`)}
        >
          ลงทะเบียนเข้าร่วมงาน
        </h1>
      </div>
      <RegisterForm email={data?.email} />
    </div>
  );
}

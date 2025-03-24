import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import Hero from "@/app/home/components/Hero";
import Navigation from "@/app/home/components/Navigation";
import SignOutButton from "@/app/home/components/SignOutButton";

export default function Home() {
  return (
    <div className="pb-20">
      <TopAppBar appearance="minimal">
        <h1 className="pl-12 text-center">Intania Expo</h1>
        <Button appearance="text" href="/ticket">
          <Icon name="confirmation_number" />
        </Button>
      </TopAppBar>
      <Hero>
        <h2 className="text-headline-sm leading-headline-sm font-bold">
          กิจกรรมในงาน
        </h2>
      </Hero>
      <Navigation />
      <div className="mt-20 grid place-content-center">
        <SignOutButton />
      </div>
    </div>
  );
}

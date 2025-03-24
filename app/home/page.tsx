import Hero from "@/app/home/components/Hero";
import Navigation from "@/app/home/components/Navigation";
import SignOutButton from "@/app/home/components/SignOutButton";

export default function Home() {
  return (
    <div className="pb-20">
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

import Button from "@/app/components/Button";
import Hero from "@/app/home/components/Hero";
import Navigation from "@/app/home/components/Navigation";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="pb-20">
      <Hero className="pb-20">
        <Button
          appearance="tonal"
          onClick={async () => {
            "use server";
            redirect("/api/auth/signin?redirect=/terms");
          }}
        >
          สมัครเลย
        </Button>
      </Hero>
      <Navigation />
    </div>
  );
}

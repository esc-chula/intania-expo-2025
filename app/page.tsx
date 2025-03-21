import Logo from "@/app/components/Logo";
import cn from "@/lib/helpers/cn";

export default function Home() {
  return (
    <div
      className={cn(`flex flex-col items-center justify-center px-4 pt-7 pb-10
        text-center`)}
    >
      <Logo size={280} />
    </div>
  );
}

import Logo from "@/app/components/Logo";
import NavigationCard from "@/app/home/components/NavigationCard";
import SignOutButton from "@/app/home/components/SignOutButton";
import cn from "@/lib/helpers/cn";

export default function Staff() {
  return (
    <div className="pb-20">
      <section
        className={cn(`flex flex-col items-center justify-center pt-7 pb-10
          text-center`)}
      >
        <style>{`
          .iex-background {
            opacity: 1;
            position: static;
          }
          .iex-background > * {
            position: fixed;
          }
        `}</style>
        <Logo size={280} className="relative -z-20" />
        <section
          className={cn(`text-cream leading-headline-sm text-headline-sm -mt-3
            italic [&_*]:block`)}
        >
          <p className="font-bold">ระบบหลังบ้าน</p>
          <p>ส่วนกลาง Expo</p>
        </section>
        <h2 className="text-headline-sm leading-headline-sm mt-24 font-bold">
          แผงควบคุม
        </h2>
      </section>
      <nav>
        <NavigationCard
          title="Check Ticket"
          body="ใช้กล้องโทรศัพท์สแกนบาร์โค้ดบนตั๋วของผู้ร่วมงาน"
          href="/scan"
        />
      </nav>

      <div className="mt-20 grid place-content-center">
        <SignOutButton />
      </div>
    </div>
  );
}

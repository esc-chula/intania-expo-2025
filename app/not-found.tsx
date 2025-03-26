import Button from "@/app/components/Button";
import cn from "@/lib/helpers/cn";

export default function NotFound() {
  return (
    <div
      className={cn(`font-width-125 flex h-dvh min-h-108 flex-col items-center
        justify-center gap-2 py-32 text-center italic`)}
    >
      <h1 className="text-display-lg leading-display-lg font-black">404</h1>
      <p
        className={cn(`text-title-lg leading-title-lg font-width-75 font-bold
          uppercase`)}
      >
        Page not found
      </p>
      <div className="flex grow items-end">
        <Button appearance="outlined" href="/" className="not-italic">
          กลับหน้าหลัก
        </Button>
      </div>
    </div>
  );
}

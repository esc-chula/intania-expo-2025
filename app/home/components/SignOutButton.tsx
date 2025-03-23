"use client";

import Button from "@/app/components/Button";
import User from "@/lib/models/User";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";

const SignOutButton: StyleableFC = ({ className, style }) => {
  const router = useRouter();

  return (
    <Button
      appearance="tonal"
      onClick={async () => {
        await User.signOut();
        router.push("/");
      }}
      className={className}
      style={style}
    >
      ออกจากระบบ
    </Button>
  );
};

export default SignOutButton;

"use client";

import Button from "@/app/components/Button";
import User from "@/lib/models/User";
import { StyleableFC } from "@/lib/types/misc";
import { redirect } from "next/navigation";

const SignOutButton: StyleableFC = ({ className, style }) => (
  <Button
    appearance="tonal"
    onClick={async () => {
      await User.signOut();
      redirect("/");
    }}
    className={className}
    style={style}
  >
    ออกจากระบบ
  </Button>
);

export default SignOutButton;

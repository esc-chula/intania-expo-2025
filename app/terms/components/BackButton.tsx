"use client";

import Button from "@/app/components/Button";
import User from "@/lib/models/User";
import { useRouter } from "next/navigation";
import { ComponentProps, FC } from "react";

const BackButton: FC<ComponentProps<typeof Button>> = (props) => {
  const router = useRouter();

  return (
    <Button
      {...props}
      onClick={async () => {
        await User.signOut();
        router.push("/");
      }}
    />
  );
};

export default BackButton;

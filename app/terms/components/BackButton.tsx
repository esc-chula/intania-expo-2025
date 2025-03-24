"use client";

import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import User from "@/lib/models/User";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";

const BackButton: StyleableFC = ({ className, style }) => {
  const router = useRouter();

  return (
    <Button
      appearance="text"
      onClick={async () => {
        await User.signOut();
        router.push("/");
      }}
      className={className}
      style={style}
    >
      <Icon name="arrow_back" />
    </Button>
  );
};

export default BackButton;

"use client";

import Button from "@/app/components/Button";
import Database from "@/lib/models/Database";
import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";

const RegisterButton: StyleableFC = ({ className, style }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      appearance="tonal"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const { ok } = await Database.fetch("GET", "auth/signin", {
          redirect: "/terms",
        });
        if (!ok) setLoading(false);
      }}
      className={className}
      style={style}
    >
      สมัครเลย
    </Button>
  );
};

export default RegisterButton;

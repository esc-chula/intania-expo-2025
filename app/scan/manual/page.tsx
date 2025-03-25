"use client";

import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import ScanSheet from "@/app/scan/components/ScanSheet";
import CodeField from "@/app/scan/manual/components/CodeField";
import Visitor from "@/lib/models/Visitor";
import VisitorFactory from "@/lib/models/VisitorFactory";
import { useRef, useState } from "react";

const DEFAULT_VISITOR = { visitor: null, status: null };

export default function Manual() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const [{ visitor, status }, setVisitor] = useState<{
    visitor: Visitor | null;
    status: number | null;
  }>(DEFAULT_VISITOR);

  /**
   * Fetch the visitor from the given code and sets the visitor state.
   * @param code The latest code input (state is behind by one character).
   */
  async function handleSubmit(code: string) {
    if (!Visitor.isValidCode(code)) return;
    setLoading(true);
    const { data: visitor, status } = await VisitorFactory.fetchFromCode(code);
    setVisitor({ visitor, status });
    setLoading(false);
  }

  /** Check in the visitor and update the visitor state. */
  async function handleCheckin() {
    if (!visitor) return;
    setVisitor(DEFAULT_VISITOR);
    const { status, ok } = await visitor.checkIn();
    if (!ok) setTimeout(() => setVisitor({ visitor: null, status }), 200);
    ref.current?.focus();
  }

  return (
    <div className="pt-28">
      <TopAppBar appearance="scrim">
        <Button appearance="text" href="/staff">
          <Icon name="arrow_back" />
        </Button>
        <h1>Check ticket</h1>
        <Button appearance="text" href="/scan">
          <Icon name="barcode_scanner" />
        </Button>
      </TopAppBar>
      <h2 className="text-headline-sm leading-headline-sm text-center font-bold">
        กรอกรหัสผู้เข้าร่วมงาน
      </h2>
      <form className="mt-10 flex flex-col items-center gap-13">
        <CodeField
          ref={ref}
          value={code}
          loading={loading}
          onChange={(code) => {
            setCode(code);
            // Automatically submit the code when it reaches 7 characters.
            if (code.length === 7) handleSubmit(code);
          }}
        />
        <Button
          appearance="outlined"
          onClick={() => {
            setCode("");
            setVisitor({ visitor: null, status: null });
            ref.current?.focus();
          }}
        >
          ลบ
        </Button>
      </form>

      <ScanSheet
        visitor={visitor}
        status={status}
        onCheckIn={handleCheckin}
        className="fixed -bottom-30 left-1/2 z-30 -translate-x-1/2"
      />
    </div>
  );
}

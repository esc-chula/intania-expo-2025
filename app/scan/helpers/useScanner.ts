"use client";

import Visitor from "@/lib/models/Visitor";
import VisitorFactory from "@/lib/models/VisitorFactory";
import { useState } from "react";

const DEFAULT_VISITOR = { visitor: null, status: null };

export default function useScanner() {
  const [sixDigitCode, setSixDigitCode] = useState<string | null>(null);
  const [{ visitor, status }, setVisitor] = useState<{
    visitor: Visitor | null;
    status: number | null;
  }>(DEFAULT_VISITOR);

  function reset() {
    setSixDigitCode(null);
    setTimeout(() => setVisitor(DEFAULT_VISITOR), 200);
  }

  async function handleCapture(barcode: string) {
    if (sixDigitCode) return;
    if (Visitor.isValidCode(barcode)) setSixDigitCode(barcode);
    const { data: visitor, status } =
      await VisitorFactory.fetchFromCode(barcode);
    setVisitor({ visitor, status });
    if (status !== 200) setTimeout(reset, 3000);
  }

  async function handleCheckin() {
    if (!visitor) return;
    const { status, ok } = await visitor.checkIn();
    if (!ok) setVisitor({ visitor, status });
    else reset();
  }

  return {
    paused: sixDigitCode !== null,
    sixDigitCode,
    visitor,
    status,
    handleCapture,
    handleCheckin,
  };
}

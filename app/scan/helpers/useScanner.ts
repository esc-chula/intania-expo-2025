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

  async function handleCapture(barcode: string) {
    if (sixDigitCode) return;
    if (Visitor.isValidCode(barcode)) setSixDigitCode(barcode);
    const { data: visitor, status } =
      await VisitorFactory.fetchFromCode(barcode);
    setVisitor({ visitor, status });
  }

  function handleCheckin() {
    setSixDigitCode(null);
    setTimeout(() => setVisitor(DEFAULT_VISITOR), 200);
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

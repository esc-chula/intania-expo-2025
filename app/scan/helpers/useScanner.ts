"use client";

import Visitor from "@/lib/models/Visitor";
import { useState } from "react";

const DEFAULT_VISITOR = { visitor: null, statusCode: 0 };

export default function useScanner() {
  const [sixDigitCode, setSixDigitCode] = useState<string | null>(null);
  const [{ visitor, statusCode }, setVisitor] = useState<{
    visitor: Visitor | null;
    statusCode: number;
  }>(DEFAULT_VISITOR);

  function handleCapture(barcode: string) {
    console.log("handleCapture")

    if (sixDigitCode) return;
    if (Visitor.isValidCode(barcode)) setSixDigitCode(barcode);

    // Simulate fetching the visitor.
    setTimeout(() => {
      setVisitor({
        visitor: new Visitor(
          barcode,
          "สทชาย",
          "รักวิศวะ",
          "M",
          "0000000000",
          "student",
          [],
        ),
        statusCode: 200,
      });
    }, 1000);
  }

  function handleCheckin() {
    setSixDigitCode(null);
    setTimeout(() => setVisitor(DEFAULT_VISITOR), 200);
  }

  return {
    paused: sixDigitCode !== null,
    sixDigitCode,
    visitor,
    statusCode,
    handleCapture,
    handleCheckin,
  };
}

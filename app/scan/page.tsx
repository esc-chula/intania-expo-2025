"use client";

import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import ScanFeed from "@/app/scan/components/ScanFeed";
import ScanSheet from "@/app/scan/components/ScanSheet";
import ScanTooltip from "@/app/scan/components/ScanTooltip";
import useScanner from "@/app/scan/helpers/useScanner";

export default function ScanPage() {
  const { sixDigitCode, visitor, handleCapture, handleCheckin } = useScanner();

  return (
    <>
      <TopAppBar appearance="scrim">
        <Button appearance="text">
          <Icon name="arrow_back" />
        </Button>
        <h1>Check ticket</h1>
        <Button appearance="text" href="/scan/manual">
          <Icon name="keyboard" />
        </Button>
      </TopAppBar>

      <ScanFeed onCapture={handleCapture} />

      <ScanSheet
        show={visitor !== null}
        onCheckIn={handleCheckin}
        className="fixed -bottom-30 z-30"
      />
      <ScanTooltip
        open={!visitor}
        sixDigitCode={sixDigitCode}
        className="fixed inset-x-0 bottom-11 left-1/2 z-20 -translate-1/2"
      />
    </>
  );
}

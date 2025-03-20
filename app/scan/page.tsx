"use client";

import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import ScanFeed from "@/app/scan/components/ScanFeed";
import ScanSheet from "@/app/scan/components/ScanSheet";
import ScanTooltip from "@/app/scan/components/ScanTooltip";
import { useState } from "react";

export default function ScanPage() {
  const [paused, setPaused] = useState(false);

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

      <ScanFeed
        onCapture={() => {
          if (paused) return;
          setPaused(true);
        }}
      />

      <ScanSheet
        show={paused}
        onCheckIn={() => setPaused(false)}
        className="fixed -bottom-30 z-30"
      />
      <ScanTooltip
        show={!paused}
        className="fixed bottom-11 left-1/2 z-20 -translate-x-1/2"
      />
    </>
  );
}

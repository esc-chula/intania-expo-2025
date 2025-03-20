"use client";

import Icon from "@/app/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { DecodeHintType, useZxing } from "react-zxing";

/**
 * A component for scanning a barcode.
 * 
 * @param onCapture Passes the decoded text when a barcode is captured.
 */
const ScanFeed: StyleableFC<{
  paused?: boolean;
  onCapture: (barcode: string) => void;
}> = ({ paused, onCapture, className, style }) => {
  const { ref } = useZxing({
    paused,
    hints: new Map([
      [DecodeHintType.POSSIBLE_FORMATS, ["CODE_128"]],
      [DecodeHintType.ALLOWED_LENGTHS, [7]],
    ]),
    onDecodeResult: (result) => onCapture(result.getText()),
  });

  return (
    <div
      className={cn(
        `bg-brown relative isolate grid h-dvh place-content-center
        overflow-hidden before:absolute before:inset-0 before:top-auto
        before:h-80 before:bg-gradient-to-t before:from-black
        before:content-['']`,
        className,
      )}
      style={style}
    >
      <Icon
        name="no_photography"
        size={48}
        className={cn(`text-dark-gray absolute top-1/2 left-1/2 -z-10
          -translate-1/2`)}
      />
      <video ref={ref} className="h-screen max-w-none" />
    </div>
  );
};

export default ScanFeed;

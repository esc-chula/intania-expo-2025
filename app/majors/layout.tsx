import cn from "@/lib/helpers/cn";

export default function MajorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        // General
        `text-body-lg leading-body-lg space-y-3 pt-16 pb-12`,
        // Headings
        `[&_h2]:text-title-lg [&_h2]:leading-title-lg [&_h2]:text-yellow
        [&_h2]:mt-10 [&_h2]:font-bold [&_h2]:text-balance [&>h1]:hidden`,
        // Bold
        `[&_strong]:text-yellow`,
        // Blockquote
        `[&_blockquote]:bg-brown [&_blockquote]:px-4 [&_blockquote]:py-3`,
        // List
        `[&_li]:mt-1 [&_ol]:list-decimal [&_ul]:list-disc [&_ul,ol]:pl-6`,
      )}
    >
      {children}
    </article>
  );
}

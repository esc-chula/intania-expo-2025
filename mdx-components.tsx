import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory.
// See https://nextjs.org/docs/app/building-your-application/configuring/mdx

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}

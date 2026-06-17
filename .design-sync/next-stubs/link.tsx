// Browser stub for next/link — renders a plain <a>, dropping Next-only props.
// Used only by the design-sync preview/bundle build, never by the real app.
import * as React from "react";

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string | { pathname?: string };
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  locale?: string | false;
}

const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>(function NextLink(
  { href, prefetch, replace, scroll, shallow, passHref, locale, children, ...rest },
  ref,
) {
  const resolved = typeof href === "string" ? href : href?.pathname ?? "#";
  return (
    <a ref={ref} href={resolved} {...rest}>
      {children}
    </a>
  );
});

export default NextLink;

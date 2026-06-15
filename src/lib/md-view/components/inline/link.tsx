import type { NodeProps } from "../../types/node-props";
import { sanitizeUrl } from "../../pipeline/url-transform";

/** Props for the link anchor component. */
interface LinkProps extends NodeProps {
  href?: string;
  title?: string;
}

/** Anchor element with URL sanitization and external link safety. */
export function Link({ href, title, children }: LinkProps) {
  const safe = sanitizeUrl(href);
  const external = !!safe && /^https?:/i.test(safe);
  return (
    <a
      href={safe}
      title={title}
      className="md-link"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

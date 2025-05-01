import { CSSProperties } from "react";

export default function ExternalLink({ href, children, style, title }: { href: string, children: React.ReactNode, title?: string, style?: CSSProperties }) {
  return (<a href={href} title={title} target='_blank' rel="noopener noreferrer" style={style}>{children}</a>);
}
import { Fragment, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode, type CSSProperties } from 'react';

type ButtonStyle = { variant?: 'primary' | 'gray' | 'green' | 'ghost'; small?: boolean };
function buttonClass({ variant = 'primary', small }: ButtonStyle) {
  return ['btn', variant === 'primary' ? '' : variant, small ? 'sm' : ''].filter(Boolean).join(' ');
}
export function Button({ variant, small, style, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyle) {
  return <button type="button" {...props} className={buttonClass({ variant, small })}
    style={{ ...style, ...(props.disabled ? { opacity: .4 } : {}) }} />;
}
export function LinkButton({ variant, small, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyle) {
  return <a {...props} className={buttonClass({ variant, small })} />;
}
export function Card({ href, children, style }: { href?: string; children: ReactNode; style?: CSSProperties }) {
  return href ? <a className="card click" href={href} style={style}>{children}</a>
    : <div className="card" style={style}>{children}</div>;
}
export function Icon({ children, background, style }: { children: ReactNode; background: string; style?: CSSProperties }) {
  return <div className="ico" style={{ background, ...style }}>{children}</div>;
}
export function Breadcrumbs({ parts }: { parts: { text: string; href?: string }[] }) {
  return <div className="crumbs">{parts.map((part, index) => <Fragment key={index}>
    {part.href ? <a href={part.href}>{part.text}</a> : <span>{part.text}</span>}
    {index < parts.length - 1 && <span className="sep">›</span>}
  </Fragment>)}</div>;
}
export function PageHeading({ title, description }: { title: string; description: string }) {
  return <><h1 className="page">{title}</h1><p className="sub">{description}</p></>;
}
// Only repository-authored lesson and tool HTML belongs here. Never pass user HTML.
export function LegacyHtml({ html, className, id }: { html: string; className?: string; id?: string }) {
  return <div id={id} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

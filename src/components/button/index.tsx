import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonStyle = {
  variant?: 'primary' | 'gray' | 'green' | 'ghost';
  small?: boolean;
};

function buttonClass({ variant = 'primary', small }: ButtonStyle) {
  return ['btn', variant === 'primary' ? '' : variant, small ? 'sm' : '']
    .filter(Boolean)
    .join(' ');
}

export function Button({
  variant,
  small,
  style,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyle) {
  return (
    <button
      type="button"
      {...props}
      className={buttonClass({ variant, small })}
      style={{ ...style, ...(props.disabled ? { opacity: 0.4 } : {}) }}
    />
  );
}

export function LinkButton({
  variant,
  small,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyle) {
  return <a {...props} className={buttonClass({ variant, small })} />;
}

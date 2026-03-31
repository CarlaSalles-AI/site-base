import * as React from 'react';
import { Link, type LinkProps } from 'react-router';

/**
 * SafeLink filters out Figma inspector props before passing to React Router's Link
 * This prevents "React does not recognize the prop on a DOM element" warnings
 */
export const SafeLink = React.forwardRef<HTMLAnchorElement, LinkProps & React.RefAttributes<HTMLAnchorElement>>(
  (props, ref) => {
    // Filter out Figma inspector props (_fg prefix in any case variation)
    const cleanProps = Object.keys(props).reduce((acc, key) => {
      if (!key.match(/^_fg/i)) {
        acc[key as keyof typeof props] = props[key as keyof typeof props];
      }
      return acc;
    }, {} as Partial<LinkProps>);

    return <Link ref={ref} {...cleanProps as LinkProps} />;
  }
);

SafeLink.displayName = 'SafeLink';

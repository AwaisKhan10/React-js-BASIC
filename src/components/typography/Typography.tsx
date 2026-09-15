/* eslint-disable react-refresh/only-export-components -- typography primitives are intentional multi-exports */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type TypoProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
};

function createTypo(defaultTag: ElementType, className: string, displayName: string) {
  function Component({ as, className: extra, children, ...rest }: TypoProps) {
    const Tag = (as ?? defaultTag) as ElementType;
    return (
      <Tag className={cn(className, extra)} {...rest}>
        {children}
      </Tag>
    );
  }
  Component.displayName = displayName;
  return Component;
}

export const Display = createTypo('h1', 'typo-display', 'Display');
export const PageTitle = createTypo('h1', 'typo-page-title', 'PageTitle');
export const SectionTitle = createTypo('h2', 'typo-section-title', 'SectionTitle');
export const Subtitle = createTypo('p', 'typo-subtitle', 'Subtitle');
export const BodyText = createTypo('p', 'typo-body', 'BodyText');
export const BodyLarge = createTypo('p', 'typo-body-large', 'BodyLarge');
export const BodySmall = createTypo('p', 'typo-body-small', 'BodySmall');
export const HintText = createTypo('span', 'typo-hint', 'HintText');
export const HelperText = createTypo('span', 'typo-helper', 'HelperText');
export const ErrorText = createTypo('span', 'typo-error', 'ErrorText');
export const Label = createTypo('label', 'typo-label', 'Label');
export const Caption = createTypo('span', 'typo-caption', 'Caption');
export const LinkText = createTypo('a', 'typo-link', 'LinkText');
export const ButtonText = createTypo('span', 'typo-button', 'ButtonText');

export const Heading1 = createTypo('h1', 'typo-h1', 'Heading1');
export const Heading2 = createTypo('h2', 'typo-h2', 'Heading2');
export const Heading3 = createTypo('h3', 'typo-h3', 'Heading3');
export const Heading4 = createTypo('h4', 'typo-h4', 'Heading4');
export const Heading5 = createTypo('h5', 'typo-h5', 'Heading5');
export const Heading6 = createTypo('h6', 'typo-h6', 'Heading6');

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: ElementType;
  children?: ReactNode;
}

const HEADING_CLASS: Record<HeadingLevel, string> = {
  1: 'typo-h1',
  2: 'typo-h2',
  3: 'typo-h3',
  4: 'typo-h4',
  5: 'typo-h5',
  6: 'typo-h6',
};

export function Heading({ level = 2, as, className, children, ...rest }: HeadingProps) {
  const Tag = (as ?? (`h${level}` as ElementType)) as ElementType;
  return (
    <Tag className={cn(HEADING_CLASS[level], className)} {...rest}>
      {children}
    </Tag>
  );
}

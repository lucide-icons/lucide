export type IconNode = [elementName: string, attrs: Record<string, string>][];

export interface LucideProps {
  size?: string | number;
  color?: string;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
  class?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-label'?: string;
  title?: string;
  role?: string;
}

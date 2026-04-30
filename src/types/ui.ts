import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

export type ButtonVariant =
  | 'primary'
  | 'ghost'
  | 'outline'
  | 'outline-white';

export interface StatCard {
  label: string;
  value: string | number;
  color: string;
}
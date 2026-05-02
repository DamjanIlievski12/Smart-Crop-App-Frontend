import type React from 'react';
import type { ButtonVariant } from '../../api/types/ui';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#2e5d40] text-white px-5 py-2.5 hover:bg-[#245033] active:scale-[0.98]',
  ghost: 'text-gray-700 px-4 py-2.5 hover:bg-gray-100 active:scale-[0.98]',
  outline: 'border border-gray-300 text-gray-700 bg-white px-5 py-2.5 hover:bg-gray-50 active:scale-[0.98]',
  'outline-white': 'border border-white/60 text-white bg-white/10 px-5 py-2.5 hover:bg-white/20 active:scale-[0.98]',
};

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props }: ButtonProps): React.ReactElement {
  const base =
    'inline-flex items-center gap-2 font-medium text-sm rounded-lg transition-all duration-200 cursor-pointer select-none';

  return (
    <button className={`${base} ${variantStyles[variant] ?? ''} ${className}`} {...props}>
      {children}
    </button>
  );
}

import React from 'react';

const ButtonVariant = {
  borrow: 'bg-blue-500 text-white',
  dark: 'bg-gray-800 text-white',
  gray: 'bg-gray-300 text-gray-800',
  red: 'bg-red-700 text-white'
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: keyof typeof ButtonVariant;
  width?: string;
  onAction?: () => void | Promise<void>;
  isLoading?: boolean;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, width, label, onAction, isLoading = false, className, onClick, disabled, ...props }, ref) => {
    const properties = ButtonVariant[variant];
    const divWidth = width ?? 'w-full';

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      await onAction?.();
    };

    return (
      <button
        className={`${properties} font-semibold font-nunito hover:opacity-80 ${divWidth} ${className ?? ''}`}
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {isLoading ? 'Carregando...' : label}
      </button>
    );
  }
);
CustomButton.displayName = 'CustomButton';

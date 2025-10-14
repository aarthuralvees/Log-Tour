import React from 'react';
import { Button } from '../components/Button/button';

const ButtonVariant = {
  borrow: 'bg-borrow text-white',
  dark: 'bg-borrowDark text-white',
  gray: 'bg-gray text-borrowDark'
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
      <Button
        className={`${properties} font-semibold font-nunito hover:opacity-80 ${divWidth} ${className ?? ''}`}
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {isLoading ? 'Carregando...' : label}
      </Button>
    );
  }
);
CustomButton.displayName = 'CustomButton';

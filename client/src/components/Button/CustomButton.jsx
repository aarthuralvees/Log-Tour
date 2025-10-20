import React from 'react';
import PropTypes from 'prop-types';

const ButtonVariant = {
  borrow: 'bg-blue-500 text-white hover:bg-blue-600',
  dark: 'bg-gray-800 text-white hover:bg-gray-900',
  gray: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
  white: 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'
};

export const CustomButton = React.forwardRef(function CustomButton(
  { variant, width, label, onAction, isLoading = false, className, onClick, disabled, ...props },
  ref
) {
  const properties = ButtonVariant[variant];
  const divWidth = width ?? 'w-full';

  const handleClick = async (e) => {
    onClick?.(e);
    if (e?.defaultPrevented) return;
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
});

CustomButton.displayName = 'CustomButton';

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['borrow', 'dark', 'gray', 'white']).isRequired,
  width: PropTypes.string,
  onAction: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default CustomButton;
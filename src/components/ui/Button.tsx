'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'base' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700',
  secondary: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 disabled:bg-gray-900 disabled:text-gray-500',
  ghost: 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white border border-transparent hover:border-gray-600 disabled:text-gray-600',
  danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-900',
};

const sizeStyles = {
  sm: 'text-xs py-2 px-3',
  base: 'text-sm py-3 px-4',
  lg: 'text-base py-4 px-6',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'base',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.01] active:scale-[0.99]';
  const disabledStyles = disabled || isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer';

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabledStyles}
        ${className}
      `}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Обработка...
        </>      
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-nc-wood text-white hover:bg-nc-brown-dark shadow-md active:translate-y-0.5",
    outline: "border-2 border-nc-wood text-nc-wood hover:bg-nc-wood/10",
    ghost: "hover:bg-nc-wood/10 text-nc-wood",
  };

  const sizes = {
    default: "h-10 px-6 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-12 rounded-full px-8 text-lg",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

Button.displayName = "Button";
export default Button;
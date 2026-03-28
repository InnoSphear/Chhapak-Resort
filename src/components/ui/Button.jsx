import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 ease-out rounded-full disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[rgb(145,118,90)] text-white hover:bg-[rgb(125,100,75)] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
    secondary: "border-2 border-[rgb(145,118,90)] text-[rgb(145,118,90)] hover:bg-[rgb(145,118,90)] hover:text-white active:scale-[0.98]",
    ghost: "text-charcoal hover:bg-sand/50 active:scale-[0.98]",
    outline: "border-2 border-charcoal/20 text-charcoal hover:border-[rgb(145,118,90)] hover:text-[rgb(145,118,90)] active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
}

export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  className = "",
  onClick,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-300";
  
  const variants = {
    ghost: "hover:bg-sand/50 text-charcoal",
    primary: "bg-[rgb(145,118,90)] text-white hover:bg-[rgb(125,100,75)]",
    outline: "border border-charcoal/20 hover:border-[rgb(145,118,90)] hover:text-[rgb(145,118,90)]",
  };

  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

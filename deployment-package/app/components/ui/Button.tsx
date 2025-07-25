import { classNames } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export function Button({ children, className, variant = "default", ...props }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-blue-500"
      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";

  return (
    <button className={classNames(baseClasses, variantClasses, className)} {...props}>
      {children}
    </button>
  );
}

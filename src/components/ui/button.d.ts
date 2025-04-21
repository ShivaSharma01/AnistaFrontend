import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button"; // Assuming buttonVariants is exported from button.jsx

// Define the interface for the Button props
// Extends standard HTML button props and adds variant, size, and asChild
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // children is implicitly included in React.ButtonHTMLAttributes<HTMLButtonElement>
}

// Declare the Button component with its props and forwardRef
declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

// Export the Button component and variants
export { Button, buttonVariants };

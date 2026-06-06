"use client";

import { cn } from "@/lib/utils";

interface FourPointStarProps {
  size?: number | string;
  color?: "purple" | "green" | "white" | "gray";
  glow?: boolean;
  animated?: boolean;
  className?: string;
}

export function FourPointStar({
  size = 24,
  color = "purple",
  glow = true,
  animated = true,
  className,
}: FourPointStarProps) {
  const colorMap = {
    purple: "text-brand-primary fill-brand-primary star-glow-purple",
    green: "text-brand-accent fill-brand-accent star-glow-green",
    white: "text-white fill-white",
    gray: "text-gray-400 fill-gray-400",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn(
        "inline-block",
        colorMap[color],
        !glow && "star-glow-none",
        animated && "animate-float",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 12 0 L 14.8 9.2 L 24 12 L 14.8 14.8 L 12 24 L 9.2 14.8 L 0 12 L 9.2 9.2 Z"
        stroke="none"
      />
    </svg>
  );
}

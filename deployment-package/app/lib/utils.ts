import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(
  ...classes: (string | boolean | undefined | null)[]
) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

export const fundingStages = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Bootstrapped",
  "Revenue Generating",
];

export const industries = [
  "Software/SaaS",
  "E-commerce",
  "Fintech",
  "Healthcare",
  "AI/ML",
  "Blockchain",
  "Education",
  "Enterprise",
  "Consumer",
  "Hardware",
  "Marketplace",
  "Other",
];

export const createPageUrl = (name: string) => `/${name.toLowerCase()}`;

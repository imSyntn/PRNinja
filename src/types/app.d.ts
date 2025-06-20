import { LucideIcon } from "lucide-react";

export interface CardDataType {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  background?: string;
}

export interface PricingPlanType {
  id: string;
  name: string;
  price: number | null;
  currency?: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

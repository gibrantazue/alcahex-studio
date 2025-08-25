// Simple types for landing page only
export interface NavItem {
  id: string;
  href: string;
  label: string;
  isActive?: boolean;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  gradient: string;
}

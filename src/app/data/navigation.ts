// src/data/navigation.ts

export interface NavigationLink {
  name: string;
  url: string;
  isExternal?: boolean;
}

export interface NavigationGroup {
  title: string;
  links: NavigationLink[];
}

// Main navigation links used in both navbar and footer
export const mainNavLinks: NavigationLink[] = [
  { name: "Home", url: "/" },
  { name: "Music", url: "/music" },
  { name: "Gaming", url: "/gaming" },
];

// Additional links for footer only
export const resourceLinks: NavigationLink[] = [
  { name: "About", url: "/about" },
  { name: "Privacy Policy", url: "/privacy" },
  { name: "Terms of Service", url: "/terms" },
];

// Category quick links for footer
export const categoryLinks: NavigationLink[] = [
  { name: "Gaming", url: "/categories/gaming" },
  { name: "Music", url: "/categories/music" },
];

// Organized footer link groups
export const footerLinkGroups: NavigationGroup[] = [
  {
    title: "Navigation",
    links: mainNavLinks,
  },
  {
    title: "Explore",
    links: categoryLinks,
  },
  {
    title: "Resources",
    links: resourceLinks,
  },
];

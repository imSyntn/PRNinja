"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", link: "/" },
  { name: "How It Works", link: "#how-it-works" },
  { name: "Features", link: "#feature-section" },
  { name: "Pricing", link: "#pricing-section" },
  { name: "Contact", link: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  if (pathName.includes("/dashboard")) {
    return null;
  }

  return (
    <Navbar className="top-5">
      <NavBody>
        <NavbarLogo />

        <NavItems items={navItems} />

        <div className="flex items-center space-x-2">
          <NavbarButton variant="secondary">
            <ThemeToggleButton />
          </NavbarButton>
          <NavbarButton href="/get-started" variant="primary" as={Link}>
            Get Started
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={() => setMenuOpen(false)}
              className="text-black dark:text-white"
            >
              {item.name}
            </a>
          ))}
          <div className="flex">
            <NavbarButton variant="secondary" className="py-0">
              <ThemeToggleButton />
            </NavbarButton>
            <NavbarButton href="/get-started" variant="primary" as={Link}>
              Get Started
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

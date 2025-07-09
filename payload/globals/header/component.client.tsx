"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import type { Header } from "@/payload-types";

import { Logo } from "@/components/fragments/logo";
import { CMSLink } from "@/components/fragments/cms-link";
import { SearchIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

interface HeaderClientProps {
  data: Header;
}

export function HeaderClient({ data }: HeaderClientProps) {
  const pathname = usePathname();

  const navItems = data?.navItems || [];

  return (
    <header className="container relative z-20">
      <div className="py-8 flex justify-between">
        <Link href="/">
          <Logo
            loading="eager"
            priority="high"
            className="invert dark:invert-0"
          />
        </Link>
        <nav className="flex gap-3 items-center">
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="link" />;
          })}
          <Link
            href="/contact"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Contact us
          </Link>
        </nav>
      </div>
    </header>
  );
}

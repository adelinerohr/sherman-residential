import { getCachedGlobal } from "~/utilities/get-globals";
import Link from "next/link";
import React from "react";

import type { Footer } from "@/payload-types";
import { CMSLink } from "@/components/fragments/cms-link";
import { Logo } from "@/components/fragments/logo";

export async function Footer() {
  const footerData: Footer = await getCachedGlobal("footer", 1)();

  return (
    <footer className="mt-auto">
      <div className="container py-8 gap-8 flex flex-col">
        <Link className="flex items-center" href="/">
          <Logo className="invert" />
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_2fr] gap-8">
          <div className="space-y-2">
            <div className="font-display font-medium text-2xl text-primary">
              Company
            </div>
            <nav className="flex flex-col gap-1">
              {footerData.company?.navItems?.map(({ link }, i) => {
                return <CMSLink className="font-semibold" key={i} {...link} />;
              })}
            </nav>
          </div>
          <div className="space-y-2">
            <div className="font-display font-medium text-2xl text-primary">
              Communities
            </div>
            <nav className="flex flex-col gap-1">
              {footerData.company?.navItems?.map(({ link }, i) => {
                return <CMSLink className="font-semibold" key={i} {...link} />;
              })}
            </nav>
          </div>
          <div className="space-y-2">
            <div className="font-display font-medium text-2xl text-primary">
              Contact Us
            </div>
            <nav className="flex flex-col gap-1">
              {footerData.company?.navItems?.map(({ link }, i) => {
                return <CMSLink className="font-semibold" key={i} {...link} />;
              })}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

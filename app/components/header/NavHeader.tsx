/** @format */

import { siteConfig } from "~/config/site";

export default function NavHeader() {
  // TODO: create variables for these side-wide configurations
  return (
    <div className="px-12 py-8 flex font-title justify-between mb-6 max-h-[10vh]">
      <div className="flex gap-2">
        <img src="/icon.png" className="size-8" />
        <div className="text-4xl font-bold">{siteConfig.name}</div>
      </div>
      <div className="text-xl">{siteConfig.description}</div>
    </div>
  );
}

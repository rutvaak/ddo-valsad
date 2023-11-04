import React from "react";
import {
  BellIcon,
  BookmarkIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {};

function TopBar({}: Props) {
  return (
    <div className="h-12 w-full bg-primary text-primary-foreground">
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          SchemEase
        </Link>
        <div className="flex gap-5">
          <MagnifyingGlassIcon className="h-5 w-5" strokeWidth={100} />
          <BellIcon className="h-5 w-5" />
          <Link href="/bookmarks">
            <BookmarkIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;

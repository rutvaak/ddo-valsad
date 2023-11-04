"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Scheme } from "~/server/db/schema";

type Props = {};

function RecentlyViewed({}: Props) {
  const [schemes, setSchemes] = useState<Array<Scheme>>();

  useEffect(() => {
    const recents = localStorage.getItem("recent");
    if (!recents) return;
    setSchemes((JSON.parse(recents) as Array<Scheme>).reverse());
  }, []);

  if (!schemes) {
    return (
      <div className="container mt-1.5">
        <div className="flex items-center justify-between text-lg font-bold">
          <p>Recently Viewed</p>
        </div>
        <div className="">No Recents found</div>
      </div>
    );
  }

  return (
    <div className="container mt-1.5">
      <div className="flex items-center justify-between text-lg font-bold">
        <p>Recently Viewed</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {schemes.slice(0, 3).map((scheme) => {
          return <RecentlyViewedTile schemeData={scheme} key={scheme.id} />;
        })}
      </div>
    </div>
  );
}

type TileProps = {
  schemeData: Scheme;
};

function RecentlyViewedTile({ schemeData }: TileProps) {
  return (
    <Link href={`/${schemeData.id}`}>
      <div className="text-center">
        <Image
          src={schemeData.schemeImage}
          alt={schemeData.name}
          className="w-full rounded-lg"
          width={100}
          height={100}
        />
        <p className="mt-1 text-sm">
          {schemeData.name?.split(" ").length > 2
            ? schemeData.name?.split(" ").splice(0, 2).join(" ") + "..."
            : schemeData.name}
        </p>
      </div>
    </Link>
  );
}

export default RecentlyViewed;

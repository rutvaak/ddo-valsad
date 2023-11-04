"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TopBar from "~/components/pages/shared/TopBar";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Scheme } from "~/server/db/schema";

type Props = {};

function page({}: Props) {
  const [schemes, setSchemes] = useState<Scheme[]>();
  useEffect(() => {
    const bookmarks = localStorage.getItem("bookmark");
    if (!bookmarks) return;
    setSchemes((JSON.parse(bookmarks) as Scheme[]).reverse());
  }, []);

  if (!schemes) {
    return (
      <div>
        <TopBar />
        Loading....
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <div className="container mt-3 grid grid-cols-2 gap-4">
        {schemes.map((scheme) => {
          return <BookMarkCard schemeData={scheme} key={scheme.id} />;
        })}
      </div>
    </div>
  );
}

type CardProps = {
  schemeData: Scheme;
};

function BookMarkCard({ schemeData }: CardProps) {
  return (
    <Link href={`/${schemeData.id}`}>
      <Card className="text-center">
        <Image
          src={schemeData.schemeImage}
          alt={schemeData.name}
          width={100}
          height={200}
          className="w-full rounded-2xl p-2"
        ></Image>
        <CardTitle>
          {schemeData.name?.split(" ").length > 2
            ? schemeData.name?.split(" ").splice(0, 2).join(" ") + "..."
            : schemeData.name}
        </CardTitle>
        <CardDescription>{schemeData.department}</CardDescription>
      </Card>
    </Link>
  );
}

export default page;

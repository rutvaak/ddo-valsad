"use client";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Scheme } from "~/server/db/schema";

type Props = { schemeData: Scheme };

function BookmardButton({ schemeData }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const previousData = JSON.parse(
      localStorage.getItem("bookmark") || "[]",
    ) as Array<Scheme>;

    if (
      previousData.findIndex(
        (prev) => JSON.stringify(prev) === JSON.stringify(schemeData),
      ) !== -1
    ) {
      setIsBookmarked(true);
    }
  }, []);

  const addToBookmark = () => {
    const previousData = JSON.parse(
      localStorage.getItem("bookmark") || "[]",
    ) as Array<Scheme>;

    if (
      previousData.findIndex(
        (prev) => JSON.stringify(prev) === JSON.stringify(schemeData),
      ) === -1
    ) {
      setIsBookmarked(true);
      previousData.push(schemeData);
      localStorage.setItem("bookmark", JSON.stringify(previousData));
    } else {
      setIsBookmarked(false);
      const newData = previousData.filter(
        (prev) => JSON.stringify(prev) !== JSON.stringify(schemeData),
      );
      localStorage.setItem("bookmark", JSON.stringify(newData));
    }
  };
  return (
    <Button
      className="w-full rounded-full text-base text-primary-foreground"
      variant="outline"
      onClick={addToBookmark}
    >
      {isBookmarked ? "Bookmarked" : "Bookmark"}
      {isBookmarked ? (
        <BookmarkFilledIcon className="ml-2 h-4 w-4" />
      ) : (
        <BookmarkIcon className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}

export default BookmardButton;

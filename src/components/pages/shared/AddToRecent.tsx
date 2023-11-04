"use client";

import React, { useEffect } from "react";
import { Scheme } from "~/server/db/schema";

type Props = {
  schemeData: Scheme;
};

function AddToRecent({ schemeData }: Props) {
  useEffect(() => {
    const previousData = JSON.parse(
      localStorage.getItem("recent") || "[]",
    ) as Array<Scheme>;

    if (
      previousData.findIndex(
        (prev) => JSON.stringify(prev) === JSON.stringify(schemeData),
      ) === -1
    ) {
      previousData.push(schemeData);
      localStorage.setItem("recent", JSON.stringify(previousData));
    } else {
      const newData = previousData.filter(
        (prev) => JSON.stringify(prev) !== JSON.stringify(schemeData),
      );
      newData.push(schemeData);
      localStorage.setItem("recent", JSON.stringify(newData));
    }
  }, []);

  return <></>;
}

export default AddToRecent;

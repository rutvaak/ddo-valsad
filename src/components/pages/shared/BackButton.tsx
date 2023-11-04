"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";
import { cn } from "~/lib/utils";

type Props = { className?: string };

function BackButton({ className }: Props) {
  const router = useRouter();

  const goBack = () => {
    return router.back();
  };
  return (
    <ArrowLeftIcon className={cn("h-4 w-4", className)} onClick={goBack} />
  );
}

export default BackButton;

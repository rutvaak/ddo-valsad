"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Scheme } from "~/server/db/schema";

type Props = {
  schemeData: Scheme;
};

function SchemeDetails({ schemeData }: Props) {
  const accordianArr = [
    "details",
    "benefits",
    "eligibility",
    "applicationProcess",
    "requiredDocs",
  ];

  const getAccordianItemText = (key: string) => {
    switch (key) {
      case "details":
        return "Details";

      case "benefits":
        return "Benefits";

      case "eligibility":
        return "Eligibility";

      case "applicationProcess":
        return "Application Process";

      case "requiredDocs":
        return "Documents Required";
      default:
        return null;
    }
  };
  return (
    <Accordion type="multiple" defaultValue={["details"]}>
      {accordianArr.map((key) => {
        return (
          <AccordionItem value={key} key={key}>
            <AccordionTrigger className="text-lg font-bold">
              {getAccordianItemText(key)}
            </AccordionTrigger>
            <AccordionContent>
              {key === "eligibility" ? (
                <>
                  <div className="mb-2">
                    <p className="font-bold">
                      Gender:{" "}
                      <span className="font-normal">{schemeData.gender}</span>
                    </p>
                    <p className="font-bold">
                      Category:{" "}
                      <span className="font-normal">{schemeData.category}</span>
                    </p>
                    <p className="font-bold">
                      Marital Status:{" "}
                      <span className="font-normal">
                        {schemeData.maritalStatus}
                      </span>
                    </p>
                  </div>
                </>
              ) : null}
              {/* @ts-ignore */}
              {schemeData[key]}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default SchemeDetails;

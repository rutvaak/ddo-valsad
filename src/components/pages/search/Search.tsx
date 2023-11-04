"use client";
import React, { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Scheme } from "~/server/db/schema";
import SchemeCard from "../Home/SchemeCard";

type Props = {
  schemeData: Scheme[];
};

const residance = ["Both", "Rural", "Urban"];
const isStudent = ["Yes", "No"];
const employmentStatus = [
  "All",
  "Employed",
  "Unemployed",
  "Self-Employed/ Entrepreneur",
];
const category = ["General", "OBC", "SC", "ST", "all"];

function Search({ schemeData }: Props) {
  const [schemes, setSchemes] = useState<Scheme[]>(schemeData);
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const both = formRef.current[1];
    const rural = formRef.current[3];
    const urban = formRef.current[5];
    const general = formRef.current[7];
    // !TODO: get all elements and filter with logic
    console.log(formRef);
  };
  return (
    <>
      <div className="container flex gap-2">
        <Input placeholder="Search"></Input>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter</DialogTitle>
              <DialogDescription>
                Filter schemes based on these criteria
              </DialogDescription>
            </DialogHeader>
            <form ref={formRef}>
              <div className="grid gap-4 py-4">
                <p className="text-lg font-bold">Residance</p>
                <div className="flex gap-4">
                  {residance.map((res, i) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox id={res} />
                        <label
                          htmlFor={res}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {res}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <p className="text-lg font-bold">Category</p>
                <div className="flex gap-4">
                  {category.map((cat, i) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox id={cat} />
                        <label
                          htmlFor={cat}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {cat}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <p className="text-lg font-bold">Employment Status</p>
                <div className="grid grid-cols-2 gap-4">
                  {employmentStatus.map((emp, i) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox id={emp} />
                        <label
                          htmlFor={emp}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {emp}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <p className="text-lg font-bold">Employment Status</p>
                <div className="grid grid-cols-2 gap-4">
                  {isStudent.map((isStu, i) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox id={isStu} />
                        <label
                          htmlFor={isStu}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {isStu}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {schemes.map((scheme) => {
          return (
            <div className="mb-2">
              <SchemeCard schemeData={scheme} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Search;

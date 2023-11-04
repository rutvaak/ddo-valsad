"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Scheme } from "~/server/db/schema";

type Props = {
  schemeData: Scheme[];
};

function MainCaraousal({ schemeData }: Props) {
  return (
    <div className="pt-4">
      <Carousel showThumbs={false} infiniteLoop>
        {schemeData.map((scheme) => {
          return (
            <div className="px-4">
              <Image
                src={scheme.schemeImage}
                className="rounded-[2rem]"
                alt="image"
                height={170}
                width={200}
              />
            </div>
          );
        })}
        {/*<div className="px-4">
          <Image
            src="https://source.unsplash.com/random/900x600?boy"
            className="rounded-[2rem]"
            alt="image"
            width={400}
            height={270}
          />
        </div>
        <div className="px-4">
          <Image
            src="https://source.unsplash.com/random/900x600?building"
            className="rounded-[2rem]"
            alt="image"
            width={400}
            height={270}
          />
        </div>
        <div className="px-4">
          <Image
            src="https://source.unsplash.com/random/900x600"
            className="rounded-[2rem]"
            alt="image"
            width={400}
            height={270}
          />
        </div> */}
      </Carousel>
    </div>
  );
}

export default MainCaraousal;

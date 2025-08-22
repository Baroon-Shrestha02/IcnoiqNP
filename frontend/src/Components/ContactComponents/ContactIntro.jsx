import React from "react";

export default function ContactIntro() {
  return (
    <>
      <div className="my-8">
        <div className="container mx-auto">
          <div className="flex items-start flex-col gap-4">
            <div className="text-3xl md:text-6xl font-extrabold">
              Let's Talk
            </div>
            <div className="text-lg md:text-3xl max-w-2xl font-extralight text-leading">
              We would love to learn more about you and your ideas and further
              design and build together.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

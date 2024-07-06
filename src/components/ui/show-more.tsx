"use client";

import React, { useState } from "react";

type Props = {
  text: string;
  maxLength?: number;
};

function ShowMore({ text, maxLength = 100 }: Props) {
  const [showMore, setShowMore] = useState(false);

  const display =
    text.length > maxLength
      ? !showMore
        ? text.substring(0, maxLength)
        : text
      : text;
  const showEllipse = text.length > maxLength;
  const Spn = ({ text }: { text: string }) => (
    <span
      className="text-muted-foreground text-xs cursor-pointer hover:text-secondary-foreground"
      onClick={() => setShowMore((prev) => !prev)}
    >
      {text}
    </span>
  );
  return (
    <>
      {display}{" "}
      {showEllipse &&
        (!showMore ? <Spn text="...more" /> : <Spn text="less" />)}
    </>
  );
}

export default ShowMore;

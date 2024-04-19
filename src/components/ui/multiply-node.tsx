import React from "react";

type Props = {
  node: React.ReactElement;
  times: number;
};
function MultiplyNode({ node, times }: Props) {
  return (
    <>
      {Array.from({ length: times }).map((_, i) =>
        React.cloneElement(node, { key: i })
      )}
    </>
  );
}

export default MultiplyNode;

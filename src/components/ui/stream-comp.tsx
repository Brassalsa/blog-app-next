import React, { Suspense } from "react";

type Props = {
  AsyncComp: React.FC;
  fallback?: React.ReactNode;
};

function StreamComp({ AsyncComp, fallback }: Props) {
  return (
    <Suspense fallback={fallback}>
      <AsyncComp />
    </Suspense>
  );
}

export default StreamComp;

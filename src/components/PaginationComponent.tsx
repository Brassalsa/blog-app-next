"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";

import useUrlQuery from "@/hooks/urlQuery";
import { Button } from "./ui/button";

type Props = {
  disableNext?: boolean;
  disableBack?: boolean;
};

function PaginationComponent({ disableBack, disableNext }: Props) {
  const urlQuery = useUrlQuery();
  const currentPage = Number(urlQuery.get("page")) || 1;
  const handleNext = () => {
    urlQuery.set("page", currentPage + 1);
  };
  const handleBack = () => {
    urlQuery.set("page", currentPage - 1);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={disableBack ? disableBack : currentPage == 1}
            className="flex gap-2"
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={handleNext}
            className="flex gap-2"
            disabled={disableNext}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;

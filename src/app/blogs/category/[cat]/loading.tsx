"use client";

import { BlogListLoading } from "@/components/pages/BlogListPage";
import { useParams } from "next/navigation";
import React from "react";

function Loading() {
  const { cat } = useParams();
  return <BlogListLoading title={"category list " + `"${cat}"`} />;
}

export default Loading;

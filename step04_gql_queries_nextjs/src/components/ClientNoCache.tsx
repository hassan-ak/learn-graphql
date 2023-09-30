"use client";

import { CompanyInfo } from "./CompanyInfo";
import { companyInfo as query } from "@/lib/queries";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Suspense } from "react";

export default function ClientNoCache() {
  const { data, error } = useSuspenseQuery(query, {
    context: { fetchOptions: { cache: "no-store" } },
  });
  if (error) return <p>Error :</p>;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyInfo data={data} />;
      </Suspense>
    </div>
  );
}

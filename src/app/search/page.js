import { Suspense } from "react";
import SearchPageClient from "./search-page-client";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <SearchPageClient />
    </Suspense>
  );
}

import { Suspense } from "react";
import CategorySearchPage from "./CategorySearchPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategorySearchPage />
    </Suspense>
  );
}

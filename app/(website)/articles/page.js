import { Suspense } from "react";
import Container from "@/components/container";
import Articles from "./articles";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";

export const runtime = "edge";

export default async function ArticlesPage({ searchParams }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Posts Grid */}
      <Container>
        <div className="mt-10">
          <Suspense
            key={searchParams.page || "1"}
            fallback={<Loading />}>
            <Articles searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}

// export const revalidate = 60;

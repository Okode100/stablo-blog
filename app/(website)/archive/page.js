import { Suspense } from "react";
import Container from "@/components/container";
import Archive from "./archive";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";

export const runtime = "edge";

export default async function ArchivePage({ searchParams }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Posts Grid */}
      <Container>
        <div className="mt-10">
          <Suspense
            key={searchParams.page || "1"}
            fallback={<Loading />}>
            <Archive searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}

// export const revalidate = 60;

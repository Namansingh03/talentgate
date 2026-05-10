import Footer from "@/components/home/Footer";
import UserNavbarSkeleton from "./UserNavbarSkeleton";

function SectionSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-muted/60 ${className}`} />
  );
}

export default function HomePageSkeleton() {
  return (
    <main>
      <UserNavbarSkeleton />

      {/* Hero Section Skeleton */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <SectionSkeleton className="h-14 w-3/4 mx-auto" />
          <SectionSkeleton className="h-6 w-2/3 mx-auto" />

          <div className="flex items-center justify-center gap-4 pt-4">
            <SectionSkeleton className="h-12 w-36" />
            <SectionSkeleton className="h-12 w-36" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border p-6 space-y-4">
              <SectionSkeleton className="h-12 w-12 rounded-xl" />
              <SectionSkeleton className="h-6 w-1/2" />
              <SectionSkeleton className="h-4 w-full" />
              <SectionSkeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </section>

      {/* Latest Jobs Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-4 mb-8">
          <SectionSkeleton className="h-10 w-64" />
          <SectionSkeleton className="h-5 w-96" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border p-6 space-y-4">
              <div className="flex items-center gap-4">
                <SectionSkeleton className="h-14 w-14 rounded-xl" />

                <div className="space-y-2 flex-1">
                  <SectionSkeleton className="h-5 w-3/4" />
                  <SectionSkeleton className="h-4 w-1/2" />
                </div>
              </div>

              <SectionSkeleton className="h-4 w-full" />
              <SectionSkeleton className="h-4 w-5/6" />

              <div className="flex gap-2 pt-2">
                <SectionSkeleton className="h-8 w-20 rounded-full" />
                <SectionSkeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl border p-10 text-center space-y-6">
          <SectionSkeleton className="h-12 w-1/2 mx-auto" />
          <SectionSkeleton className="h-5 w-2/3 mx-auto" />

          <SectionSkeleton className="h-12 w-40 mx-auto" />
        </div>
      </section>

      <Footer />
    </main>
  );
}

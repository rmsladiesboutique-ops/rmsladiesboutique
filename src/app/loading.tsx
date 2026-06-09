import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="section-container">
        <div className="glass-panel rounded-[2rem] p-10 space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-80 max-w-full" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <div className="grid gap-5 md:grid-cols-3 pt-4">
            <Skeleton className="h-52 rounded-2xl" />
            <Skeleton className="h-52 rounded-2xl" />
            <Skeleton className="h-52 rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}

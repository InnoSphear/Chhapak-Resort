import { Loader2 } from "lucide-react";

export function LoadingSpinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-gold`} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-cream flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-sand rounded-full"></div>
          <div className="absolute inset-0 border-4 border-gold rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-charcoal/60 font-medium tracking-wide">Loading...</p>
      </div>
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-sand rounded-2xl ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-luxury">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}

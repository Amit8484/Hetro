export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="bg-gray-300 h-48"></div>
          
          {/* Content skeleton */}
          <div className="p-4">
            <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-2/3 rounded mb-4"></div>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-300 h-10 rounded"></div>
              <div className="flex-1 bg-gray-300 h-10 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const WeatherSkeleton = () => {
  return (
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
      {/* Today Data Skeleton */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="flex gap-1 text-2xl items-end animate-pulse">
            <div className="w-24 h-6 bg-gray-300 rounded"></div>
            <div className="w-32 h-6 bg-gray-300 rounded"></div>
          </h2>
          <div className="bg-white gap-10 px-6 py-4 rounded-md shadow-sm items-center animate-pulse">
            {/* Temperature Skeleton */}
            <div className="flex flex-col px-4 gap-2">
              <div className="w-24 h-10 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
              <div className="w-40 h-4 bg-gray-300 rounded"></div>
            </div>
            <button className="mt-4 px-4 py-2 bg-gray-300 text-white rounded w-36 h-10"></button>
            {/* Time & Weather Icon Skeleton */}
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                >
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {/* Left Skeleton */}
          <div className="w-fit flex-col px-4 items-center bg-gray-100 rounded-md shadow-sm py-4 animate-pulse">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="w-10 h-10 bg-gray-300 rounded-full mt-2"></div>
          </div>
          <div className="bg-yellow-100/80 px-6 gap-4 rounded-md shadow-sm flex flex-col py-4 animate-pulse">
            <div className="w-40 h-4 bg-gray-300 rounded"></div>
            <div className="w-40 h-4 bg-gray-300 rounded"></div>
            <div className="w-40 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>
      {/* 7 Day Forecast Skeleton */}
      <section className="flex w-full flex-col gap-4">
        <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between bg-gray-100 px-4 py-2 rounded-md shadow-sm animate-pulse"
          >
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default WeatherSkeleton;

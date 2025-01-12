const ProfileSkeleton = () => {
  return (
    <div className="max-container flex animate-pulse items-center gap-4 rounded-lg bg-card px-4 lg:px-10 lg:py-8">
      <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-0.5">
          <div className="h-6 w-[150px] rounded bg-gray-200 dark:bg-gray-500"></div>
          <div className="h-4 w-[250px] rounded bg-gray-200 dark:bg-gray-500"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-1 h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-500"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="mr-1 h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-500"></div>
            </div>
          </div>
          <div className="mt-1 h-3 w-full rounded bg-gray-200 dark:bg-gray-500"></div>
        </div>
        <div className="mt-4 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-500"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

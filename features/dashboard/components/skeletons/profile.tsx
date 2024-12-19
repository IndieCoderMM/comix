const ProfileSkeleton = () => {
  return (
    <div className="max-container flex animate-pulse items-center gap-4 px-4">
      <div className="h-24 w-24 rounded-full bg-card"></div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-0.5">
          <div className="h-6 w-[150px] rounded bg-card"></div>
          <div className="h-4 w-[250px] rounded bg-card"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-1 h-5 w-20 rounded-full bg-card"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="mr-1 h-5 w-20 rounded-full bg-card"></div>
            </div>
          </div>
          <div className="mt-1 h-3 w-full rounded bg-card"></div>
        </div>
        <div className="mt-4 h-4 w-3/4 rounded bg-card"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
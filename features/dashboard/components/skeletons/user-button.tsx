const UserButtonSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center gap-2">
      <div className="h-12 w-12 rounded-full bg-card"></div>
      <div className="h-6 w-28 rounded-full bg-card"></div>
      <div className="ml-2 flex items-center">
        <div className="h-6 w-6 rounded-full bg-card"></div>
      </div>
    </div>
  );
};

export default UserButtonSkeleton;

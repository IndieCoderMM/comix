import Languages from "@/features/stats/sections/languages";
import LocGoal from "@/features/stats/sections/loc-goal";

const StatsPage = () => {
  return (
    <div className="w-full">
      <div className="flex">
        <LocGoal />
        <Languages />
      </div>
    </div>
  );
};

export default StatsPage;

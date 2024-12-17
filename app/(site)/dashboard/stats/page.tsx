import Languages from "@/features/stats/sections/languages";
import LocGoal from "@/features/stats/sections/loc-goal";

const StatsPage = () => {
  return (
    <div className="w-full">
      <LocGoal />
      <Languages />
    </div>
  );
};

export default StatsPage;

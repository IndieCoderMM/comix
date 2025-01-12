import { getRankShield } from "@/utils/users/getShield";
import Image from "next/image";

const RankBadge = ({ index }: { index: number }) => {
  const shield = getRankShield(index);
  if (!shield) return null;

  return (
    <div className="">
      <Image
        src={shield.image}
        alt={shield.name}
        width={50}
        height={50}
        className="h-8 w-8 object-contain sm:h-[50px] sm:w-[50px]"
      />
    </div>
  );
};

export default RankBadge;

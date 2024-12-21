import { getRankShield } from "@/utils/users/getShield";
import Image from "next/image";

const RankBadge = ({ index }: { index: number }) => {
  const shield = getRankShield(index);
  if (!shield) {
    return null;
  }

  return (
    <div>
      <Image
        src={shield.image}
        alt={shield.name}
        width={80}
        height={80}
        className="h-8 w-8 object-contain sm:h-20 sm:w-20"
      />
    </div>
  );
};

export default RankBadge;

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
        width={50}
        height={50}
        className="object-contain"
      />
    </div>
  );
};

export default RankBadge;

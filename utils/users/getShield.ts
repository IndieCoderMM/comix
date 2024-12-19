type Shield = {
  name: string;
  color: string;
  image: string;
};

const shields = {
  1: {
    name: "Bronze",
    color: "#d16647",
    image: "/assets/shields/b-1.svg",
  },
  2: {
    name: "Silver 1",
    color: "#bdccd4",
    image: "/assets/shields/s-1.svg",
  },
  3: {
    name: "Silver 2",
    color: "#bdccd4",
    image: "/assets/shields/s-2.svg",
  },
  4: {
    name: "Silver 3",
    color: "#bdccd4",
    image: "/assets/shields/s-3.svg",
  },
  5: {
    name: "Gold 1",
    color: "#fec92b",
    image: "/assets/shields/g-1.svg",
  },
  6: {
    name: "Gold 2",
    color: "#fec92b",
    image: "/assets/shields/g-2.svg",
  },
  7: {
    name: "Gold 3",
    color: "#fec92b",
    image: "/assets/shields/g-3.svg",
  },
  8: {
    name: "Platinum 1",
    color: "#73f0e8",
    image: "/assets/shields/p-1.svg",
  },
  9: {
    name: "Platinum 2",
    color: "#73f0e8",
    image: "/assets/shields/p-2.svg",
  },
  10: {
    name: "Platinum 3",
    color: "#73f0e8",
    image: "/assets/shields/p-3.svg",
  },
} as Record<number, Shield>;

const rankShields = {
  1: {
    name: "Master I",
    color: "#6c63ff",
    image: "/assets/shields/m-1.svg",
  },
  2: {
    name: "Master II",
    color: "#ff2b58",
    image: "/assets/shields/m-2.svg",
  },
  3: {
    name: "Master III",
    color: "#00c48c",
    image: "/assets/shields/m-3.svg",
  },
} as Record<number, Shield>;

export const getShield = (level: number) => {
  if (level >= 10) {
    return shields[10];
  }

  return shields[level];
};

/**
 * Exclusive shields for top 3
 */
export const getRankShield = (index: number) => {
  if (index >= 3) {
    return null;
  }

  return rankShields[index + 1];
};

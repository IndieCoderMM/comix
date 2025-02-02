import { featureImages, guideImages } from "./images";

export const content = {
  hero: {
    description:
      "Set goals, earn rewards, and compete on a global leaderboard while staying consistent with your commits.",
    cta: "Join Now For Free",
  },
  stats: [
    {
      number: 10,
      unit: "Million+",
      description:
        "Commits tracked and counted towards developer goals, keeping coding habits strong.",
    },
    {
      number: 5,
      unit: "Thousand+",
      description:
        "Developers have joined the platform to stay accountable and make committing fun.",
    },
    {
      number: 100,
      unit: "+",
      description:
        "Projects shared and boosted by developers looking to gain visibility in the community.",
    },
  ],
  dashboard: {
    heading: "Gamify Your GitHub Contributions",
    srcImg: guideImages.dashboard,
  },
  features: {
    heading: "Why You'll Love This",
    description:
      "We took commit tracking and made it fun. Level up, climb leaderboards, and boost your repos!",
    list: [
      {
        title: "Daily Goals",
        description: "Set and crush your commit goals.",

        srcImg: featureImages.commitGoal,
      },
      {
        title: "XP & Coins",
        description: "Earn rewards for your consistency.",
        srcImg: featureImages.challenge,
      },
      {
        title: "Global Leaderboard",
        description: "Compete with developers worldwide.",
        srcImg: featureImages.leaderboard,
      },
      {
        title: "Boost Repos",
        description: "Use coins to promote your projects.",
        srcImg: featureImages.feed,
      },
      {
        title: "Real-Time Stats",
        description: "Get insights into your contributions.",
        srcImg: featureImages.stat,
      },
      {
        title: "Ranking System",
        description: "Unlock new tiers as you level up.",
        srcImg: featureImages.ranking,
      },
      {
        title: "Profile Showcase",
        description: "Show off your progress and top repos.",
        srcImg: featureImages.repo,
      },
      {
        title: "Open Source",
        description: "Contribute and shape the platform.",
        srcImg: featureImages.repo,
      },
    ],
  },

  guides: {
    title: "How It Works",
    steps: [
      {
        step: 1,
        title: "Set commit goal",
        content: "Target how many LOC you want to write today.",
        srcImage: guideImages.commitGoal,
      },
      {
        step: 2,
        title: "Workon your projects",
        content: "Start coding and track your progress.",
        srcImage: guideImages.challenge,
      },
      {
        step: 3,
        title: "Earn rewards",
        content: "Earn XP, coins, and climb the leaderboard.",
        srcImage: guideImages.leaderboard,
      },
      {
        step: 4,
        title: "Boost projects",
        content: "Boost your repos and gain visibility.",
        srcImage: guideImages.repo,
      },
    ],
  },

  faqs: {
    title: "Got Questions?",
    description: "Here’s what you might want to know before diving in.",
    list: [
      {
        question: "How does Comix track my commits?",
        answer:
          "We sync with your GitHub account and fetch your commit data securely.",
      },
      {
        question: "Is there a cost to using this?",
        answer: "Nope! It’s free to use. Just log in and start tracking.",
      },
      {
        question: "Can I use this for private repos?",
        answer:
          "Not yet. We're planning to add support for private repos in the future.",
      },
      {
        question: "How do I level up?",
        answer:
          "Keep committing daily! XP is earned based on consistency and goal completion.",
      },
      {
        question: "Can I contribute to the project?",
        answer:
          "Absolutely! It’s open-source. Feel free to fork, contribute, and submit PRs.",
      },
    ],
  },

  footerCta: {
    title: "Ready to Level Up Your Coding Skill?",
    description: "Start tracking, competing, and making your commits count.",
    cta: "One-click Login",
  },
};

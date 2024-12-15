import { githubService } from "@/services/github";
import ContribChart from "../components/contrib-chart";
import LanguageChart from "../components/language-chart";

const AccountStats = async ({ login }: { login: string }) => {
  const { data: contributions, total } =
    await githubService.getContributions(login);
  const languages = await githubService.getLanguages(login);

  return (
    <section className="max-container">
      <ContribChart data={contributions} total={total} />
      <LanguageChart data={languages} />
    </section>
  );
};

export default AccountStats;

import { getSession } from "@/utils/auth";
import FloatingNav from "../components/float-nav";
import { navItems } from "../constants/nav-items";

const Header = async () => {
  const session = await getSession();

  return <FloatingNav navItems={navItems} isLoggedIn={!!session} />;
};

export default Header;

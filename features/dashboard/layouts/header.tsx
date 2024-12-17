import LogoutButton from "@/components/shared/logout-button";
import SigninButton from "@/components/shared/signin-button";
import { getSession } from "@/utils/auth";
import CoinButton from "../components/coin-button";
import NavLinks from "./nav-links";

const Header = async () => {
  const session = await getSession();
  return (
    <header className="w-full px-10 md:px-16 lg:px-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="font-poppins text-h5">
              Commitly
            </a>
          </div>
          <NavLinks />
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <CoinButton />
                <LogoutButton />
              </>
            ) : (
              <SigninButton text="Join Now" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

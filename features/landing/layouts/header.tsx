import LogoutButton from "@/components/shared/logout-button";
import SigninButton from "@/components/shared/signin-button";
import { getSession } from "@/utils/auth";
import { IconMenu2 } from "@tabler/icons-react";

const Header = async () => {
  const session = await getSession();
  return (
    <header className="max-container bg-[#FCF8F1] bg-opacity-30">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="font-heading text-h5">
              Commitly
            </a>
          </div>
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-black transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100 lg:hidden"
          >
            <IconMenu2 />
          </button>
          <NavLinks />
          {session ? (
            <LogoutButton text="Logout" />
          ) : (
            <SigninButton text="Join Now" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

const NavLinks = () => {
  return (
    <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
      <a
        href="#"
        title=""
        className="text-base text-black transition-all duration-200 hover:text-opacity-80"
      >
        {" "}
        Features{" "}
      </a>

      <a
        href="#"
        title=""
        className="text-base text-black transition-all duration-200 hover:text-opacity-80"
      >
        {" "}
        Solutions{" "}
      </a>

      <a
        href="#"
        title=""
        className="text-base text-black transition-all duration-200 hover:text-opacity-80"
      >
        {" "}
        Resources{" "}
      </a>

      <a
        href="#"
        title=""
        className="text-base text-black transition-all duration-200 hover:text-opacity-80"
      >
        {" "}
        Pricing{" "}
      </a>
    </div>
  );
};

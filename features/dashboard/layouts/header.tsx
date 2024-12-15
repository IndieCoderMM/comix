import SigninButton from "@/components/shared/signin-button";
import UserButton from "@/components/shared/user-button";
import { getSession } from "@/utils/auth";

const Header = async () => {
  const session = await getSession();
  return (
    <header className="max-container">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="font-poppins text-h5">
              Commitly
            </a>
          </div>
          <div className="flex items-center gap-4">
            {session ? <UserButton /> : <SigninButton text="Join Now" />}
          </div>
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

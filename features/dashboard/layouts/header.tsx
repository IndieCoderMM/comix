import SigninButton from "@/components/shared/signin-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/utils/auth";
import ClaimButton from "../components/claim-button";
import ThemeButton from "../components/theme-button";
import UserButton from "../components/user-button";

const Header = async () => {
  const session = await getSession();
  return (
    <header className="w-full px-4 py-2 sm:px-8 lg:px-10 lg:pb-8">
      <div className="flex h-[80px] w-full items-center justify-start gap-10">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <>
              <ClaimButton />
              <ThemeButton />
              <UserButton />
            </>
          ) : (
            <SigninButton text="Join Now" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

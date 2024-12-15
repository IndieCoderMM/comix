import { getSession } from "@/utils/auth";
import { IconUser } from "@tabler/icons-react";
import Image from "next/image";
import UserMenu from "./user-menu";

const UserButton = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <UserMenu>
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name ?? "User"}
          className="h-12 w-12 rounded-full object-cover"
          width={48}
          height={48}
        />
      ) : (
        <IconUser className="h-12 w-12 rounded-full" />
      )}
    </UserMenu>
  );
};

export default UserButton;

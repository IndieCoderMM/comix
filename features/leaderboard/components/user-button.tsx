import Image from "next/image";

const UserButton = ({
  user,
}: {
  user: { userId: string; metadata: Record<string, string> };
}) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={user.metadata.image}
        alt={user.metadata.name}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <p className="font-heading text-h6 text-primary">
          {user.metadata.name}
        </p>
      </div>
    </div>
  );
};

export default UserButton;

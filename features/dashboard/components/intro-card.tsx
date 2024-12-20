"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/utils/trpc";
import { getShield } from "@/utils/users/getShield";
import Image from "next/image";
import { useEffect, useState } from "react";

const IntroDialog = () => {
  const utils = trpc.useUtils();
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { mutate: markOnboarded, isLoading } =
    trpc.user.markAsOnboarded.useMutation({
      onSuccess() {
        utils.user.getAuthUser.invalidate();
      },
    });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (!user.exp || user.exp < 0) return;

    if (!user.signUpRewardClaimed) {
      setOpen(true);
      markOnboarded({ userId: user.id });
    }
  }, [user]);

  const shield = getShield(user?.level || 1);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center font-heading text-h5">
            Welcome, {user?.fullName}!
          </DialogTitle>
          <DialogDescription className="text-center font-heading">
            Your quest to 10x your productivity starts here.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src={shield.image}
            alt={shield.name}
            width={150}
            height={150}
            className="object-contain"
          />
          <span
            className="-mt-4 font-heading text-h6"
            style={{ color: shield.color }}
          >
            {shield.name}
          </span>
          <p className="text-center text-body3">
            Based on your contributions, you've been ranked as a <br />
            <strong style={{ color: shield.color }}>{user?.title}</strong>{" "}
            <em>(Level: {user?.level})</em> in the community.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => setOpen(false)}
          >
            {isLoading ? "Loading..." : "Get Started"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntroDialog;

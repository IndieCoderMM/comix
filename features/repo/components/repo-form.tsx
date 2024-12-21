"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { REPO_COST } from "@/utils/constants";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const repoSchema = z.object({
  name: z.string().min(2).max(50),
});

type RepoFields = z.infer<typeof repoSchema>;

const RepoForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<RepoFields>({
    resolver: zodResolver(repoSchema),
    defaultValues: {
      name: "",
    },
  });
  const utils = trpc.useUtils();
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { mutate, isLoading } = trpc.repo.createRepo.useMutation({
    onSuccess() {
      utils.repo.getAllRepos.invalidate();
      utils.repo.getPublicRepos.invalidate();
      utils.user.getAuthUser.invalidate();
      toast.success("Repo added successfully");
      onSuccess();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { data, isFetching, isError, isSuccess, refetch } =
    trpc.github.getOwnerRepo.useQuery(
      {
        owner: user?.ghLogin ?? "",
        name: form.getValues().name,
      },
      {
        enabled: false,
      },
    );

  const onSubmit: SubmitHandler<RepoFields> = (values) => {
    if (!data || !user || isFetching || !isSuccess) return;

    if (data.name !== values.name) {
      return;
    }

    const repo = {
      name: values.name,
      owner: user?.ghLogin,
      ownerId: user?.id,
      link: data.url,
    };

    mutate(repo);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repo Name</FormLabel>
              <FormControl>
                <Input placeholder="Your repo" {...field} />
              </FormControl>
              <FormDescription className="text-sm">
                *This repo must own by you and should be public.
              </FormDescription>
              <FormMessage />
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (!user || !form.getValues().name) return;
                    refetch();
                  }}
                >
                  Check
                </Button>
                <p className="ml-2 text-sm">
                  {isFetching
                    ? "Checking..."
                    : isSuccess
                      ? `${user?.ghLogin}/${data?.name} repo found`
                      : isError
                        ? "Repo not found"
                        : ""}
                </p>
                {isSuccess ? (
                  <IconCircleCheckFilled className="ml-2 text-success" />
                ) : isError ? (
                  <IconCircleXFilled className="ml-2 text-danger" />
                ) : null}
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isFetching || isLoading || !isSuccess}
          className="self-end"
        >
          {isLoading
            ? "Adding..."
            : isSuccess
              ? "Add Repo"
              : "Add Repo (Check First)"}
          <Image
            src="/assets/icons/coin.png"
            alt="Coin"
            width={20}
            height={20}
          />

          {REPO_COST}
        </Button>
      </form>
    </Form>
  );
};

export default RepoForm;

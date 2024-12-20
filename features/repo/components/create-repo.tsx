"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import RepoForm from "./repo-form";

const CreateRepo = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"xl"}>
          <IconPlus />
          <span className="ml-2 font-heading">Upload Repo</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Your Repo</DialogTitle>
        </DialogHeader>
        <RepoForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRepo;

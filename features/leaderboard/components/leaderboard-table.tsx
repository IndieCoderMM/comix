"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import RankBadge from "./rank-badge";
import UserButton from "./user-button";

const LeaderboardTable = () => {
  const [limit] = useState(10);
  const { data: leaderboard } = trpc.leaderboard.getLeaderboard.useQuery({
    limit,
  });

  if (!leaderboard) {
    return null;
  }

  return (
    <Table>
      <TableCaption>Top Committed Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-heading text-body4 font-medium">
            Rank
          </TableHead>
          <TableHead className="font-heading text-body4 font-medium">
            User
          </TableHead>
          <TableHead className="text-center font-heading text-body4 font-medium">
            Level
          </TableHead>
          <TableHead className="w-[200px] text-center font-heading text-body4 font-medium">
            Exp
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.map((user, idx) => (
          <TableRow key={user.userId}>
            <TableCell className="text-h5">
              {String(idx + 1).padStart(4, "0")}
            </TableCell>
            <TableCell className="flex items-center">
              <UserButton user={user} />
              <RankBadge index={idx} />
            </TableCell>
            <TableCell className="text-center text-h5">
              {user.metadata.level}
            </TableCell>
            <TableCell className="text-center text-h5">{user.score}</TableCell>
            <TableCell className="text-center text-h5">
              <Button variant="outline" onClick={() => console.log("clicked")}>
                View Profile
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;

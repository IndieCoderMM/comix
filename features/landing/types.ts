import { IconProps } from "@tabler/icons-react";
import React from "react";

export type Stat = {
  title: string;
  value: string;
  icon: React.JSXElementConstructor<IconProps>;
  fg?: string;
  bg?: string;
};

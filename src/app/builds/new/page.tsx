import { type Metadata } from "next";
import { type FC } from "react";

import { BuildForm } from "@/components/builds/build-form";

const NewBuild: FC = () => <BuildForm pt="3" />;

export const metadata: Metadata = {
  title: "Create New Build",
};

export default NewBuild;

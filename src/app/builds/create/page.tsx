import { type Metadata } from "next";
import { type FC } from "react";

import { BuildForm } from "@/components/builds/build-form";

const CreateBuild: FC = () => {
  return <BuildForm pt="3" />;
};

export const metadata: Metadata = {
  title: "Builder",
};

export default CreateBuild;

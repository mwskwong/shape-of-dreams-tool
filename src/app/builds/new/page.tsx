import { type ResolvingMetadata } from "next";
import { type FC } from "react";

import { BuildForm } from "@/components/builds/build-form";
import { routes } from "@/lib/site-config";

const NewBuild: FC = () => <BuildForm pt="3" />;

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata,
) => {
  const { openGraph } = await parent;

  return {
    title: "Create New Build",
    openGraph: {
      ...openGraph,
      url: routes.newBuild.pathname,
    },
  };
};

export default NewBuild;

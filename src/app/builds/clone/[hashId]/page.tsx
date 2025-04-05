import { notFound } from "next/navigation";
import { type FC } from "react";

import { BuildForm } from "@/components/builds/build-form";
import { getBuildByHashId } from "@/lib/queries";

interface CloneBuildProps {
  params: Promise<{ hashId: string }>;
}

const CloneBuild: FC<CloneBuildProps> = async ({ params }) => {
  const { hashId } = await params;
  const entry = await getBuildByHashId(hashId);

  if (!entry) notFound();

  return <BuildForm defaultValues={entry.build} pt="3" />;
};

export const generateMetadata = async ({ params }: CloneBuildProps) => {
  const { hashId } = await params;
  const entry = await getBuildByHashId(hashId);

  if (!entry) return;
  const { build } = entry;

  return {
    title: `New Build from ${build.buildName}`,
  };
};

// allow builds to revalidate in runtime, but statically render all paths the first time they're visited
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = () => [];

export default CloneBuild;

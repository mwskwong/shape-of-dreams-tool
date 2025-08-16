"use client";

import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { IconEye } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { type FC, useEffect } from "react";

import { viewBuildByHashId } from "@/lib/actions";
import { statsFormatter } from "@/lib/utils";

export interface ViewsProps extends Omit<FlexProps, "children"> {
  views: number;
}

export const Views: FC<ViewsProps> = ({ views, ...props }) => {
  const { hashId } = useParams<{ hashId: string }>();
  useEffect(() => void viewBuildByHashId(hashId), [hashId]);

  return (
    <Flex align="center" gap="1" justify="center" {...props}>
      <IconEye size={18} />
      <Text size="2">{statsFormatter.format(views)}</Text>
    </Flex>
  );
};

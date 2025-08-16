"use client";

import "@radix-ui/themes/tokens/colors/red.css";

import { Button, type ButtonProps } from "@radix-ui/themes/components/button";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { type FC, startTransition, useOptimistic } from "react";

import { likeBuildByHashId, unlikeBuildByHashId } from "@/lib/actions";
import { statsFormatter } from "@/lib/utils";

export interface LikeButtonProps extends Omit<ButtonProps, "children"> {
  liked?: boolean;
  likes: number;
}

export const LikeButton: FC<LikeButtonProps> = ({
  color,
  highContrast,
  likes,
  liked = false,
  ...props
}) => {
  const { hashId } = useParams<{ hashId: string }>();

  const [optimisticState, setOptimisticState] = useOptimistic({ liked, likes });

  return (
    <Button
      color={optimisticState.liked ? "red" : color}
      highContrast={optimisticState.liked ? false : highContrast}
      onClick={() => {
        const action = optimisticState.liked
          ? unlikeBuildByHashId
          : likeBuildByHashId;
        startTransition(async () => {
          setOptimisticState((prev) => ({
            liked: !prev.liked,
            likes: prev.likes + (prev.liked ? -1 : 1),
          }));

          await action(hashId);
        });
      }}
      {...props}
    >
      {optimisticState.liked ? (
        <IconHeartFilled size={18} />
      ) : (
        <IconHeart size={18} />
      )}
      {statsFormatter.format(optimisticState.likes)}
    </Button>
  );
};

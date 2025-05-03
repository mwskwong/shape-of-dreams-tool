"use client";

import "@radix-ui/themes/tokens/colors/red.css";

import { Button, type ButtonProps } from "@radix-ui/themes/components/button";
import { Text } from "@radix-ui/themes/components/text";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { type FC, startTransition, useOptimistic } from "react";

import { likeBuild, unlikeBuild } from "@/lib/actions";

export interface LikeButtonProps extends Omit<ButtonProps, "children"> {
  liked?: boolean;
  likes: number;
}

export const LikeButton: FC<LikeButtonProps> = ({
  likes,
  liked = false,
  ...props
}) => {
  const { hashId } = useParams<{ hashId: string }>();

  const [optimisticState, setOptimisticState] = useOptimistic({ liked, likes });

  return (
    <Button
      onClick={() => {
        const action = optimisticState.liked ? unlikeBuild : likeBuild;
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
      <Text asChild color={optimisticState.liked ? "red" : undefined}>
        {optimisticState.liked ? (
          <IconHeartFilled size={18} />
        ) : (
          <IconHeart size={18} />
        )}
      </Text>
      Like ({optimisticState.likes})
    </Button>
  );
};

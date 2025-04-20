import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import { Grid } from "@radix-ui/themes/components/grid";
import { Skeleton } from "@radix-ui/themes/components/skeleton";
import { type FC } from "react";

const EssencesLoading: FC = () => (
  <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
    {Array.from({ length: 12 }, (_, index) => (
      <Skeleton key={index}>
        <Box asChild height="180px">
          <Card />
        </Box>
      </Skeleton>
    ))}
  </Grid>
);

export default EssencesLoading;

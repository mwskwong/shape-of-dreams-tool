import { Card } from "@radix-ui/themes/components/card";
import { Grid } from "@radix-ui/themes/components/grid";
import { Skeleton } from "@radix-ui/themes/components/skeleton";
import { type FC } from "react";

import styles from "./loading.module.css";

const BuildsLoading: FC = () => (
  <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
    {Array.from({ length: 12 }, (_, index) => (
      <Skeleton key={index}>
        <Card className={styles.card} />
      </Skeleton>
    ))}
  </Grid>
);

export default BuildsLoading;

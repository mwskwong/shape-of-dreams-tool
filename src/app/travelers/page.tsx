import "@radix-ui/themes/tokens/colors/orange.css";
import "@radix-ui/themes/tokens/colors/mint.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Grid } from "@radix-ui/themes/components/grid";
import { type Metadata } from "next";
import { type FC } from "react";

import { TravelerCard } from "@/components/travelers/traveler-card";
import { getTravelerColor, getTravelerMemories } from "@/lib/utils";
import travelers from "@public/data/travelers.json";

const Travelers: FC = () => {
  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3" pt="3">
      {Object.entries(travelers).map(([key, traveler]) => (
        <TravelerCard
          key={key}
          color={getTravelerColor(key)}
          {...traveler}
          memories={getTravelerMemories(key)}
        />
      ))}
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Travelers",
};

export default Travelers;

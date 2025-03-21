import "@radix-ui/themes/tokens/colors/orange.css";
import "@radix-ui/themes/tokens/colors/mint.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Grid } from "@radix-ui/themes/components/grid";
import { type Metadata } from "next";
import { type FC } from "react";

import {
  TravelerCard,
  type TravelerCardProps,
} from "@/components/travelers/traveler-card";
import { compareMemories } from "@/lib/utils";
import memories from "@public/data/memories.json";
import travelers from "@public/data/travelers.json";

const getTravelerColor = (travelerId: string): TravelerCardProps["color"] => {
  switch (travelerId) {
    case "Hero_Lacerta": {
      return "orange";
    }
    case "Hero_Mist": {
      return "mint";
    }
    case "Hero_Yubar": {
      return "ruby";
    }
    case "Hero_Vesper": {
      return "amber";
    }
    case "Hero_Aurena": {
      return "yellow";
    }
  }
};

const Travelers: FC = () => {
  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3" pt="3">
      {Object.entries(travelers).map(([key, traveler]) => {
        const travelerMemories = Object.values(memories)
          .filter((memory) => memory.traveler === key)
          .map((memory) => ({
            ...memory,
            mutuallyExclusive: Object.values(memories)
              .filter(
                ({ name, traveler, travelerMemoryLocation }) =>
                  name !== memory.name &&
                  traveler &&
                  traveler === memory.traveler &&
                  travelerMemoryLocation === memory.travelerMemoryLocation,
              )
              .map(({ name }) => name),
          }))
          .toSorted((a, b) => compareMemories(a, b));
        return (
          <TravelerCard
            key={key}
            color={getTravelerColor(key)}
            {...traveler}
            memories={travelerMemories}
          />
        );
      })}
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Travelers",
};

export default Travelers;

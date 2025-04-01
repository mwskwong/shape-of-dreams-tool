import "@radix-ui/themes/tokens/colors/orange.css";
import "@radix-ui/themes/tokens/colors/mint.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Grid } from "@radix-ui/themes/components/grid";
import { Theme, type ThemeProps } from "@radix-ui/themes/components/theme";
import { type Metadata } from "next";
import { type FC } from "react";

import * as TravelerCard from "@/components/travelers/traveler-card";
import { compareMemories } from "@/lib/utils";
import memories from "@public/data/memories.json";
import travelers from "@public/data/travelers.json";

const getTravelerColor = (travelerId: string): ThemeProps["accentColor"] => {
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

const getTravelerMemories = (traveler: string) =>
  Object.values(memories)
    .filter((memory) => memory.traveler === traveler)
    .map(
      ({
        addedCharges,
        travelerMemoryLocation: _travelerMemoryLocation,
        ...memory
      }) => ({
        ...memory,
        mutuallyExclusive: Object.values(memories)
          .filter(
            ({ name, traveler, travelerMemoryLocation }) =>
              name !== memory.name &&
              traveler &&
              traveler === memory.traveler &&
              travelerMemoryLocation === _travelerMemoryLocation,
          )
          .map(({ name }) => name),
      }),
    )
    .toSorted((a, b) => compareMemories(a, b));

const Travelers: FC = () => {
  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3" pt="3">
      {Object.entries(travelers).map(([key, { name, image, ...traveler }]) => (
        <Theme key={key} accentColor={getTravelerColor(key)}>
          <TravelerCard.Root image={image} name={name}>
            <TravelerCard.Content
              {...traveler}
              memories={getTravelerMemories(key)}
            />
          </TravelerCard.Root>
        </Theme>
      ))}
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Travelers",
};

export default Travelers;

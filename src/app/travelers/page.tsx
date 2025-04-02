import "@radix-ui/themes/tokens/colors/orange.css";
import "@radix-ui/themes/tokens/colors/mint.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Grid } from "@radix-ui/themes/components/grid";
import { Theme } from "@radix-ui/themes/components/theme";
import { type Metadata } from "next";
import { type FC } from "react";

import * as TravelerCard from "@/components/travelers/traveler-card";
import { compareMemories, getTravelerColor } from "@/lib/utils";
import memories from "@public/data/memories.json";
import travelers from "@public/data/travelers.json";

const sortedMemories = Object.values(memories).toSorted(compareMemories);

const Travelers: FC = () => {
  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3" pt="3">
      {Object.entries(travelers).map(([key, { name, image, ...traveler }]) => (
        <Theme key={key} accentColor={getTravelerColor(key)}>
          <TravelerCard.Root image={image} name={name}>
            <TravelerCard.Content
              {...traveler}
              memories={sortedMemories
                .filter((memory) => memory.traveler === key)
                .map(
                  ({
                    name,
                    cooldownTime,
                    maxCharges,
                    description,
                    shortDescription,
                    type,
                    image,
                    achievement,
                    traveler,
                    travelerMemoryLocation,
                  }) => ({
                    name,
                    cooldownTime,
                    maxCharges,
                    description,
                    shortDescription,
                    type,
                    image,
                    achievement,
                    mutuallyExclusive: Object.values(memories)
                      .filter(
                        (memory) =>
                          memory.name !== name &&
                          memory.traveler &&
                          memory.traveler === traveler &&
                          memory.travelerMemoryLocation ===
                            travelerMemoryLocation,
                      )
                      .map(({ name }) => name),
                  }),
                )}
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

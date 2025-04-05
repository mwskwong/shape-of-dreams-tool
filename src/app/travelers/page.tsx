import "@/styles/traveler-colors.css";

import { Grid } from "@radix-ui/themes/components/grid";
import { Theme } from "@radix-ui/themes/components/theme";
import { type Metadata } from "next";
import { type FC } from "react";

import * as TravelerCard from "@/components/travelers/traveler-card";
import { allMemoryEntries, allTravelerEntries } from "@/lib/constants";
import { routes } from "@/lib/site-config";
import { getMutuallyExclusiveMemories, getTravelerColor } from "@/lib/utils";

const Travelers: FC = () => (
  <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3" pt="3">
    {allTravelerEntries.map(([key, { name, image, ...traveler }]) => (
      <Theme key={key} accentColor={getTravelerColor(key)}>
        <TravelerCard.Root image={image} name={name}>
          <TravelerCard.Content
            {...traveler}
            memories={allMemoryEntries
              .filter(([, { traveler }]) => traveler === key)
              .map(
                ([
                  ,
                  {
                    name,
                    rarity,
                    cooldownTime,
                    maxCharges,
                    description,
                    shortDescription,
                    type,
                    image,
                    achievement,
                    traveler,
                    travelerMemoryLocation,
                  },
                ]) => ({
                  name,
                  cooldownTime,
                  maxCharges,
                  description,
                  shortDescription,
                  type,
                  image,
                  achievement,
                  mutuallyExclusive: getMutuallyExclusiveMemories({
                    name,
                    rarity,
                    traveler,
                    travelerMemoryLocation,
                  }),
                }),
              )}
          />
        </TravelerCard.Root>
      </Theme>
    ))}
  </Grid>
);

export const metadata: Metadata = {
  title: routes.travelers.name,
};

export default Travelers;

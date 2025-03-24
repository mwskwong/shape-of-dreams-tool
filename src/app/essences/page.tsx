import { Grid } from "@radix-ui/themes/components/grid";
import { type Metadata } from "next";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import { ItemCard } from "@/components/item-card";
import { compareRarities, loadSearchParams } from "@/lib/utils";
import essences from "@public/data/essences.json";

interface EssencesProps {
  searchParams: Promise<SearchParams>;
}

const Essences: FC<EssencesProps> = async ({ searchParams }) => {
  const { search, rarities } = await loadSearchParams(searchParams);

  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
      {Object.entries(essences)
        .toSorted(
          ([, a], [, b]) =>
            compareRarities(a.rarity, b.rarity) || a.name.localeCompare(b.name),
        )
        .filter(
          ([, { name, description, rarity }]) =>
            (search === "" ||
              name.toLowerCase().includes(search.toLowerCase()) ||
              description.toLowerCase().includes(search.toLowerCase())) &&
            (rarities.length === 0 || rarities.includes(rarity)),
        )
        .map(([key, essence]) => (
          <ItemCard key={key} {...essence} />
        ))}
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Essences",
};

export default Essences;

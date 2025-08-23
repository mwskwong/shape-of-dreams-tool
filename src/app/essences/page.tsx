import { ItemCard } from "@/components/item-card";
import { getMemoryById } from "@/lib/memories";
import { loadEssencesSearchParams } from "@/lib/search-params";
import { getTravelerById } from "@/lib/travelers";

const EssencesPage = async ({ searchParams }: PageProps<"/essences">) => {
  const { search, rarities } = await loadEssencesSearchParams(searchParams);
  console.log({ search, rarities });

  const memory = getMemoryById("St_R_Smite");

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {memory && (
        <ItemCard.Root>
          <ItemCard.Header
            image={memory.image}
            name={memory.name}
            rarity="Common"
            traveler={getTravelerById(memory.traveler)?.name}
          />
        </ItemCard.Root>
      )}
      {memory && (
        <ItemCard.Root>
          <ItemCard.Header
            image={memory.image}
            name={memory.name}
            rarity="Rare"
            traveler={getTravelerById(memory.traveler)?.name}
          />
        </ItemCard.Root>
      )}
      {memory && (
        <ItemCard.Root>
          <ItemCard.Header
            image={memory.image}
            name={memory.name}
            rarity="Epic"
            traveler={getTravelerById(memory.traveler)?.name}
          />
        </ItemCard.Root>
      )}
      {memory && (
        <ItemCard.Root>
          <ItemCard.Header
            image={memory.image}
            name={memory.name}
            rarity="Legendary"
            traveler={getTravelerById(memory.traveler)?.name}
          />
        </ItemCard.Root>
      )}
      {memory && (
        <ItemCard.Root>
          <ItemCard.Header
            image={memory.image}
            name={memory.name}
            rarity="Traveler"
            traveler={getTravelerById(memory.traveler)?.name}
          />
        </ItemCard.Root>
      )}
    </div>
  );
};

export default EssencesPage;

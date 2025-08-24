import { ItemCard } from "@/components/item-card";
import { getEssences } from "@/lib/essences";
import { loadEssencesSearchParams } from "@/lib/search-params";

const essences = getEssences();

const EssencesPage = async ({ searchParams }: PageProps<"/essences">) => {
  const { search, rarities } = await loadEssencesSearchParams(searchParams);
  console.log({ search, rarities });

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {essences.map(
        ({
          id,
          name,
          image,
          rarity,
          achievementName,
          achievementDescription,
          rawDescVars,
          rawDesc,
        }) => (
          <ItemCard.Root key={id} itemType="essence">
            <ItemCard.Header image={image} name={name} rarity={rarity} />
            <ItemCard.Body
              achievementDescription={achievementDescription}
              achievementName={achievementName}
              leveling="quality" // TODO: can I some how receive the itemType prop without using context?
              rawDescVars={rawDescVars}
            >
              {rawDesc}
            </ItemCard.Body>
          </ItemCard.Root>
        ),
      )}
    </div>
  );
};

export default EssencesPage;

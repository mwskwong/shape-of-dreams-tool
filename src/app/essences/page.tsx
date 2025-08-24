import {
  ItemCardBody,
  ItemCardHeader,
  ItemCardRoot,
} from "@/components/item-card";
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
          <ItemCardRoot key={id} itemType="essence">
            <ItemCardHeader image={image} name={name} rarity={rarity} />
            <ItemCardBody
              achievementDescription={achievementDescription}
              achievementName={achievementName}
              rawDescVars={rawDescVars}
            >
              {rawDesc}
            </ItemCardBody>
          </ItemCardRoot>
        ),
      )}
    </div>
  );
};

export default EssencesPage;

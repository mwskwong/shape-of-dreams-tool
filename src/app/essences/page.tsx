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

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {essences
        .filter(
          ({
            name,
            rawDesc,
            rarity,
            achievementName,
            achievementDescription,
          }) => {
            const searchCleaned = search
              .replaceAll(/\s+/g, " ")
              .trim()
              .toLowerCase();

            return (
              (!searchCleaned ||
                name.toLowerCase().includes(searchCleaned) ||
                rawDesc.toLowerCase().includes(searchCleaned) ||
                achievementName.toLowerCase().includes(searchCleaned) ||
                achievementDescription.toLowerCase().includes(searchCleaned)) &&
              (rarities.length === 0 || rarities.includes(rarity))
            );
          },
        )
        .map(
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

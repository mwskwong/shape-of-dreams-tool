import {
  ItemCardBody,
  ItemCardFooter,
  ItemCardHeader,
  ItemCardRoot,
} from "@/components/item-card";
import { getMemories } from "@/lib/memories";
import { loadMemoriesSearchParams } from "@/lib/search-params";

const memories = getMemories();

const MemoriesPage = async ({ searchParams }: PageProps<"/memories">) => {
  const { search, rarities, types, travelers, tags } =
    await loadMemoriesSearchParams(searchParams);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {memories
        .filter(
          ({
            name,
            rawDesc,
            shortDescription,
            rarity,
            traveler,
            type,
            tags: _tags,
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
                shortDescription.toLowerCase().includes(searchCleaned) ||
                rawDesc.toLowerCase().includes(searchCleaned) ||
                achievementName.toLowerCase().includes(searchCleaned) ||
                achievementDescription.toLowerCase().includes(searchCleaned)) &&
              (rarities.length === 0 || rarities.includes(rarity)) &&
              (types.length === 0 || types.includes(type)) &&
              (travelers.length === 0 || travelers.includes(traveler)) &&
              // @ts-expect-error -- In TS, calling a function typed as a union of distinct function signatures requires an argument that is assignable to the intersection of all parameter types across those signatures
              tags.every((tag) => _tags.includes(tag))
            );
          },
        )
        .map(
          ({
            id,
            name,
            image,
            rarity,
            traveler,
            cooldownTime,
            maxCharges,
            type,
            achievementName,
            achievementDescription,
            mutuallyExclusive,
            rawDescVars,
            rawDesc,
            tags,
          }) => (
            <ItemCardRoot key={id}>
              <ItemCardHeader
                image={image}
                name={name}
                rarity={rarity}
                traveler={traveler}
              />
              <ItemCardBody
                achievementDescription={achievementDescription}
                achievementName={achievementName}
                cooldownTime={cooldownTime}
                maxCharges={maxCharges}
                mutuallyExclusive={mutuallyExclusive}
                rawDescVars={rawDescVars}
                type={type}
              >
                {rawDesc}
              </ItemCardBody>
              <ItemCardFooter tags={tags} />
            </ItemCardRoot>
          ),
        )}
    </div>
  );
};

export default MemoriesPage;

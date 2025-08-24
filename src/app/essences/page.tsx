import { ItemCard } from "@/components/item-card";
import { getMemoryById } from "@/lib/memories";
import { loadEssencesSearchParams } from "@/lib/search-params";
import { getTravelerById } from "@/lib/travelers";

const EssencesPage = async ({ searchParams }: PageProps<"/essences">) => {
  const { search, rarities } = await loadEssencesSearchParams(searchParams);
  console.log({ search, rarities });

  const iceShield = getMemoryById("St_C_IceBlock");
  const staticDischarge = getMemoryById("St_R_StaticDischarge");
  const umbralEdge = getMemoryById("St_E_UmbralEdge");
  const shoutOfOblivion = getMemoryById("St_L_ShoutOfOblivion");
  const parry = getMemoryById("St_R_Parry");

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[iceShield, staticDischarge, umbralEdge, shoutOfOblivion, parry].map(
        (memory) =>
          memory && (
            <ItemCard.Root key={memory.id}>
              <ItemCard.Header
                image={memory.image}
                name={memory.name}
                rarity={memory.rarity}
                traveler={getTravelerById(memory.traveler)?.name}
              />
              <ItemCard.Body
                achievementDescription={memory.achievementDescription}
                achievementName={memory.achievementName}
                cooldownTime={memory.cooldownTime}
                maxCharges={memory.maxCharges}
                mutuallyExclusive={memory.mutuallyExclusive}
                rawDescVars={memory.rawDescVars}
                type={memory.type}
              >
                {memory.rawDesc}
              </ItemCard.Body>
              <ItemCard.Footer tags={memory.tags} />
            </ItemCard.Root>
          ),
      )}
    </div>
  );
};

export default EssencesPage;

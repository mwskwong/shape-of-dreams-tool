import { Suspense } from "react";

import { EssencesToolbar } from "@/components/essences/essences-toolbar";
import { getEssenceRarities } from "@/lib/essences";

const essenceRarities = getEssenceRarities();

const EssencesPage = () => {
  return (
    <div>
      <Suspense>
        <EssencesToolbar rarities={essenceRarities} />
      </Suspense>
    </div>
  );
};

export default EssencesPage;

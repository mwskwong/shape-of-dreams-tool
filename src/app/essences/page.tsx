import { loadEssencesSearchParams } from "@/lib/search-params";

const EssencesPage = async ({ searchParams }: PageProps<"/essences">) => {
  const { search, rarities } = await loadEssencesSearchParams(searchParams);
  console.log({ search, rarities });

  return <div>page</div>;
};

export default EssencesPage;

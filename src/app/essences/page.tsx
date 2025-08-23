import { loadItemSearchParams } from "@/lib/utils";

const EssencesPage = async ({ searchParams }: PageProps<"/essences">) => {
  const { search, rarities } = await loadItemSearchParams(searchParams);
  console.log({ search, rarities });

  return <div>page</div>;
};

export default EssencesPage;

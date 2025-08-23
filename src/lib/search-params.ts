import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const essencesSearchParams = {
  search: parseAsString.withDefault(""),
  rarities: parseAsArrayOf(parseAsString).withDefault([]),
};

export const loadEssencesSearchParams = createLoader(essencesSearchParams);

export const memoriesSearchParams = {
  search: parseAsString.withDefault(""),
  rarities: parseAsArrayOf(parseAsString).withDefault([]),
  types: parseAsArrayOf(parseAsString).withDefault([]),
  travelers: parseAsArrayOf(parseAsString).withDefault([]),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
};

export const loadMemoriesSearchParams = createLoader(memoriesSearchParams);

export const buildSearchParams = {
  search: parseAsString.withDefault(""),
  travelers: parseAsArrayOf(parseAsString).withDefault([]),
  memories: parseAsArrayOf(parseAsString).withDefault([]),
  essences: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsStringLiteral(["newest", "mostViewed", "mostLiked"]).withDefault(
    "newest",
  ),
  page: parseAsInteger.withDefault(1),
};

export const loadBuildSearchParams = createLoader(buildSearchParams);

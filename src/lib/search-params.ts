import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

import { getEssenceRarities } from "./essences";
import { getMemoryRarities, getMemoryTags, getMemoryTypes } from "./memories";
import { getTravelerIds } from "./travelers";

export const essencesSearchParams = {
  search: parseAsString.withDefault(""),
  rarities: parseAsArrayOf(
    parseAsStringLiteral(getEssenceRarities()),
  ).withDefault([]),
  quality: parseAsInteger.withDefault(100),
};

export const loadEssencesSearchParams = createLoader(essencesSearchParams);

export const memoriesSearchParams = {
  search: parseAsString.withDefault(""),
  rarities: parseAsArrayOf(
    parseAsStringLiteral(getMemoryRarities()),
  ).withDefault([]),
  types: parseAsArrayOf(parseAsStringLiteral(getMemoryTypes())).withDefault([]),
  travelers: parseAsArrayOf(parseAsStringLiteral(getTravelerIds())).withDefault(
    [],
  ),
  tags: parseAsArrayOf(parseAsStringLiteral(getMemoryTags())).withDefault([]),
  level: parseAsInteger.withDefault(1),
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

import parse, {
  type DOMNode,
  Element,
  type HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import Image from "next/image";
import { type ComponentProps, Fragment } from "react";
import { type SetOptional } from "type-fest";

import { type Essence } from "@/lib/essences";
import { type Memory } from "@/lib/memories";
import { getSpriteById } from "@/lib/sprites";
import { getTravelerById } from "@/lib/travelers";
import { cn } from "@/lib/utils";

type Item = SetOptional<
  {
    [K in keyof Memory]: K extends keyof Essence
      ? Memory[K] | Essence[K]
      : Memory[K];
  } & {
    [K in keyof Essence as Exclude<K, keyof Memory>]: Essence[K];
  },
  Exclude<keyof Memory, keyof Essence>
>;

export interface ItemCardRootProps extends ComponentProps<"article"> {
  itemType?: "memory" | "essence";
}

export const ItemCardRoot = ({
  itemType = "memory",
  className,
  children,
  ...props
}: ItemCardRootProps) => (
  <article
    className={cn("card group card-border", className)}
    data-item-type={itemType}
    {...props}
  >
    <div className="card-body">{children}</div>
  </article>
);

export type ItemCardHeaderProps = Omit<ComponentProps<"header">, "children"> &
  Pick<Item, "name" | "rarity" | "traveler" | "image">;

export const ItemCardHeader = ({
  name,
  image,
  rarity,
  traveler,
}: ItemCardHeaderProps) => (
  <header className="flex items-start gap-2">
    <Image
      alt=""
      className={"avatar rounded-sm group-data-[item-type=essence]:p-1"}
      src={image}
      width={48}
    />
    <div>
      <h2 className="card-title">{name}</h2>
      <p
        className={cn("text-amber-400", {
          "text-zinc-400": rarity === "Common",
          "text-blue-400": rarity === "Rare",
          "text-purple-400": rarity === "Epic",
          "text-red-400": rarity === "Legendary",
        })}
      >
        {rarity}{" "}
        {traveler
          ? ` · ${getTravelerById(traveler)?.name ?? traveler}`
          : undefined}
      </p>
    </div>
  </header>
);

export type ItemCardBodyProps = ComponentProps<"div"> &
  SetOptional<
    Pick<
      Item,
      | "cooldownTime"
      | "maxCharges"
      | "type"
      | "achievementName"
      | "achievementDescription"
      | "mutuallyExclusive"
      | "rawDescVars"
    >,
    "achievementName" | "achievementDescription"
  >;

export const ItemCardBody = ({
  cooldownTime,
  maxCharges,
  type,
  achievementName,
  achievementDescription,
  mutuallyExclusive = [],
  rawDescVars,
  children,
  className,
  ...props
}: ItemCardBodyProps) => {
  const options = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const { name, attribs, children, parentNode } = domNode;

        if (name === "span" && attribs["data-index"]) {
          return (
            <span className="whitespace-nowrap" {...attribs}>
              {domToReact(children as DOMNode[], options)}
            </span>
          );
        }

        if (name === "i" && attribs["data-sprite"]) {
          const sprite = getSpriteById(attribs["data-sprite"]);

          if (sprite) {
            const isUpgradableParam = attribs["data-sprite"] === "5";
            const varIndex =
              parentNode instanceof Element
                ? Number.parseInt(parentNode.attribs["data-index"])
                : -1;

            return (
              <span
                className="tooltip"
                data-tip={
                  isUpgradableParam
                    ? rawDescVars[varIndex].scaling
                    : sprite.name
                }
              >
                <Image
                  alt={sprite.name}
                  className="inline-block h-[1em] w-auto align-middle"
                  height={14}
                  src={sprite.image}
                />
              </span>
            );
          }
        }

        if (name === "em" && attribs["data-color"]) {
          return (
            <em
              className={cn({
                "text-yellow-300": attribs["data-color"] === "yellow",
              })}
              style={{
                color:
                  attribs["data-color"] === "yellow"
                    ? undefined
                    : attribs["data-color"],
              }}
            >
              {domToReact(children as DOMNode[], options)}
            </em>
          );
        }
      }

      return;
    },
  } satisfies HTMLReactParserOptions;

  return (
    <div
      className={cn("flex grow flex-col gap-[inherit] *:grow-0", className)}
      {...props}
    >
      {(cooldownTime !== undefined || maxCharges !== undefined || type) && (
        <p className="opacity-60">
          {cooldownTime !== undefined &&
            (cooldownTime === 0 ? "Passive" : `Cooldown: ${cooldownTime}s`)}
          {maxCharges && maxCharges > 1 && ` | Charges: ${maxCharges}`}
          {!type || type === "Normal" ? undefined : ` | ${type}`}
        </p>
      )}

      {typeof children === "string"
        ? children.split("\n\n").map((paragraph, index) => (
            <p key={index}>
              {parse(
                paragraph
                  .replaceAll(
                    /{(\d+)}/g,
                    (_, index: string) =>
                      `<span data-index="${index}">${rawDescVars[Number.parseInt(index)].rendered}</span>`,
                  )
                  .replaceAll("\n", "<br>")
                  .replaceAll(
                    /<color=(.*?)>(.*?)<\/color>/g,
                    '<em data-color="$1">$2</em>',
                  )
                  .replaceAll(/<sprite=(\d+)>/g, '<i data-sprite="$1"></i>'), // WORKAROUND: unable to use self closing tags. ref: https://github.com/remarkablemark/html-react-parser/issues/1434
                options,
              )}
            </p>
          ))
        : children}

      {achievementName && (
        <p className="opacity-60">
          Unlock requirement -{" "}
          <em className="text-yellow-300">{achievementName}</em>:{" "}
          {achievementDescription}
        </p>
      )}

      {mutuallyExclusive.length > 0 && (
        <p className="opacity-60">
          Mutually exclusive:{" "}
          {mutuallyExclusive.map((memory, index) => (
            <Fragment key={memory}>
              <em key={memory} className="text-yellow-300">
                {memory}
              </em>
              {index < mutuallyExclusive.length - 1 && ", "}
            </Fragment>
          ))}
        </p>
      )}
    </div>
  );
};

export type ItemCardFooterProps = ComponentProps<"footer"> & Pick<Item, "tags">;
export const ItemCardFooter = ({
  tags = [],
  className,
  ...props
}: ItemCardFooterProps) => (
  <footer className={cn("flex flex-wrap gap-2")} {...props}>
    {tags.map((tag) => (
      <div key={tag} className="badge badge-sm badge-soft">
        {tag}
      </div>
    ))}
  </footer>
);

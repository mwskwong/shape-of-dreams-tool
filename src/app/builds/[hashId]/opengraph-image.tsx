/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { getEssenceById } from "@/lib/essences";
import { getMemoryById } from "@/lib/memories";
import { getBuildByHashId } from "@/lib/queries";
import { siteUrl } from "@/lib/site-config";
import { spriteMaxAspectRatio, sprites } from "@/lib/sprites";
import {
  type Traveler,
  generateTravelerStats,
  getTravelerById,
} from "@/lib/travelers";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const geistSansFontPath = "node_modules/geist/dist/fonts/geist-sans";

const space = 4;
const colors = {
  orangeA11: "#FFA057",
  mintA11: "#67FFDED2",
  rubyA11: "#FF949D",
  amberA11: "#FFCA16",
  yellowA11: "#FEE949F5",
  slate1: "#111113",
  slate12: "#EDEEF0",
  slateA2: "#D8F4F609",
  slateA5: "#d9edfe25",
  slateA7: "#D9EDFF40",
  slateA11: "#F1F7FEB5",
};

const radius = {
  1: 3,
  2: 4,
  3: 6,
  4: 8,
  5: 12,
  6: 16,
} as const;

const getTravelerColorHex = (traveler: Traveler) => {
  switch (traveler.color) {
    case "orange": {
      return colors.orangeA11;
    }
    case "mint": {
      return colors.mintA11;
    }
    case "ruby": {
      return colors.rubyA11;
    }
    case "amber": {
      return colors.amberA11;
    }
    case "yellow": {
      return colors.yellowA11;
    }
  }
};

const OpengraphImage = async ({ params }: { params: { hashId: string } }) => {
  const { hashId } = params;
  const build = await getBuildByHashId(hashId);

  if (!build) return;

  const traveler = getTravelerById(build.details.traveler.id);
  const stats =
    traveler &&
    generateTravelerStats(traveler, { hideSecondaryStats: true }).map(
      ({ iconClassName, ...rest }) => {
        if (rest.id === "movementSpeed") {
          return {
            ...rest,
            iconStyles: {
              filter:
                "brightness(0) saturate(100%) invert(89%) sepia(3%) saturate(5616%) hue-rotate(178deg) brightness(116%) contrast(99%)",
            },
          };
        }

        return { ...rest, iconStyles: undefined };
      },
    );

  const [geistRegular, geistBold] = await Promise.all([
    readFile(path.join(process.cwd(), geistSansFontPath, "Geist-Regular.ttf")),
    readFile(path.join(process.cwd(), geistSansFontPath, "Geist-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          fontFamily: "Geist",
          fontWeight: 400,
          fontSize: 16,
          backgroundColor: colors.slate1,
          color: colors.slate12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: space * 3,
          }}
        >
          <div
            style={{
              fontSize: 35,
              fontWeight: 700,
              marginBottom: space * 3,
              maxWidth: 640,
            }}
          >
            {build.details.name}
          </div>

          <div style={{ display: "flex", columnGap: space * 9 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: space * 3,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: space * 2,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    borderRadius: radius[6],
                    border: `1px solid ${colors.slateA5}`,
                    height: 128,
                    width: 128,
                    backgroundColor: colors.slateA2,
                    overflow: "hidden",
                  }}
                >
                  {traveler && (
                    <img
                      height="100%"
                      src={`${siteUrl}${traveler.image.src}`}
                      width="100%"
                    />
                  )}
                </div>
                <div
                  style={{
                    color: traveler && getTravelerColorHex(traveler),
                  }}
                >
                  {traveler?.name ?? "Any"}
                </div>
              </div>

              <div style={{ display: "flex", gap: space * 3 }}>
                {Object.entries(build.details.traveler.startingMemories).map(
                  ([key, value]) => {
                    const memory = getMemoryById(value);

                    return (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: space * 2,
                          maxWidth: 64,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            height: 64,
                            width: 64,
                            borderRadius: radius[4],
                            border: `1px solid ${colors.slateA5}`,
                            backgroundColor: colors.slateA2,
                            overflow: "hidden",
                          }}
                        >
                          {memory && (
                            <img
                              height="100%"
                              src={`${siteUrl}${memory.image.src}`}
                              width="100%"
                            />
                          )}
                        </div>
                        <div style={{ fontSize: 12, textAlign: "center" }}>
                          {memory?.name ?? "Any"}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: space * 4,
                  flexDirection: "column",
                  fontSize: 14,
                }}
              >
                {stats?.map(
                  ({ image, name, value, statGrowth, iconStyles }) => (
                    <div
                      key={name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: space * 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: space * 2,
                          minWidth: 200,
                        }}
                      >
                        <div
                          style={{
                            width: Math.round(16 * spriteMaxAspectRatio),
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            height={16}
                            src={`${siteUrl}${image.src}`}
                            style={iconStyles}
                          />
                        </div>
                        <div style={{ color: colors.slateA11 }}>{name}</div>
                      </div>
                      <div style={{ display: "flex" }}>
                        {value}
                        {statGrowth && (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: 12,
                              color: colors.yellowA11,
                            }}
                          >
                            <img
                              height={14}
                              src={`${siteUrl}${sprites.upgradableParameter.image.src}`}
                              style={{
                                marginLeft: space * 0.4,
                                marginRight: space * 0.4,
                              }}
                            />
                            ({statGrowth})
                          </span>
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: space * 3,
              }}
            >
              {build.details.memories.map(
                ({ id, essences: essenceIds }, index) => {
                  const memory = getMemoryById(id);
                  const essences = essenceIds.map((id) => getEssenceById(id));

                  return (
                    <div
                      key={index}
                      style={{ display: "flex", gap: space * 3 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: space * 2,
                          maxWidth: 80,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            height: 80,
                            width: 80,
                            borderRadius: radius[5],
                            border: `1px solid ${colors.slateA5}`,
                            backgroundColor: colors.slateA2,
                            overflow: "hidden",
                          }}
                        >
                          {memory && (
                            <img
                              height="100%"
                              src={`${siteUrl}${memory.image.src}`}
                              width="100%"
                            />
                          )}
                        </div>

                        <div style={{ fontSize: 14, textAlign: "center" }}>
                          {memory?.name ?? "Any"}
                        </div>
                      </div>

                      {essences.map((essence, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: space * 2,
                            maxWidth: 64,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              height: 64,
                              width: 64,
                              padding: space * 3,
                              borderRadius: radius[4],
                              border: `1px solid ${colors.slateA5}`,
                              backgroundColor: colors.slateA2,
                              overflow: "hidden",
                            }}
                          >
                            {essence && (
                              <img
                                height="100%"
                                src={`${siteUrl}${essence.image.src}`}
                                width="100%"
                              />
                            )}
                          </div>
                          <div style={{ fontSize: 12, textAlign: "center" }}>
                            {essence?.name ?? "Any"}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geistRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Geist",
          data: geistBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
};

export default OpengraphImage;

/* eslint-enable jsx-a11y/alt-text */
/* eslint-enable @next/next/no-img-element */

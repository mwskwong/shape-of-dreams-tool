/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import {
  allEssenceEntries,
  allMemoryEntries,
  allTravelerEntries,
  spriteMaxAspectRatio,
  sprites,
} from "@/lib/constants";
import { getBuildByHashId } from "@/lib/queries";
import { siteUrl } from "@/lib/site-config";
import { getTravelerColor } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const geistSansFontPath = "node_modules/geist/dist/fonts/geist-sans";

const getTravelerColorHex = (travelerId: string) => {
  switch (getTravelerColor(travelerId)) {
    case "orange": {
      return "#FFA057";
    }
    case "mint": {
      return "#67FFDED2";
    }
    case "ruby": {
      return "#FF949D";
    }
    case "amber": {
      return "#FFCA16";
    }
    case "yellow": {
      return "#FEE949F5";
    }
  }
};

const OpengraphImage = async ({ params }: { params: { hashId: string } }) => {
  const { hashId } = params;
  const entry = await getBuildByHashId(hashId);

  if (!entry) return;
  const { build } = entry;
  const traveler = allTravelerEntries.find(
    ([key]) => key === build.traveler.id,
  )?.[1];
  const stats = traveler && [
    {
      ...sprites.health,
      image: `${siteUrl}/images/${sprites.health.image}`,
      value: traveler.health,
    },
    {
      ...sprites.armor,
      image: `${siteUrl}/images/${sprites.armor.image}`,
      value: traveler.armor,
    },
    {
      ...sprites.attackDamage,
      image: `${siteUrl}/images/${sprites.attackDamage.image}`,
      value: traveler.attackDamage,
    },
    {
      ...sprites.abilityPower,
      image: `${siteUrl}/images/${sprites.abilityPower.image}`,
      value: traveler.abilityPower,
    },
    {
      ...sprites.attackSpeed,
      image: `${siteUrl}/images/${sprites.attackSpeed.image}`,
      value: traveler.attackSpeed.toFixed(2),
    },
    {
      image: `${siteUrl}/images/texMovement.png`,
      name: "Movement Speed",
      value: traveler.movementSpeed,
      iconStyles: {
        filter:
          "brightness(0) saturate(100%) invert(89%) sepia(3%) saturate(5616%) hue-rotate(178deg) brightness(116%) contrast(99%)",
      },
      width: undefined,
      height: undefined,
    },
  ];

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
          backgroundColor: "#111113",
          color: "#EDEEF0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4 * 3,
          }}
        >
          <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 4 * 3 }}>
            {build.buildName}
          </div>

          <div style={{ display: "flex", columnGap: 4 * 9 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4 * 3,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4 * 2,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    borderRadius: 8,
                    border: "1px solid #d9edff40",
                    height: 128,
                    width: 128,
                    backgroundColor: "#D8F4F609",
                  }}
                >
                  {traveler && (
                    <img
                      height="100%"
                      src={`${siteUrl}/images/${traveler.image}`}
                      width="100%"
                    />
                  )}
                </div>
                <div style={{ color: getTravelerColorHex(build.traveler.id) }}>
                  {traveler?.name ?? "Any"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 4 * 3 }}>
                {Object.entries(build.traveler.startingMemories).map(
                  ([key, value]) => {
                    const memory = allMemoryEntries.find(
                      ([key]) => key === value,
                    )?.[1];

                    return (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4 * 2,
                          maxWidth: 64,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            height: 64,
                            width: 64,
                            borderRadius: 8,
                            border: "1px solid #d9edff40",
                            backgroundColor: "#D8F4F609",
                          }}
                        >
                          {memory && (
                            <img
                              height="100%"
                              src={`${siteUrl}/images/${memory.image}`}
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
                  gap: 4 * 4,
                  flexDirection: "column",
                  fontSize: 14,
                }}
              >
                {stats?.map(
                  ({
                    image,
                    name,
                    value,
                    iconStyles,
                    width = 1,
                    height = 1,
                  }) => (
                    <div
                      key={name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4 * 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4 * 2,
                          minWidth: 200,
                        }}
                      >
                        <div
                          style={{
                            width: 16 * spriteMaxAspectRatio,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            height={16}
                            src={image}
                            style={iconStyles}
                            width={Math.round(16 * (width / height))}
                          />
                        </div>
                        <div style={{ color: "#F1F7FEB5" }}>{name}</div>
                      </div>
                      {value}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 4 * 3 }}
            >
              {build.memories.map(({ id, essences: essenceIds }, index) => {
                const memory = allMemoryEntries.find(
                  ([key]) => key === id,
                )?.[1];
                const essences = essenceIds.map(
                  (id) => allEssenceEntries.find(([key]) => key === id)?.[1],
                );

                return (
                  <div key={index} style={{ display: "flex", gap: 4 * 3 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4 * 2,
                        maxWidth: 80,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          height: 80,
                          width: 80,
                          borderRadius: 8,
                          border: "1px solid #d9edff40",
                          backgroundColor: "#D8F4F609",
                        }}
                      >
                        {memory && (
                          <img
                            height="100%"
                            src={`${siteUrl}/images/${memory.image}`}
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
                          gap: 4 * 2,
                          maxWidth: 64,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            height: 64,
                            width: 64,
                            padding: 4 * 3,
                            borderRadius: 8,
                            border: "1px solid #d9edff40",
                            backgroundColor: "#D8F4F609",
                          }}
                        >
                          {essence && (
                            <img
                              height="100%"
                              src={`${siteUrl}/images/${essence.image}`}
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
              })}
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

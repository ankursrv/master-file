import React from "react";
import CustomImage from "@/components/molecules/customImage";
import { cn } from "@/lib/utils";

type IconKey =
  | "date"
  | "availability"
  | "order"
  | "distribute"
  | "schedule"
  | "collect"
  | "payment"
  | "experience"
  | "certificate";

const ICON_DIR = "/images/rocksport-reh/roadmap-icon";

interface RoadmapStep {
  icon: IconKey;
  title: string;
  desktopOffsetX?: number; // % offset for X position on desktop
  desktopOffsetY?: number; // % offset for Y position on desktop
  mobileOffsetX?: number; // % offset for X position on mobile
  mobileOffsetY?: number; // % offset for Y position on mobile
  mobileWidth?: number; // custom width in px for mobile cards
}

interface RoadmapRehProps {
  title?: string;
  description?: string;
  steps?: RoadmapStep[];
}

/* ------------------------ Data ------------------------------------------ */

const defaultSteps: RoadmapStep[] = [
  {
    icon: "date",
    title: "Check Date Availability",
    desktopOffsetX: -4,
    mobileWidth: 123,
  },
  {
    icon: "availability",
    title: "Receive Availability Confirmation",
    desktopOffsetX: -10,
    mobileWidth: 131,
  },
  {
    icon: "order",
    title: "Provide Work order to confirm the program",
    desktopOffsetX: -4,
    mobileOffsetY: 2,
  },
  {
    icon: "distribute",
    title: "Distribute Digital Program Circular to parents",
    mobileOffsetY: -3,
  },
  { icon: "schedule", title: "Schedule an Online Webinar for parents" },
  { icon: "collect", title: "Collect Student's Payment" },
  {
    icon: "payment",
    title: "Release Outstanding payment",
    desktopOffsetX: 5,
    mobileOffsetY: -2,
  },
  { icon: "experience", title: "Experience the Program", mobileOffsetY: -5 },
  {
    icon: "certificate",
    title: "Receive Participation Certificate",
    desktopOffsetX: 14,
    mobileOffsetY: -7,
    mobileOffsetX: 34,
  },
];

type Anchor = {
  x: number;
  y: number;
  cardY: number;
  side: "top" | "bottom";
  offsetX?: number;
  offsetY?: number;
};
type MobileAnchor = {
  x: number;
  y: number;
  cardY: number;
  side: "left" | "right";
  offsetX?: number;
  offsetY?: number;
};

const DESKTOP_ANCHORS: Anchor[] = [
  { x: 2.7, y: 78.2, cardY: 58, side: "top" },
  { x: 14.6, y: 91.2, cardY: 102, side: "bottom" },
  { x: 29.2, y: 77.8, cardY: 38, side: "top" },
  { x: 40.5, y: 65.9, cardY: 98, side: "bottom" },
  { x: 48.0, y: 60.4, cardY: 22, side: "top" },
  { x: 59.1, y: 32.2, cardY: 72, side: "bottom" },
  { x: 67.6, y: 12.7, cardY: 48, side: "bottom" },
  { x: 79.9, y: 6.8, cardY: 22, side: "bottom" },
  { x: 92.4, y: 4.4, cardY: 58, side: "bottom" },
];

const MOBILE_ANCHORS: MobileAnchor[] = [
  { x: 48.7, y: 92.3, cardY: 92.3, side: "left" },
  { x: 55.0, y: 81.0, cardY: 88.0, side: "right" },
  { x: 82.0, y: 73.9, cardY: 71.9, side: "left" },
  { x: 92.0, y: 64.7, cardY: 66.7, side: "left" },
  { x: 50.0, y: 53.4, cardY: 46.4, side: "right" },
  { x: 8.4, y: 39.3, cardY: 38.3, side: "right" },
  { x: 50.0, y: 29.5, cardY: 23.8, side: "left" },
  { x: 91.0, y: 20.1, cardY: 19.1, side: "left" },
  { x: 60.0, y: 4.2, cardY: 3.6, side: "left" },
];

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

const NodeBadge = ({ index }: { index: number }) => (
  <span className="flex size-11 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
    {String(index + 1).padStart(2, "0")}
  </span>
);

const Card = ({
  icon,
  title,
  className,
}: {
  icon: IconKey;
  title: string;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 rounded-[6px] xl:rounded-xl bg-white p-3 xl:p-5 border border-dark-300/40 shadow-[0px_21px_20.9px_0px_#00000014]",
      className
    )}
  >
    <p className="text-xs xl:text-lg font-bold leading-120 text-dark-300">
      {title}
    </p>
    <CustomImage
      src={`${ICON_DIR}/${icon}.svg`}
      alt=""
      width={32}
      height={32}
      aria-hidden="true"
      className="size-6 xl:size-8 shrink-0"
    />
  </div>
);

/** Mobile card width as a % of the curve box — the connector anchors to it. */
const MOBILE_CARD_PCT = 55;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const RoadmapReh = ({
  title = "Our Roadmap",
  description = "Explore a thoughtfully designed program that combines safety, structured learning, and engaging activities.",
  steps = defaultSteps,
}: RoadmapRehProps) => {
  return (
    <section className="bg-image2 py-10 lg:pt-20 lg:pb-[140px]">
      <div className="container">
        {/* Heading */}
        <div className="md:max-w-[580px]">
          <h2 className="text-dark! uppercase">{title}</h2>
          <p className="mt-4 text-sm md:text-xl leading-150 text-dark-300">
            {description}
          </p>
        </div>

        {/* ---- Desktop: curved roadmap on the supplied vector ---- */}
        <div className="relative hidden aspect-[1253/552] lg:block">
          <CustomImage
            src="/images/rocksport-reh/Vector-desktop.webp"
            alt=""
            fill
            aria-hidden="true"
            className="select-none object-contain pointer-events-none"
          />

          {/* SVG Connectors — drawn dynamically so they always connect node to card */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none z-0 overflow-visible">
            {steps.map((step, i) => {
              const a = DESKTOP_ANCHORS[i];
              if (!a) return null;

              const cardY =
                a.cardY + (a.offsetY || 0) + (step.desktopOffsetY || 0);

              // Slightly pierce the card so there's no visual gap between line and card edge
              const pierce = a.side === "top" ? -2 : 2;
              const lineEndY = cardY + pierce;

              return (
                <line
                  key={`conn-${i}`}
                  x1={`${a.x}%`}
                  y1={`${a.y}%`}
                  x2={`${a.x}%`}
                  y2={`${lineEndY}%`}
                  className="stroke-primary"
                  strokeWidth="3"
                />
              );
            })}
          </svg>

          {/* Cards — auto-size to their content; dynamically positioned */}
          {steps.map((step, i) => {
            const a = DESKTOP_ANCHORS[i];
            if (!a) return null;

            const cardX = a.x + (a.offsetX || 0) + (step.desktopOffsetX || 0);
            const cardY =
              a.cardY + (a.offsetY || 0) + (step.desktopOffsetY || 0);

            const tx = a.x < 15 ? "0" : a.x > 85 ? "-100%" : "-50%";
            const ty = a.side === "top" ? "-100%" : "0";

            return (
              <div
                key={`card-${i}`}
                className={cn(
                  "absolute z-10",
                  i === 8 ? "max-xl:!left-[98%]" : ""
                )}
                style={{
                  left: `${cardX}%`,
                  top: `${cardY}%`,
                  transform: `translate(${tx}, ${ty})`,
                  transition: "all 0.3s ease", // smooth movement if adjusted
                }}
              >
                <Card
                  icon={step.icon}
                  title={step.title}
                  className="w-[150px] xl:w-[257px]"
                />
              </div>
            );
          })}

          {/* Nodes (rendered last so they sit above connectors) */}
          {steps.map((step, i) => {
            const a = DESKTOP_ANCHORS[i];
            if (!a) return null;
            return (
              <div
                key={`node-${i}`}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
              >
                <NodeBadge index={i} />
              </div>
            );
          })}
        </div>

        {/* ---- Mobile / tablet: serpentine roadmap on the supplied vector ---- */}
        <div className="relative mx-auto mt-20 aspect-[343/796] w-full max-w-[360px] lg:hidden">
          <CustomImage
            src="/images/rocksport-reh/Vector-mobile.webp"
            alt=""
            fill
            aria-hidden="true"
            className="select-none object-contain pointer-events-none"
          />

          <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
            {steps.map((step, i) => {
              const a = MOBILE_ANCHORS[i];
              if (!a) return null;

              const cardY =
                a.cardY + (a.offsetY || 0) + (step.mobileOffsetY || 0);
              const cardXOffset = (a.offsetX || 0) + (step.mobileOffsetX || 0);
              const onLeft = a.side === "left";
              const innerEdge = onLeft
                ? MOBILE_CARD_PCT + cardXOffset
                : 100 - MOBILE_CARD_PCT + cardXOffset;

              return (
                <React.Fragment key={`conn-${i}`}>
                  {/* Vertical segment */}
                  {a.x !== innerEdge && a.y !== cardY && (
                    <line
                      x1={`${a.x}%`}
                      y1={`${a.y}%`}
                      x2={`${a.x}%`}
                      y2={`${cardY}%`}
                      className="stroke-primary"
                      strokeWidth="2"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </svg>

          {/* Horizontal Connectors rendered as HTML for perfect pixel math */}
          {steps.map((step, i) => {
            const a = MOBILE_ANCHORS[i];
            if (!a) return null;

            const cardY =
              a.cardY + (a.offsetY || 0) + (step.mobileOffsetY || 0);
            const cardXOffset = (a.offsetX || 0) + (step.mobileOffsetX || 0);
            const onLeft = a.side === "left";
            const w = step.mobileWidth || 185;

            return (
              <div
                key={`hconn-${i}`}
                className="absolute z-0 bg-primary"
                style={{
                  height: "2px",
                  top: `calc(${cardY}% - 1px)`,
                  ...(onLeft
                    ? {
                        left: `calc(${cardXOffset}% + ${w}px - 4px)`,
                        width: `calc(${a.x}% - (${cardXOffset}% + ${w}px - 4px))`,
                      }
                    : {
                        right: `calc(${-cardXOffset}% + ${w}px - 4px)`,
                        width: `calc((100% - ${a.x}%) - (${-cardXOffset}% + ${w}px - 4px))`,
                      }),
                }}
              />
            );
          })}

          {steps.map((step, i) => {
            const a = MOBILE_ANCHORS[i];
            if (!a) return null;

            const cardY =
              a.cardY + (a.offsetY || 0) + (step.mobileOffsetY || 0);
            const cardXOffset = (a.offsetX || 0) + (step.mobileOffsetX || 0);
            const onLeft = a.side === "left";
            const w = step.mobileWidth || 185;

            return (
              <React.Fragment key={`m-${i}`}>
                {/* Card pinned to the outer edge, auto-sizing to its content */}
                <div
                  className={cn("absolute z-10 -translate-y-1/2")}
                  style={{
                    top: `${cardY}%`,
                    width: `${w}px`,
                    ...(onLeft
                      ? { left: `${cardXOffset}%` }
                      : { right: `${-cardXOffset}%` }),
                    transition: "all 0.3s ease",
                  }}
                >
                  <Card
                    icon={step.icon}
                    title={step.title}
                    className="w-full"
                  />
                </div>

                {/* Node on the curve */}
                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                >
                  <NodeBadge index={i} />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapReh;

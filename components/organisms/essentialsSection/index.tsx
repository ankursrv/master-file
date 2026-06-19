import EssentialCard from "@/components/molecules/essentialCard";
import type { scheduleDataItem } from "@/components/molecules/essentialCard";
import type {
  WhatToCarrySection,
  PickAndDropSection,
  MeetingPointSection,
} from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";

function formatDate(iso: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

function formatTime(raw: string): string {
  if (!raw) return "-";
  const cleaned = raw.replace(/[APap][Mm]$/i, "").trim(); // strip trailing AM/PM
  const parts = cleaned.split(":").map(Number);
  const hours = parts[0] ?? 0;
  const minutes = parts[1] ?? 0;
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12}:${String(minutes).padStart(2, "0")} ${period}`;
}

interface EssentialsSectionProps {
  variant?: "ris" | "rdo";
  whatToCarry?: WhatToCarrySection;
  pickAndDrop?: PickAndDropSection;
  /** RDO: meeting_point_section with departure/arrival pointer lists */
  meetingPoint?: MeetingPointSection;
}

const EssentialsSection = ({
  variant = "ris",
  whatToCarry,
  pickAndDrop,
  meetingPoint,
}: EssentialsSectionProps) => {
  // ── What to carry items ────────────────────────────────────────────────────
  // Priority: feature_cards.items (new array) → feature_card (legacy single) → static fallback
  const carryItems = (() => {
    const fromArray = whatToCarry?.feature_cards?.items;
    if (fromArray?.length) {
      return filterRisItems(fromArray).map((c) => ({
        icon: c.feature_icon,
        text: c.feature_title,
      }));
    }
    if (whatToCarry?.feature_card) {
      return [
        {
          icon: whatToCarry.feature_card.feature_icon,
          text: whatToCarry.feature_card.feature_title,
        },
      ];
    }
    return [
      { icon: "/images/essential-icon/icon-1.png", text: "Attire" },
      { icon: "/images/essential-icon/icon-2.png", text: "Lunch" },
      { icon: "/images/essential-icon/icon-3.png", text: "Cap" },
      { icon: "/images/essential-icon/icon-4.png", text: "Pick & Drop" },
      { icon: "/images/essential-icon/icon-5.png", text: "Water Bottle" },
      { icon: "/images/essential-icon/icon-6.png", text: "Sanitizer" },
    ];
  })();

  const carryImage = whatToCarry?.carry_image_url ?? "/images/essen1.png";
  const carryTitle = whatToCarry?.section_heading?.title ?? "What to carry?";

  // ── Pick & Drop (RDO meeting point) ────────────────────────────────────────
  const buildRdoMeetingPointData = (): scheduleDataItem[] => {
    if (!meetingPoint) return [];
    const { departure_card, arrival_card } = meetingPoint;
    const items: scheduleDataItem[] = [];
    if (departure_card?.departure_pointers?.length) {
      items.push({
        type: "departure",
        title: departure_card.departure_title ?? "Important Details",
        details: departure_card.departure_pointers.map((text) => ({
          label: "",
          value: text,
        })),
      });
    }
    if (arrival_card?.arrival_pointers?.length) {
      items.push({
        type: "arrival",
        title: arrival_card.arrival_title ?? "Transportation",
        details: arrival_card.arrival_pointers.map((text) => ({
          label: "",
          value: text,
        })),
      });
    }
    return items;
  };

  // ── Pick & Drop (RIS) ──────────────────────────────────────────────────────
  const buildScheduleData = (): scheduleDataItem[] => {
    if (!pickAndDrop) {
      return [
        {
          type: "departure",
          title: "Departure",
          details: [
            { label: "Departure Date", value: "May 27, 2026" },
            { label: "Departure Time", value: "5:00 AM" },
          ],
        },
        {
          type: "arrival",
          title: "Arrival",
          details: [
            { label: "Arrival Date", value: "May 27, 2026" },
            { label: "Arrival Time", value: "9:00 AM" },
          ],
        },
      ];
    }
    const { departure_card, arrival_card } = pickAndDrop;
    return [
      {
        type: "departure",
        title: departure_card.departure_card_title,
        bgImage: departure_card.departure_bgimage_url,
        details: [
          {
            label: "Departure Date",
            value: formatDate(departure_card.departure_date),
          },
          {
            label: "Departure Time",
            value: formatTime(departure_card.departure_time),
          },
        ],
      },
      {
        type: "arrival",
        title: arrival_card.arrival_card_title,
        bgImage: arrival_card.arrival_bgimage_url,
        details: [
          {
            label: "Arrival Date",
            value: formatDate(arrival_card.arrival_date),
          },
          {
            label: "Arrival Time",
            value: formatTime(arrival_card.arrival_time),
          },
        ],
      },
    ];
  };

  const pickDropTitle =
    meetingPoint?.section_heading?.title ??
    pickAndDrop?.section_heading?.title ??
    "Pick up And Drop";
  const sectionBgImage = pickAndDrop?.arrival_departure_bgimage_url;
  const pickDropScheduleData =
    variant === "rdo" ? buildRdoMeetingPointData() : buildScheduleData();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* ── What to Carry ── */}
      <EssentialCard
        title={carryTitle}
        data={carryItems}
        imageSrc={carryImage}
        carry
      />

      {/* ── Pick & Drop ── */}
      <EssentialCard
        title={pickDropTitle}
        scheduleData={pickDropScheduleData}
        imageSrc="/images/essen2.png"
        sectionBgImage={sectionBgImage}
        bgColor
        variant={variant}
        pointerOnly={variant === "rdo" && !!meetingPoint}
      />
    </section>
  );
};

export default EssentialsSection;

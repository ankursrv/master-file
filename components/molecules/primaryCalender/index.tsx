"use client";

import Icons from "@/components/atoms/icons";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import DialogBox from "@/components/molecules/dialogBox";
import useIsMobile from "@/lib/useIsMobile";

interface PrimaryCalenderProps {
  isOpen: boolean;
  onConfirm?: (date: Date) => void;
  onClose?: () => void;
}

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 101 }, (_, i) => currentYear - i);

const PrimaryCalender = ({
  isOpen,
  onConfirm,
  onClose,
}: PrimaryCalenderProps) => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);

  const yearListRef = useRef<HTMLDivElement>(null);
  const activeYear = viewMonth.getFullYear();
  const activeMonth = viewMonth.getMonth();

  // Auto-scroll to active year when dropdown opens
  useEffect(() => {
    if (showYearPicker && yearListRef.current) {
      const activeEl = yearListRef.current.querySelector(
        "[data-active='true']"
      );
      activeEl?.scrollIntoView({ block: "center" });
    }
  }, [showYearPicker]);

  const handleSelectYear = (year: number) => {
    setViewMonth(new Date(year, activeMonth, 1));
    setShowYearPicker(false);
  };

  const handleContinue = () => {
    if (selected && onConfirm) onConfirm(selected);
  };
  const isMobile = useIsMobile();
  return (
    <DialogBox
      isOpen={isOpen}
      onClose={onClose}
      title="Select Birth Date"
      closeIcon={true}
      textStyle="!font-semibold"
      containerStyle={cn(
        "!w-full md:!w-[375px] !h-auto p-5",
        isMobile && "rounded-br-none rounded-bl-none"
      )}
      titleContainerStyle="!p-0 !pb-5 !border-b-0"
      isMobileStyle
    >
      <div className="flex flex-col items-center">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(date) => {
            setSelected(date);
            setShowYearPicker(false);
          }}
          month={viewMonth}
          onMonthChange={setViewMonth}
          captionLayout="label"
          showOutsideDays
          disabled={{ after: new Date() }}
          classNames={{
            root: "w-full",
            month: "w-full",
            month_caption: "hidden",
            nav: "hidden",
            weekdays: "grid grid-cols-7 text-dark/60",
            weekday: "text-xs font-normal text-center py-1",
            weeks: "w-full",
            week: "grid grid-cols-7 mt-2",
            day: "flex items-center justify-center",
            day_button: cn(
              "size-8 text-sm rounded-full font-medium",
              "text-dark hover:bg-orange-100 hover:text-[#e85d04]",
              "transition-colors focus:outline-none"
            ),
            selected:
              "[&>button]:bg-primary [&>button]:text-white [&>button]:rounded-full",
            today: "[&>button]:font-bold [&>button]:text-[#e85d04]",
            outside: "[&>button]:text-gray-300",
            disabled:
              "[&>button]:opacity-30 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent [&>button]:hover:text-gray-300",
          }}
          formatters={{
            formatWeekdayName: (day) =>
              day.toLocaleString("default", { weekday: "short" }),
          }}
          components={{
            MonthCaption: () => (
              <div className="mb-3">
                {/* Caption row */}
                <div className="flex items-center justify-between">
                  {/* Clickable "Jan 2025 >" — opens year dropdown */}
                  <button
                    onClick={() => setShowYearPicker((p) => !p)}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                    aria-label="Select year"
                  >
                    <span className="font-semibold text-dark">
                      {viewMonth.toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <Icons.UpIcon
                      className={cn(
                        "text-primary transition-transform",
                        showYearPicker ? "-rotate-90" : "rotate-90"
                      )}
                    />
                  </button>

                  {/* Prev / Next arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setViewMonth(new Date(activeYear, activeMonth - 1, 1))
                      }
                      aria-label="Previous month"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <Icons.UpIcon className="-rotate-90 text-primary" />
                    </button>
                    <button
                      onClick={() =>
                        setViewMonth(new Date(activeYear, activeMonth + 1, 1))
                      }
                      aria-label="Next month"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <Icons.UpIcon className="rotate-90 text-primary" />
                    </button>
                  </div>
                </div>

                {/* ── Year Dropdown List ── */}
                {showYearPicker && (
                  <div
                    ref={yearListRef}
                    className="mt-2 h-48 overflow-y-auto rounded-xl border border-light-200 bg-white shadow-sm scrollbar-theme1 py-1"
                  >
                    {YEARS.map((y) => (
                      <button
                        key={y}
                        data-active={activeYear === y}
                        onClick={() => handleSelectYear(y)}
                        className={cn(
                          "w-full text-left px-4 py-1.5 text-[13px] transition-colors",
                          activeYear === y
                            ? "bg-primary text-white font-semibold"
                            : "text-dark hover:bg-orange-50 hover:text-[#e85d04]"
                        )}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ),
          }}
        />
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={cn(
            "w-full h-12 mt-5 rounded-full text-base font-bold tracking-wide transition-all",
            selected
              ? "bg-primary text-white hover:bg-[#cf4f00] active:scale-[0.98]"
              : "bg-primary/80 text-white cursor-not-allowed"
          )}
        >
          Continue
        </button>
      </div>
    </DialogBox>
  );
};

export default PrimaryCalender;

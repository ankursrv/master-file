import Icons from "@/components/atoms/icons";
import PrimaryCalender from "@/components/molecules/primaryCalender";
import { useState } from "react";

interface AgeGroupProps {
  onDateSelect?: (date: Date) => void;
}

const AgeGroup = ({ onDateSelect }: AgeGroupProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setShowCalendar(false);
    onDateSelect?.(selectedDate);
  };

  return (
    <div className="relative">
      <label className="block font-semibold mb-3">Date of Birth*</label>
      <input
        type="text"
        className="w-full cursor-pointer border border-dark/15 bg-light px-6 h-[60px] rounded-lg focus:outline-none focus:ring-1 focus:ring-primary relative"
        placeholder="DOB"
        value={date ? date.toLocaleDateString() : ""}
        readOnly
        onClick={() => setShowCalendar((prev) => !prev)}
      />
      <Icons.CalenderIcon className="size-6 absolute top-[55%] right-5" />

      <PrimaryCalender
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onConfirm={handleDateSelect}
      />
    </div>
  );
};

export default AgeGroup;

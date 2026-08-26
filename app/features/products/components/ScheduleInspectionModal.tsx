import { ModalShell } from "@/app/components/reusable/ModalSeel";
import { Calendar, ChevronDown, Clock, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface InspectionLocationOption {
  id: string;
  label: string;
}

export interface ScheduleInspectionPayload {
  date: string;
  time: string;
  locationId: string;
  note: string;
}

interface ScheduleInspectionModalProps {
  isOpen: boolean;
  productName?: string;
  sellerName?: string;
  locations?: InspectionLocationOption[];
  onClose: () => void;
  onConfirm: (payload: ScheduleInspectionPayload) => void;
}

const DEFAULT_LOCATIONS: InspectionLocationOption[] = [
  { id: "riddim-hq", label: "Riddim Africa HQ — Lagos Island" },
  { id: "city-suburbs", label: "City Suburbs & Hubs" },
  { id: "downtown-markets", label: "Downtown Markets" },
];

function formatDisplayDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function LocationDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (id: string) => void;
  options: InspectionLocationOption[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selected = options.find((o) => o.id === value);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20 cursor-pointer"
      >
        <span className={selected ? "text-[#101828]" : "text-gray-400"}>
          {selected ? selected.label : "Select a location"}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#377A7D] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-[#5F9597] bg-white shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-sm cursor-pointer hover:bg-[#EBF2F2] ${
                opt.id === value
                  ? "bg-[#EBF2F2] font-medium text-[#101828]"
                  : "text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ScheduleInspectionModal({
  isOpen,
  productName,
  sellerName,
  locations = DEFAULT_LOCATIONS,
  onClose,
  onConfirm,
}: ScheduleInspectionModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [locationId, setLocationId] = useState("");
  const [note, setNote] = useState("");

  const canConfirm =
    date.length > 0 && time.length > 0 && locationId.length > 0;
  const selectedLocation = locations.find((l) => l.id === locationId);
  const displayDate = formatDisplayDate(date);

  const resetAndClose = () => {
    setDate("");
    setTime("");
    setLocationId("");
    setNote("");
    onClose();
  };

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm({ date, time, locationId, note: note.trim() });
    resetAndClose();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Schedule Inspection"
      subtitle={[productName, sellerName].filter(Boolean).join(" · ")}
      maxWidthClassName="max-w-lg"
      roundedClassName="rounded-2xl"
    >
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5">
          Inspection Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 pr-10 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
          />
          <Calendar
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#377A7D]"
          />
        </div>
        {displayDate && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#787A7F] font-medium">
            <Calendar size={12} className="text-[#377A7D]" />
            {displayDate}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5">
          Inspection Time
        </label>
        <div className="relative">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 pr-10 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
          />
          <Clock
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#377A7D]"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5">
          Inspection Location
        </label>
        <LocationDropdown
          value={locationId}
          onChange={setLocationId}
          options={locations}
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5">
          Note to Seller (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="e.g. Please bring all product variants. Use rear entrance. Ask for Sarah at reception."
          className="w-full resize-none rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
        />
      </div>

      {(displayDate || selectedLocation) && (
        <div className="bg-[#E5B54F1A] border border-[#E5B54F4D] rounded-[8px] px-4 py-3 mb-6">
          <p className="flex items-center gap-1.5 text-sm font-medium text-[#E6A400] mb-1.5">
            <Calendar size={14} />
            Appointment Summary
          </p>
          {displayDate && (
            <p className="flex items-center gap-1.5 text-xs text-[#787A7F] font-medium leading-5">
              <Calendar size={12} className="text-[#377A7D]" />
              {displayDate}
            </p>
          )}
          {selectedLocation && (
            <p className="flex items-center gap-1.5 text-xs text-[#787A7F] font-medium leading-5">
              <MapPin size={12} className="text-[#377A7D]" />
              {selectedLocation.label}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="rounded-lg bg-[#E6A400] py-2.5 px-6 text-sm font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Schedule
        </button>
        <button
          onClick={resetAndClose}
          className="rounded-lg border border-gray-300 bg-white py-2.5 px-6 text-sm font-medium text-[#101828] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </ModalShell>
  );
}

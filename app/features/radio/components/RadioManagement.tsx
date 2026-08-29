"use client";

import PageHeader from "@/app/components/common/PageHeader";
import { RevenueAndCombination } from "@/app/features/dashboard/components/TrendChart";
import {
  LiveStat,
  LiveStatsCard,
} from "@/app/features/radio/components/LifeStatesCard";
import {
  RadioPlayerCard,
  RadioTrack,
} from "@/app/features/radio/components/RadioPlayCard";
import { useState } from "react";

const HOURLY_LISTENERS = [
  { label: "00:00", listeners: 520 },
  { label: "03:00", listeners: 900 },
  { label: "06:00", listeners: 640 },
  { label: "09:00", listeners: 720 },
  { label: "12:00", listeners: 800 },
  { label: "16:00", listeners: 1100 },
  { label: "20:00", listeners: 1350 },
  { label: "24:00", listeners: 1150 },
];

const INITIAL_TRACK: RadioTrack = {
  title: "Ye",
  artist: "Burna Boy",
  currentTime: "1:24",
  duration: "3:42",
  progressPercent: 38,
};

export default function RadioManagement() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(78);
  const [track] = useState<RadioTrack>(INITIAL_TRACK);

  const liveStats: LiveStat[] = [
    {
      label: "Current Listeners",
      value: "1,284",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M12 4.77301C11.96 4.76634 11.9133 4.76634 11.8733 4.77301C10.9533 4.73968 10.22 3.98634 10.22 3.05301C10.22 2.09968 10.9866 1.33301 11.94 1.33301C12.8933 1.33301 13.66 2.10634 13.66 3.05301C13.6533 3.98634 12.92 4.73968 12 4.77301Z"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.3133 9.62645C12.2267 9.77978 13.2333 9.61978 13.94 9.14645C14.88 8.51978 14.88 7.49312 13.94 6.86645C13.2267 6.39312 12.2067 6.23311 11.2933 6.39311"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.97995 4.77301C4.01995 4.76634 4.06661 4.76634 4.10661 4.77301C5.02661 4.73968 5.75995 3.98634 5.75995 3.05301C5.75995 2.09968 4.99328 1.33301 4.03995 1.33301C3.08661 1.33301 2.31995 2.10634 2.31995 3.05301C2.32661 3.98634 3.05995 4.73968 3.97995 4.77301Z"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.66663 9.62645C3.75329 9.77978 2.74663 9.61978 2.03996 9.14645C1.09996 8.51978 1.09996 7.49312 2.03996 6.86645C2.75329 6.39312 3.77329 6.23311 4.68663 6.39311"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.99997 9.75348C7.95997 9.74681 7.9133 9.74681 7.8733 9.75348C6.9533 9.72015 6.21997 8.96681 6.21997 8.03348C6.21997 7.08014 6.98664 6.31348 7.93997 6.31348C8.8933 6.31348 9.65997 7.08681 9.65997 8.03348C9.6533 8.96681 8.91997 9.72681 7.99997 9.75348Z"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.05998 11.8532C5.11998 12.4799 5.11998 13.5066 6.05998 14.1332C7.12665 14.8466 8.87331 14.8466 9.93998 14.1332C10.88 13.5066 10.88 12.4799 9.93998 11.8532C8.87998 11.1466 7.12665 11.1466 6.05998 11.8532Z"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconBgClassName: "bg-[#FFF0D2]",
      valueColorClassName: "text-[#E6A400]",
    },
    {
      label: "Stream Duration",
      value: "6h 42m",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M14.6667 7.99967C14.6667 11.6797 11.68 14.6663 8.00004 14.6663C4.32004 14.6663 1.33337 11.6797 1.33337 7.99967C1.33337 4.31967 4.32004 1.33301 8.00004 1.33301C11.68 1.33301 14.6667 4.31967 14.6667 7.99967Z"
            stroke="#3BB515"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.4733 10.1202L8.40663 8.88684C8.04663 8.6735 7.7533 8.16017 7.7533 7.74017V5.00684"
            stroke="#3BB515"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconBgClassName: "bg-[#3BB51533]",
      valueColorClassName: "text-[#23BA7D]",
    },
    {
      label: "Tracks Played",
      value: "74",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4.66671 6.33301C4.66671 7.25348 3.92052 7.99967 3.00004 7.99967C2.07957 7.99967 1.33337 7.25348 1.33337 6.33301C1.33337 5.41253 2.07957 4.66634 3.00004 4.66634C3.92052 4.66634 4.66671 5.41253 4.66671 6.33301ZM4.66671 6.33301V1.33301C4.88893 1.66634 5.06671 3.06634 6.66671 3.33301"
            stroke="#DB321C"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="7.00004"
            cy="12.9997"
            r="1.66667"
            stroke="#DB321C"
            strokeWidth="1.5"
          />
          <circle
            cx="13.3333"
            cy="12.0003"
            r="1.33333"
            stroke="#DB321C"
            strokeWidth="1.5"
          />
          <path
            d="M8.66663 13L8.66663 8C8.66663 7.11126 8.66663 6.66689 8.89124 6.39109C9.11585 6.11529 9.62834 6.00935 10.6533 5.79746C12.1653 5.48489 13.3152 4.874 14.0327 4.42362C14.3177 4.24473 14.4602 4.15529 14.5634 4.21237C14.6666 4.26944 14.6666 4.43391 14.6666 4.76283V11.9506"
            stroke="#DB321C"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.66663 8.66699C11.8666 8.66699 14 7.11144 14.6666 6.66699"
            stroke="#DB321C"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconBgClassName: "bg-[#D65A4A33]",
      valueColorClassName: "text-[#FD7562]",
    },
    {
      label: "Peak Today",
      value: "1,621",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M12 4.77301C11.96 4.76634 11.9133 4.76634 11.8733 4.77301C10.9533 4.73968 10.22 3.98634 10.22 3.05301C10.22 2.09968 10.9866 1.33301 11.94 1.33301C12.8933 1.33301 13.66 2.10634 13.66 3.05301C13.6533 3.98634 12.92 4.73968 12 4.77301Z"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.3133 9.62645C12.2267 9.77978 13.2333 9.61978 13.94 9.14645C14.88 8.51978 14.88 7.49312 13.94 6.86645C13.2267 6.39312 12.2067 6.23311 11.2933 6.39311"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.97995 4.77301C4.01995 4.76634 4.06661 4.76634 4.10661 4.77301C5.02661 4.73968 5.75995 3.98634 5.75995 3.05301C5.75995 2.09968 4.99328 1.33301 4.03995 1.33301C3.08661 1.33301 2.31995 2.10634 2.31995 3.05301C2.32661 3.98634 3.05995 4.73968 3.97995 4.77301Z"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.66663 9.62645C3.75329 9.77978 2.74663 9.61978 2.03996 9.14645C1.09996 8.51978 1.09996 7.49312 2.03996 6.86645C2.75329 6.39312 3.77329 6.23311 4.68663 6.39311"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.99997 9.75348C7.95997 9.74681 7.9133 9.74681 7.8733 9.75348C6.9533 9.72015 6.21997 8.96681 6.21997 8.03348C6.21997 7.08014 6.98664 6.31348 7.93997 6.31348C8.8933 6.31348 9.65997 7.08681 9.65997 8.03348C9.6533 8.96681 8.91997 9.72681 7.99997 9.75348Z"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.05998 11.8532C5.11998 12.4799 5.11998 13.5066 6.05998 14.1332C7.12665 14.8466 8.87331 14.8466 9.93998 14.1332C10.88 13.5066 10.88 12.4799 9.93998 11.8532C8.87998 11.1466 7.12665 11.1466 6.05998 11.8532Z"
            stroke="#E6A400"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconBgClassName: "bg-[#FFF0D2]",
      valueColorClassName: "text-[#7D7DF9]",
    },
  ];

  const handlePauseStream = () => setIsPlaying(false);
  const handleRestart = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <PageHeader
          title="Radio Management"
          description="Control the Riddim Africa live radio stream"
        />
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
          <span className="text-[#787A7F]">Airtime 9h 20m</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 mb-5">
        <RadioPlayerCard
          track={track}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onPrev={() => console.log("previous track")}
          onNext={() => console.log("next track")}
          volumePercent={volume}
          onVolumeChange={setVolume}
          onPauseStream={handlePauseStream}
          onRestart={handleRestart}
        />
        <LiveStatsCard stats={liveStats} />
      </div>

      <RevenueAndCombination
        title="Hourly Listeners"
        data={HOURLY_LISTENERS}
        series={[{ key: "listeners", label: "Listeners", color: "#2D6365" }]}
        live
        height={280}
      />
    </div>
  );
}

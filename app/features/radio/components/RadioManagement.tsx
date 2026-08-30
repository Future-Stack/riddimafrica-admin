"use client";

import StatusBadge from "@/app/components/common/button/StatusBadge";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import { RevenueAndCombination } from "@/app/features/dashboard/components/TrendChart";
import {
  LiveStat,
  LiveStatsCard,
} from "@/app/features/radio/components/LifeStatesCard";
import {
  RadioPlayerCard,
  RadioTrack,
} from "@/app/features/radio/components/RadioPlayCard";
import { Clock, Music, TrendingUp, Users } from "lucide-react";
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

const RadioManagement = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(78);
  const [track] = useState<RadioTrack>(INITIAL_TRACK);

  const liveStats: LiveStat[] = [
    {
      label: "Current Listeners",
      value: "1,284",
      icon: <Users size={16} strokeWidth={1.2} className="text-yellow" />,
      iconBgClassName: "bg-[#FFF0D2]",
      valueColorClassName: "text-yellow",
    },
    {
      label: "Stream Duration",
      value: "6h 42m",
      icon: <Clock size={16} strokeWidth={1.2} className="text-[#3BB515]" />,
      iconBgClassName: "bg-[#3BB51533]",
      valueColorClassName: "text-[#23BA7D]",
    },
    {
      label: "Tracks Played",
      value: "74",
      icon: <Music size={16} strokeWidth={1.2} className="text-[#DB321C]" />,
      iconBgClassName: "bg-[#D65A4A33]",
      valueColorClassName: "text-[#FD7562]",
    },
    {
      label: "Peak Today",
      value: "1,621",
      icon: <TrendingUp size={16} strokeWidth={1.2} className="text-yellow" />,
      iconBgClassName: "bg-[#FFF0D2]",
      valueColorClassName: "text-[#7D7DF9]",
    },
  ];

  const handlePauseStream = () => setIsPlaying(false);
  const handleRestart = () => {
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="Radio Management"
        description="Control the Riddim Africa live radio stream"
        extra={
          <div className="flex items-center gap-2 text-sm">
            <StatusBadge status="live" />
            <span className="text-[#787A7F]">Airtime 9h 20m</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
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
};

export default RadioManagement;

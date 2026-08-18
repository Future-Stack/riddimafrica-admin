import { Music2, SkipBack, SkipForward, Play, Pause, Volume2 } from "lucide-react";

export interface RadioTrack {
    title: string;
    artist: string;
    currentTime: string;
    duration: string;
    progressPercent: number; // 0-100
}

interface RadioPlayerCardProps {
    track: RadioTrack;
    isPlaying: boolean;
    onTogglePlay: () => void;
    onPrev: () => void;
    onNext: () => void;
    volumePercent: number;
    onVolumeChange: (percent: number) => void;
    onPauseStream: () => void;
    onRestart: () => void;
}

export function RadioPlayerCard({
    track,
    isPlaying,
    onTogglePlay,
    onPrev,
    onNext,
    volumePercent,
    onVolumeChange,
    onPauseStream,
    onRestart,
}: RadioPlayerCardProps) {
    return (
        <div className="bg-[#3E2413] rounded-2xl p-6 font-inter text-white h-full">
            <div className="flex items-center gap-3 mb-5">
                <span className="w-11 h-11 rounded-lg bg-[#4A3020] flex items-center justify-center shrink-0">
                    <Music2 size={18} className="text-white/80" />
                </span>
                <div>
                    <p className="text-sm font-semibold leading-5">{track.title}</p>
                    <p className="text-xs text-white/50 leading-4 mt-0.5">{track.artist}</p>
                </div>
            </div>

            {/* Track progress */}
            <div className="mb-2">
                <div className="h-1.5 w-full rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-[#E6A400]" style={{ width: `${track.progressPercent}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-white/50 mt-1.5">
                    <span>{track.currentTime}</span>
                    <span>{track.duration}</span>
                </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-6 mb-5">
                <button onClick={onPrev} className="text-white/70 hover:text-white cursor-pointer" aria-label="Previous track">
                    <SkipBack size={18} />
                </button>
                <button
                    onClick={onTogglePlay}
                    className="w-11 h-11 rounded-full bg-[#E6A400] flex items-center justify-center text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <button onClick={onNext} className="text-white/70 hover:text-white cursor-pointer" aria-label="Next track">
                    <SkipForward size={18} />
                </button>
            </div>

            {/* Volume + actions */}
            <div className="flex items-center gap-3 flex-wrap">
                <Volume2 size={16} className="text-white/60 shrink-0" />
                <div className="flex-1 min-w-[120px]">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volumePercent}
                        onChange={(e) => onVolumeChange(Number(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#E6A400]"
                        style={{
                            background: `linear-gradient(to right, #E6A400 ${volumePercent}%, rgba(255,255,255,0.15) ${volumePercent}%)`,
                        }}
                    />
                </div>
                <span className="text-xs text-white/60 w-9 text-right">{volumePercent}%</span>

                <button
                    onClick={onPauseStream}
                    className="rounded-lg bg-[#5A1F1F] border border-[#DB321C66] px-3.5 py-1.5 text-xs font-semibold text-[#FF6467] hover:bg-[#6B2424] transition-colors cursor-pointer whitespace-nowrap"
                >
                    Pause Stream
                </button>
                <button
                    onClick={onRestart}
                    className="rounded-lg bg-[#E6A400] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer whitespace-nowrap"
                >
                    Restart
                </button>
            </div>
        </div>
    );
}
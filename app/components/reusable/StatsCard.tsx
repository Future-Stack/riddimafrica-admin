import React from "react";
import Link from "next/link";

import { ReactNode } from "react";

export interface StatsCardHeaderProps {
    title: string;
    icon: ReactNode;
    iconBgColor?: string;
}

export interface StatsCardFooterProps {
    description?: ReactNode;
    actionText?: string;
    actionHref?: string;
    onActionClick?: () => void; 
}

export interface StatsCardProps {
    headerProps: StatsCardHeaderProps;
    footerProps?: StatsCardFooterProps;
    value: string | number;
    bgColor: string;
}


export const StatsCardHeader: React.FC<StatsCardHeaderProps> = ({
    title,
    icon,
    iconBgColor = "bg-white/10"
}) => {
    return (
        <div className="flex items-center justify-between w-full mb-4">
            <span className="text-sm font-medium tracking-wide text-[#E8D3B9] leading-5">
                {title}
            </span>
            <div className={`p-2 rounded-lg text-white flex items-center justify-center ${iconBgColor}`}>
                {icon}
            </div>
        </div>
    );
};


export const StatsCardFooter: React.FC<StatsCardFooterProps> = ({
    description,
    actionText,
    actionHref,
    onActionClick
}) => {
    const content = (
        <>
            {actionText}
            <span className="transform group-hover:translate-x-0.5 transition-transform"></span>
        </>
    );

    const baseButtonStyles = "flex items-center gap-1 font-medium text-[#E6A400] hover:text-amber-300 font-inter transition-colors group text-sm leading-6";

    return (
        <div className="flex items-center justify-between w-full pt-4   text-xs text-gray-400">
            <div className="flex items-center gap-1 font-medium leaidng-4 font-inter text-gray-400 text-xs">
                {description}
            </div>

            {actionHref ? (
                <Link href={actionHref} className={baseButtonStyles}>
                    {content}
                </Link>
            ) : (
                <button onClick={onActionClick} className={baseButtonStyles}>
                    {content}
                </button>
            )}
        </div>
    );
};


export const StatsCard: React.FC<StatsCardProps> = ({
    headerProps,
    footerProps,
    value,
    bgColor
}) => {
    return (
        <div className={`flex flex-col p-5 rounded-xl text-white shadow-lg min-w-[260px] flex-1 ${bgColor}`}>
            <StatsCardHeader {...headerProps} />

            <div className="mt-2">
                <h2 className="text-2xl font-bold font-fraunces tracking-tight md:text-3xl text-[#E6E8EB]">
                    {value}
                </h2>
            </div>

            {footerProps && (
                <div className="mt-4">
                    <StatsCardFooter {...footerProps} />
                </div>
            )}
        </div>
    );
};
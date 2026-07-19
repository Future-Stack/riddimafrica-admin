import React from 'react';


interface QuickAction {
    id: string;
    label: string;
    onClick: () => void;
    bgClass: string;
    textClass: string;
    borderClass: string;
}

interface ActivityItem {
    id: string;
    iconType: 'seller' | 'order' | 'artist';
    text: React.ReactNode;
    time: string;
    onView: () => void;
}

const QuickActionsPage: React.FC = () => {
    // --- Mock Data ---
    const quickActions: QuickAction[] = [
        {
            id: 'approve-sellers',
            label: 'Approve Sellers',
            onClick: () => console.log('Approve Sellers clicked'),
            bgClass: 'bg-[#E6A40033]',
            textClass: 'text-[#D99B26]',
            borderClass: 'border-[#E6A40033]',
        },
        {
            id: 'review-products',
            label: 'Review Products',
            onClick: () => console.log('Review Products clicked'),
            bgClass: 'bg-[#23BA7D33]',
            textClass: 'text-[#2E7D52]',
            borderClass: 'border-[#23BA7D33]',
        },
        {
            id: 'process-payouts',
            label: 'Process Payouts',
            onClick: () => console.log('Process Payouts clicked'),
            bgClass: 'bg-[#FD756233]',
            textClass: 'text-[#C96860]',
            borderClass: 'border-[#FD756233]',
        },
    ];

    const activities: ActivityItem[] = [
        {
            id: '1',
            iconType: 'seller',
            text: (
                <>
                    Seller <span className="font-semibold text-[#543D2B]">AfroBeatsNG </span> submitted 3 products
                </>
            ),
            time: '5m ago',
            onView: () => console.log('Viewing activity 1'),
        },
        {
            id: '2',
            iconType: 'order',
            text: (
                <>
                    Order <span className="font-semibold text-[#543D2B]">#ORD-3942</span> delivered to Lagos
                </>
            ),
            time: '22m ago',
            onView: () => console.log('Viewing activity 2'),
        },
        {
            id: '3',
            iconType: 'artist',
            text: (
                <>
                    Artist <span className="font-semibold text-[#543D2B]">Teni</span> profile approved
                </>
            ),
            time: '22m ago',
            onView: () => console.log('Viewing activity 3'),
        },
        {
            id: '4',
            iconType: 'order',
            text: (
                <>
                    Order <span className="font-semibold text-[#543D2B]">#ORD-3942</span> delivered to Lagos
                </>
            ),
            time: '22m ago',
            onView: () => console.log('Viewing activity 4'),
        },
        {
            id: '5',
            iconType: 'order',
            text: (
                <>
                    Order <span className="font-semibold text-[#543D2B]">#ORD-3942</span> delivered to Lagos
                </>
            ),
            time: '22m ago',
            onView: () => console.log('Viewing activity 5'),
        },
    ];

    // --- Helper to Render Custom SVG Icons ---
    const renderIcon = (type: 'seller' | 'order' | 'artist') => {
        const baseClass = "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#0E1716]";

        switch (type) {
            case 'seller':
                return (
                    <div className={baseClass}>
                        {/* Box/Package Icon */}
                        <svg className="w-5 h-5 text-[#E2A123]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                );
            case 'order':
                return (
                    <div className={baseClass}>
                        {/* Delivery Truck Icon */}
                        <svg className="w-5 h-5 text-[#00C875]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1v-4.5m0 4.5h4.5m-4.5-4.5H17l3 3.5V16a1 1 0 01-1 1h-1.5" />
                        </svg>
                    </div>
                );
            case 'artist':
                return (
                    <div className={baseClass}>
                        {/* User Check Icon */}
                        <svg className="w-5 h-5 text-[#00A86B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                );
        }
    };

    return (
        <div className=" h-full flex flex-col gap-6 w-full">

            {/* --- Quick Actions Section --- */}
            <section className="p-5 bg-[#FAF7F3] rounded-xl border border-[#E4E6E7]">
                <h2 className="text-base sm:text-lg font-medium leaidng-7 text-titleColor font-inter mb-5">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    {quickActions.map((action) => (
                        <button
                            key={action.id}
                            onClick={action.onClick}
                            className={`px-4 py-3 rounded-[6px] border font-medium text-base transition-transform active:scale-95 duration-150 flex-1 sm:flex-initial text-center ${action.bgClass} ${action.textClass} ${action.borderClass}`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* --- Recent Activity Section --- */}
            <section className="p-5 bg-[#FAF7F3] rounded-xl border border-[#E4E6E7] flex-1">
                <h2 className="text-base sm:text-lg font-medium leaidng-7 text-titleColor font-inter mb-4">Recent Activity</h2>

                <div className="flex flex-col gap-5">
                    {activities.map((item) => (
                        <div key={item.id} className="flex items-start justify-between gap-4 border-b border-[#F4EFE6] pb-4 last:border-b-0 last:pb-0">
                            <div className="flex items-start gap-4">
                                {renderIcon(item.iconType)}
                                <div className="flex flex-col">
                                    <p className="text-[#7A6D63] text-sm md:text-base leading-snug">
                                        {item.text}
                                    </p>
                                    <span className="text-[#A3968A] text-xs mt-1 font-normal">
                                        {item.time}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={item.onView}
                                className="text-[#D49827] font-medium text-sm hover:underline cursor-pointer focus:outline-none self-center"
                            >
                                view
                            </button>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default QuickActionsPage;
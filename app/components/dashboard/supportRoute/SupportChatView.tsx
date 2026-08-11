"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Mic, Paperclip, Send, ArrowLeft } from "lucide-react";
import { Ticket, TicketStatus } from "@/app/types/supportType";


interface SupportChatViewProps {
    activeTicket: Ticket;
    allTickets: Ticket[];
    onSelectTicket: (ticket: Ticket) => void;
    onBackToTable: () => void;
    onUpdateStatus: (ticketId: string, newStatus: TicketStatus) => void;
    onSendMessage: (ticketId: string, messageText: string) => void;
}

const STATUSES: TicketStatus[] = ["Open", "Pending", "Resolved", "Rejected"];

export function SupportChatView({
    activeTicket,
    allTickets,
    onSelectTicket,
    onBackToTable,
    onUpdateStatus,
    onSendMessage,
}: SupportChatViewProps) {
    const [tab, setTab] = useState<"Chat" | "Seller">("Chat");
    const [inputMessage, setInputMessage] = useState("");
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const handleSend = () => {
        if (!inputMessage.trim()) return;
        onSendMessage(activeTicket.id, inputMessage);
        setInputMessage("");
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#FAF7F3] p-6 overflow-hidden">
            {/* Sidebar / Chat List */}
            <div className="w-full lg:w-80 bg-white border-r border-gray-100 flex flex-col h-auto lg:h-full">
                {/* Back Button for mobile */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-2 lg:hidden">
                    <button onClick={onBackToTable} className="p-1 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <span className="font-bold text-sm text-[#3c182f]">Back to Tickets</span>
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="relative mb-5">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search here"
                            className="w-full pl-9 pr-4 py-3.5 bg-white border border-gray-50 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E6A40026] focus:border-transparent"
                        />
                    </div>

                    {/* Toggle Tabs */}
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setTab("Chat")}
                            className={`flex-1 py-3 text-xs font-medium rounded-full transition-colors cursor-pointer ${tab === "Chat" ? "bg-[#64284E] text-white" : "border border-[#3E2723] text-gray-700"
                                }`}
                        >
                            Chat (5)
                        </button>
                        <button
                            onClick={() => setTab("Seller")}
                            className={`flex-1 py-3 text-xs font-medium rounded-full transition-colors cursor-pointer ${tab === "Seller" ? "bg-[#64284E] text-white" : "border border-[#3E2723] text-gray-600"
                                }`}
                        >
                            Seller
                        </button>
                    </div>
                </div>

                {/* User Conversation List */}
                <div className="flex-1 overflow-y-auto px-2 space-y-1">
                    {allTickets.map((t) => {
                        const isActive = t.id === activeTicket.id;
                        return (
                            <div
                                key={t.id}
                                onClick={() => onSelectTicket(t)}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isActive ? "bg-[#f5ebd9]" : "hover:bg-gray-50"
                                    }`}
                            >
                                <div className="relative">
                                    <img
                                        src={t.userAvatar}
                                        alt={t.userName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-medium text-[#1A0D07] leading-6 truncate">{t.userName}</h4>
                                    <p className="text-[11px] text-gray-600 font-normal leading-4 truncate">{t.orderId}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Chat Conversation Panel */}
            <div className="flex-1 flex flex-col h-full bg-[#efefef]">
                {/* Chat Top Header */}
                <div className="bg-white p-4 flex items-center justify-between border-b border-[#C1D1D333]">
                    <div className="flex items-center gap-3">
                        <button onClick={onBackToTable} className="hidden lg:flex p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="w-9 h-9 rounded-full bg-[#fde68a] text-[#78350f] font-extrabold flex items-center justify-center text-xs">
                            {activeTicket.userName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-medium text-[#1A0D07] leading-6 ">{activeTicket.userName}</h3>
                                <span className="bg-[#2A5D5F] text-white text-[10px] font-normal px-1.5 py-0.5 rounded">
                                    {activeTicket.orderId}
                                </span>
                            </div>
                            <p className="text-xs text-gray-700 font-medium leading-4.5 line-clamp-1">{activeTicket.reason}</p>
                            <p className="text-[10px] text-gray-700 font-normal leading-4">{activeTicket.ticketId} • 20 Jun 2025, 10:14</p>
                        </div>
                    </div>

                    {/* Status Dropdown Filter */}
                    <div className="relative">
                        
                        <button
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            className="flex items-center gap-2 bg-[#64284E] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#4a1c3a] transition-colors cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M5.66659 13.4587H5.33325C2.66659 13.4587 1.33325 12.7503 1.33325 9.20866V5.66699C1.33325 2.83366 2.66659 1.41699 5.33325 1.41699H10.6666C13.3333 1.41699 14.6666 2.83366 14.6666 5.66699V9.20866C14.6666 12.042 13.3333 13.4587 10.6666 13.4587H10.3333C10.1266 13.4587 9.92658 13.5649 9.79992 13.742L8.79992 15.1587C8.35992 15.782 7.63992 15.782 7.19992 15.1587L6.19992 13.742C6.09325 13.5862 5.84659 13.4587 5.66659 13.4587Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.66675 5.66699H11.3334" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.66675 9.20801H8.66675" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            {activeTicket.status}
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {isStatusDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl p-1 z-30">
                                {STATUSES.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            onUpdateStatus(activeTicket.id, status);
                                            setIsStatusDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTicket.status === status
                                            ? "bg-[#64284E] text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F0F0F0] space-y-6">
                    {activeTicket.messages.map((msg) => {
                        const isAdmin = msg.sender === "admin";
                        return (
                            <div
                                key={msg.id}
                                className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${isAdmin ? "ml-auto flex-row-reverse" : ""
                                    }`}
                            >
                                <img
                                    src={
                                        isAdmin
                                            ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                            : activeTicket.userAvatar
                                    }
                                    alt={msg.senderName}
                                    className="w-8 h-8 rounded-full object-cover mt-1"
                                />
                                <div>
                                    <div
                                        className={`p-4 rounded-tl-[4px] rounded-[16px] text-xs sm:text-sm font-medium leading-relaxed shadow-sm ${isAdmin
                                            ? "bg-[#E6A400] text-white "
                                            : "bg-[#387C7E] text-[#E6E8EB] "
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    <p
                                        className={`text-xs text-[#787A7F] font-medium mt-1 ${isAdmin ? "text-right" : "text-left"
                                            }`}
                                    >
                                        {msg.senderName} • {msg.time}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Chat Message Input Footer */}
                <div className="px-10 pb-10 flex items-center gap-3">
                    <div className="flex-1 flex items-center bg-[#E9DFE6] p-2 rounded-xl">

                        {/* Mic Icon */}
                        <button className="p-2 text-gray-500 hover:text-black shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" stroke="#592346" stroke-width="1.5" />
                                <path d="M17 7H14M17 11H14" stroke="#592346" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9" stroke="#592346" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </button>

                        {/* Input */}
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type your reply..."
                            className="flex-1 min-w-0 bg-transparent border-none text-xs sm:text-sm text-[#787A7F] focus:outline-none px-4 py-5 font-normal leading-5"
                        />

                        {/* Attachment Icon */}
                        <button className="p-2 text-gray-500 hover:text-black shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3.5 8.23077V5.46154C3.5 3.54978 5.067 2 7 2C8.933 2 10.5 3.54978 10.5 5.46154L10.5 9.26923C10.5 10.2251 9.7165 11 8.75 11C7.7835 11 7 10.2251 7 9.26923L7 5.46154" stroke="#592346" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M12.5 2H12.7727C16.0339 2 17.6645 2 18.7969 2.79784C19.1214 3.02643 19.4094 3.29752 19.6523 3.60289C20.5 4.66867 20.5 6.20336 20.5 9.27273V11.8182C20.5 14.7814 20.5 16.2629 20.0311 17.4462C19.2772 19.3486 17.6829 20.8491 15.6616 21.5586C14.4044 22 12.8302 22 9.68182 22C7.88275 22 6.98322 22 6.26478 21.7478C5.10979 21.3424 4.19875 20.4849 3.76796 19.3979C3.5 18.7217 3.5 17.8751 3.5 16.1818V12" stroke="#592346" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.5 12C20.5 13.8409 19.0076 15.3333 17.1667 15.3333C16.5009 15.3333 15.716 15.2167 15.0686 15.3901C14.4935 15.5442 14.0442 15.9935 13.8901 16.5686C13.7167 17.216 13.8333 18.0009 13.8333 18.6667C13.8333 20.5076 12.3409 22 10.5 22" stroke="#592346" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={handleSend}
                        className="shrink-0 bg-[#64284E] text-white p-2.5 rounded-[12px] hover:bg-[#2e1224] transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
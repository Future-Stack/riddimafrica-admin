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
        <div className="flex flex-col lg:flex-row h-screen bg-[#faf8f5] overflow-hidden">
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
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search here"
                            className="w-full pl-9 pr-4 py-2 bg-[#f4f4f5] rounded-full text-xs text-gray-700 focus:outline-none"
                        />
                    </div>

                    {/* Toggle Tabs */}
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setTab("Chat")}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-colors ${tab === "Chat" ? "bg-[#3c182f] text-white" : "border border-gray-200 text-gray-600"
                                }`}
                        >
                            Chat (5)
                        </button>
                        <button
                            onClick={() => setTab("Seller")}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-colors ${tab === "Seller" ? "bg-[#3c182f] text-white" : "border border-gray-200 text-gray-600"
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
                                    <h4 className="text-xs font-bold text-gray-900 truncate">{t.userName}</h4>
                                    <p className="text-[11px] text-gray-400 truncate">{t.orderId}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Chat Conversation Panel */}
            <div className="flex-1 flex flex-col h-full bg-[#efefef]">
                {/* Chat Top Header */}
                <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button onClick={onBackToTable} className="hidden lg:flex p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="w-9 h-9 rounded-full bg-[#fde68a] text-[#78350f] font-extrabold flex items-center justify-center text-xs">
                            {activeTicket.userName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-gray-900">{activeTicket.userName}</h3>
                                <span className="bg-[#115e59] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    {activeTicket.orderId}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1">{activeTicket.reason}</p>
                            <p className="text-[10px] text-gray-400">{activeTicket.ticketId} • 20 Jun 2025, 10:14</p>
                        </div>
                    </div>

                    {/* Status Dropdown Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            className="flex items-center gap-2 bg-[#3c182f] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#2e1224] transition-colors"
                        >
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
                                                ? "bg-[#3c182f] text-white"
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
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
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
                                        className={`p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-sm ${isAdmin
                                                ? "bg-[#eab308] text-white rounded-tr-none"
                                                : "bg-[#2dd4bf] text-[#064e3b] rounded-tl-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    <p
                                        className={`text-[10px] text-gray-400 font-medium mt-1 ${isAdmin ? "text-right" : "text-left"
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
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-center gap-2 bg-[#f3e8ee] p-2 rounded-2xl">
                        <button className="p-2 text-gray-500 hover:text-black">
                            <Mic className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type your reply..."
                            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-gray-800 focus:outline-none px-2"
                        />
                        <button className="p-2 text-gray-500 hover:text-black">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSend}
                            className="bg-[#3c182f] text-white p-2.5 rounded-xl hover:bg-[#2e1224] transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
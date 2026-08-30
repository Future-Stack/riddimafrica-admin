"use client";

import CommonHeader from "@/app/components/common/header/CommonHeader";
import { Ticket, TicketStatus } from "@/app/types/supportType";
import {
  ArrowLeft,
  ChevronDown,
  MessageSquare,
  Mic,
  Paperclip,
  Search,
  Send,
} from "lucide-react";
import { useMemo, useState } from "react";

interface SupportChatViewProps {
  activeTicket: Ticket;
  allTickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
  onBackToTable: () => void;
  onUpdateStatus: (ticketId: string, newStatus: TicketStatus) => void;
  onSendMessage: (ticketId: string, messageText: string) => void;
}

const STATUSES: TicketStatus[] = ["Open", "Pending", "Resolved", "Rejected"];

export const SupportChatView = ({
  activeTicket,
  allTickets,
  onSelectTicket,
  onBackToTable,
  onUpdateStatus,
  onSendMessage,
}: SupportChatViewProps) => {
  const [tab, setTab] = useState<"Chat" | "Seller">("Chat");
  const [inputMessage, setInputMessage] = useState("");
  const [listSearch, setListSearch] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const filteredList = useMemo(() => {
    const q = listSearch.toLowerCase();
    return allTickets.filter((t) => {
      const matchesTab = tab === "Chat" ? t.type === "Chat" : t.type === "Seller";
      const matchesSearch =
        !q ||
        t.userName.toLowerCase().includes(q) ||
        t.orderId.toLowerCase().includes(q) ||
        t.ticketId.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [allTickets, tab, listSearch]);

  const chatCount = allTickets.filter((t) => t.type === "Chat").length;

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    onSendMessage(activeTicket.id, inputMessage);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[70vh] bg-white rounded-2xl border border-[#C4CDD566] overflow-hidden">
      <div className="w-full lg:w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onBackToTable}
            className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-gray" />
          </button>
          <CommonHeader size="sm" className="text-[#3c182f]! font-bold">
            Back to Tickets
          </CommonHeader>
        </div>

        <div className="p-4">
          <div className="relative mb-5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={listSearch}
              onChange={(e) => setListSearch(e.target.value)}
              placeholder="Search here"
              className="w-full pl-9 pr-4 py-3.5 bg-white border border-gray-100 rounded-full text-sm text-gray focus:outline-none focus:ring-2 focus:ring-[#E6A40026]"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab("Chat")}
              className={`flex-1 py-3 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                tab === "Chat"
                  ? "bg-[#64284E] text-white"
                  : "border border-[#3E2723] text-gray"
              }`}
            >
              Chat ({chatCount})
            </button>
            <button
              type="button"
              onClick={() => setTab("Seller")}
              className={`flex-1 py-3 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                tab === "Seller"
                  ? "bg-[#64284E] text-white"
                  : "border border-[#3E2723] text-gray-600"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
          {filteredList.map((t) => {
            const isActive = t.id === activeTicket.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTicket(t)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors text-left ${
                  isActive ? "bg-[#f5ebd9]" : "hover:bg-gray-50"
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
                  <CommonHeader
                    size="md"
                    className="text-[#1A0D07]! font-medium truncate"
                  >
                    {t.userName}
                  </CommonHeader>
                  <p className="text-[11px] text-gray-600 font-normal leading-4 truncate">
                    {t.orderId}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-[480px] bg-[#efefef]">
        <div className="bg-white p-4 flex items-center justify-between border-b border-[#C1D1D333] gap-3 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToTable}
              className="hidden lg:flex p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#fde68a] text-[#78350f] font-extrabold flex items-center justify-center text-xs shrink-0">
              {activeTicket.userName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <CommonHeader size="md" className="text-[#1A0D07]! font-medium">
                  {activeTicket.userName}
                </CommonHeader>
                <span className="bg-[#2A5D5F] text-white text-[10px] font-normal px-1.5 py-0.5 rounded">
                  {activeTicket.orderId}
                </span>
              </div>
              <p className="text-xs text-gray font-medium leading-4.5 line-clamp-1">
                {activeTicket.reason}
              </p>
              <p className="text-[10px] text-gray font-normal leading-4">
                {activeTicket.ticketId} · 20 Jun 2025, 10:14
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="flex items-center gap-2 bg-[#64284E] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#4a1c3a] transition-colors cursor-pointer"
            >
              <MessageSquare size={16} />
              {activeTicket.status}
              <ChevronDown className="w-4 h-4" />
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl p-1 z-30">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      onUpdateStatus(activeTicket.id, status);
                      setIsStatusDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      activeTicket.status === status
                        ? "bg-[#64284E] text-white"
                        : "text-gray hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F0F0F0] space-y-6">
          {activeTicket.messages.map((msg) => {
            const isAdmin = msg.sender === "admin";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${
                  isAdmin ? "ml-auto flex-row-reverse" : ""
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
                    className={`p-4 rounded-tl-[4px] rounded-[16px] text-xs sm:text-sm font-medium leading-relaxed shadow-sm ${
                      isAdmin
                        ? "bg-[#E6A400] text-white"
                        : "bg-[#387C7E] text-[#E6E8EB]"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p
                    className={`text-xs text-[#787A7F] font-medium mt-1 ${
                      isAdmin ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.senderName} · {msg.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 sm:px-10 pb-6 sm:pb-10 flex items-center gap-3">
          <div className="flex-1 flex items-center bg-[#E9DFE6] p-2 rounded-xl">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-black shrink-0 cursor-pointer"
            >
              <Mic size={24} className="text-[#592346]" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your reply..."
              className="flex-1 min-w-0 bg-transparent border-none text-xs sm:text-sm text-[#787A7F] focus:outline-none px-4 py-5 font-normal leading-5"
            />
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-black shrink-0 cursor-pointer"
            >
              <Paperclip size={24} className="text-[#592346]" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSend}
            className="shrink-0 bg-[#64284E] text-white p-2.5 rounded-[12px] hover:bg-[#2e1224] transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

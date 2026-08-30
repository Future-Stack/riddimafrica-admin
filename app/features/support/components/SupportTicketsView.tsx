"use client";

import { SupportChatView } from "@/app/features/support/components/SupportChatView";
import { SupportTicketsTable } from "@/app/features/support/components/SupportTicketTable";
import { INITIAL_TICKETS, Ticket, TicketStatus } from "@/app/types/supportType";
import { useState } from "react";

const SupportTicketsView = () => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  const handleUpdateStatus = (ticketId: string, newStatus: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t)),
    );

    if (activeTicket && activeTicket.id === ticketId) {
      setActiveTicket((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSendMessage = (ticketId: string, messageText: string) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "admin" as const,
      senderName: "Admin",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              messages: [...t.messages, newMessage],
              lastMessage: messageText,
            }
          : t,
      ),
    );

    if (activeTicket && activeTicket.id === ticketId) {
      setActiveTicket((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, newMessage],
              lastMessage: messageText,
            }
          : null,
      );
    }
  };

  return (
    <div className="space-y-6">
      {activeTicket ? (
        <SupportChatView
          activeTicket={activeTicket}
          allTickets={tickets}
          onSelectTicket={(ticket) => setActiveTicket(ticket)}
          onBackToTable={() => setActiveTicket(null)}
          onUpdateStatus={handleUpdateStatus}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <SupportTicketsTable
          tickets={tickets}
          onViewChat={(ticket) => setActiveTicket(ticket)}
        />
      )}
    </div>
  );
};

export default SupportTicketsView;

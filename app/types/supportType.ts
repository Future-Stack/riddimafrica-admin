export type TicketStatus = "Open" | "Pending" | "Resolved" | "Rejected";

export interface Message {
  id: string;
  sender: "user" | "admin";
  senderName: string;
  text: string;
  time: string;
  avatar?: string;
}

export interface Ticket {
  id: string;
  ticketId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  reason: string;
  orderId: string;
  media: string[];
  lastMessage: string;
  updated: string;
  status: TicketStatus;
  type: "Chat" | "Seller";
  messages: Message[];
}

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: "1",
    ticketId: "TKT-0040",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@email.com",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    reason: "I want to cancel my order — changed my mind",
    orderId: "ORD-3942",
    media: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&auto=format&fit=crop&q=80",
    ],
    lastMessage: "I've sent the photo via email. The label clearly says S but I ordered M.",
    updated: "22m ago",
    status: "Pending",
    type: "Chat",
    messages: [
      {
        id: "m1",
        sender: "user",
        senderName: "Sarah Johnson",
        text: "Hi, I just placed order ORD-3942 for a Hoodie + Cap but I want to cancel it. I placed it by mistake, can you help me?",
        time: "10:14",
      },
      {
        id: "m2",
        sender: "admin",
        senderName: "Admin",
        text: "Hi Sarah! I can see your order ORD-3942. It's currently at our office for packaging. Could you confirm you'd like us to cancel and process a full refund?",
        time: "10:22",
      },
    ],
  },
  {
    id: "2",
    ticketId: "TKT-0041",
    userName: "Jide Adewale",
    userEmail: "jide@email.com",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    reason: "I want to cancel my order — changed my mind",
    orderId: "ORD-3942",
    media: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&auto=format&fit=crop&q=80",
    ],
    lastMessage: "Is it too late to cancel?",
    updated: "22m ago",
    status: "Open",
    type: "Chat",
    messages: [
      {
        id: "m1",
        sender: "user",
        senderName: "Jide Adewale",
        text: "Hi, I just placed order ORD-3942 for a Hoodie + Cap but I want to cancel it. I placed it by mistake, can you help me?",
        time: "10:14",
      },
      {
        id: "m2",
        sender: "admin",
        senderName: "Admin",
        text: "Hi Jide! I can see your order ORD-3942. It's currently at our office for packaging. Could you confirm you'd like us to cancel and process a full refund?",
        time: "10:22",
      },
    ],
  },
  {
    id: "3",
    ticketId: "TKT-0042",
    userName: "Bill Kuphal",
    userEmail: "bill@email.com",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    reason: "Wrong item delivered",
    orderId: "ORD-3943",
    media: [],
    lastMessage: "Please respond to my query.",
    updated: "1h ago",
    status: "Rejected",
    type: "Chat",
    messages: [],
  },
  {
    id: "4",
    ticketId: "TKT-0043",
    userName: "Courtney Henry",
    userEmail: "courtney@email.com",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    reason: "Payment issue",
    orderId: "ORD-3944",
    media: [],
    lastMessage: "Thanks for the help!",
    updated: "3h ago",
    status: "Resolved",
    type: "Seller",
    messages: [],
  },
];
import {
  BarChart3,
  LayoutDashboard,
  Mic2,
  Package,
  Radio,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

export const DashboardIcon = () => (
  <LayoutDashboard size={20} strokeWidth={1.5} />
);

export const UsersIcon = () => <Users size={20} strokeWidth={1.5} />;

export const ArtistsIcon = () => <Mic2 size={20} strokeWidth={1.5} />;

export const SellersIcon = () => <ShoppingBag size={20} strokeWidth={1.5} />;

export const ProductsIcon = () => <Package size={20} strokeWidth={1.5} />;

export const OrderIcon = () => <ShoppingCart size={20} strokeWidth={1.5} />;

export const RadioIcon = () => <Radio size={20} strokeWidth={1.5} />;

export const RevenueIcon = () => <Wallet size={20} strokeWidth={1.5} />;

export const AnalyticsIcon = () => <BarChart3 size={20} strokeWidth={1.5} />;

export const SettingsIcon = () => <Settings size={20} strokeWidth={1.5} />;

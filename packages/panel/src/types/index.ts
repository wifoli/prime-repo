import { ReactNode } from 'react';
import { MenuItem as PrimeMenuItem } from 'primereact/menuitem';

// Extended MenuItem with PanelMenu features
export interface MenuItem extends Omit<PrimeMenuItem, 'items'> {
    label: string;
    icon?: string;
    path?: string;
    badge?: string | number;
    badgeSeverity?: 'success' | 'info' | 'warning' | 'danger';
    items?: MenuItem[];
    expanded?: boolean;
    disabled?: boolean;
    visible?: boolean;
    separator?: boolean;
    template?: (item: MenuItem) => ReactNode;
    className?: string;
    style?: React.CSSProperties;
    command?: (event?: any) => void;
    url?: string;
    target?: string;
}

export interface UserProfile {
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
}

export interface PanelConfig {
    appName: string;
    appLogo?: string;
    appLogoCollapsed?: string;
    menuItems: MenuItem[];
    userMenu?: MenuItem[];
    userProfile?: UserProfile;
    showFooter?: boolean;
    footerText?: string;
    theme?: 'light' | 'dark';
    sidebarWidth?: string;
    sidebarCollapsedWidth?: string;
    collapsible?: boolean;
}

export interface PanelContextType {
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    config: PanelConfig;
    activeItem: string | null;
    setActiveItem: (path: string | null) => void;
}

export interface PanelProviderProps {
    children: ReactNode;
    config: PanelConfig;
    defaultSidebarCollapsed?: boolean;
}

export interface LayoutProps {
    children: ReactNode;
}

export interface HeaderProps {
    showSearch?: boolean;
    showNotifications?: boolean;
    onSearchClick?: () => void;
    onNotificationClick?: () => void;
}

export interface SidebarProps {
    className?: string;
}

export interface FooterProps {
    className?: string;
}
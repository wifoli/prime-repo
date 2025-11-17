import { ReactNode } from 'react';

export interface MenuItem {
    label: string;
    icon?: string;
    path?: string;
    items?: MenuItem[];
    command?: () => void;
}

export interface PanelConfig {
    appName: string;
    appLogo?: string;
    menuItems: MenuItem[];
    userMenu?: MenuItem[];
    showFooter?: boolean;
    footerText?: string;
}

export interface PanelContextType {
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    config: PanelConfig;
}

export interface PanelProviderProps {
    children: ReactNode;
    config: PanelConfig;
    defaultSidebarCollapsed?: boolean;
}

export interface LayoutProps {
    children: ReactNode;
}
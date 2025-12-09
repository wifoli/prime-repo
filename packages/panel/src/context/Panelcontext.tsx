import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PanelContextType, PanelProviderProps, MenuItem } from '../types';

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider = ({
                                  children,
                                  config,
                                  defaultSidebarCollapsed = false
                              }: PanelProviderProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultSidebarCollapsed);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const location = useLocation();

    // Update active item based on current path
    useEffect(() => {
        const findActiveItem = (items: MenuItem[], path: string): string | null => {
            for (const item of items) {
                if (item.path === path) {
                    return item.path;
                }
                if (item.items) {
                    const found = findActiveItem(item.items, path);
                    if (found) return found;
                }
            }
            return null;
        };

        const active = findActiveItem(config.menuItems, location.pathname);
        setActiveItem(active);
    }, [location.pathname, config.menuItems]);

    const toggleSidebar = () => {
        setSidebarCollapsed(prev => !prev);
    };

    return (
        <PanelContext.Provider
            value={{
                sidebarCollapsed,
                toggleSidebar,
                setSidebarCollapsed,
                config,
                activeItem,
                setActiveItem
            }}
        >
            {children}
        </PanelContext.Provider>
    );
};

export const usePanelContext = () => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error('usePanelContext must be used within PanelProvider');
    }
    return context;
};
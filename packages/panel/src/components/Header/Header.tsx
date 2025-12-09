import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { classNames } from 'primereact/utils';
import { useRef } from 'react';
import { usePanelContext } from '../../context/PanelContext';
import { HeaderProps } from '../../types';

export const Header = ({
                           showSearch = false,
                           showNotifications = false,
                           onSearchClick,
                           onNotificationClick
                       }: HeaderProps) => {
    const { sidebarCollapsed, toggleSidebar, config } = usePanelContext();
    const userMenuRef = useRef<Menu>(null);

    const userMenuItems = config.userMenu?.map(item => ({
        ...item,
        command: (e: any) => {
            if (item.command) {
                item.command(e);
            }
        }
    }));

    return (
        <header className="panel-header sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Left section: Toggle + Logo + App Name */}
                <div className="flex items-center gap-4">
                    {config.collapsible !== false && (
                        <Button
                            icon={sidebarCollapsed ? 'pi pi-bars' : 'pi pi-times'}
                            onClick={toggleSidebar}
                            text
                            rounded
                            severity="secondary"
                            className="panel-header-toggle"
                            tooltip={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}

                    <div className="flex items-center gap-3">
                        {config.appLogo && (
                            <img
                                src={sidebarCollapsed && config.appLogoCollapsed
                                    ? config.appLogoCollapsed
                                    : config.appLogo
                                }
                                alt={config.appName}
                                className="h-8 w-auto object-contain"
                            />
                        )}
                        <h1 className="text-xl font-bold text-gray-900 m-0">
                            {config.appName}
                        </h1>
                    </div>
                </div>

                {/* Right section: Actions + User Menu */}
                <div className="flex items-center gap-2">
                    {/* Search Button */}
                    {showSearch && (
                        <Button
                            icon="pi pi-search"
                            onClick={onSearchClick}
                            text
                            rounded
                            severity="secondary"
                            tooltip="Buscar"
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}

                    {/* Notifications Button */}
                    {showNotifications && (
                        <Button
                            icon="pi pi-bell"
                            onClick={onNotificationClick}
                            text
                            rounded
                            severity="secondary"
                            tooltip="Notificações"
                            tooltipOptions={{ position: 'bottom' }}
                            className="p-overlay-badge"
                        >
                            <Badge value="3" severity="danger" />
                        </Button>
                    )}

                    {/* User Profile Menu */}
                    {config.userProfile && (
                        <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-medium text-gray-900">
                                    {config.userProfile.name}
                                </div>
                                {config.userProfile.role && (
                                    <div className="text-xs text-gray-600">
                                        {config.userProfile.role}
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={(e) => userMenuRef.current?.toggle(e)}
                                text
                                rounded
                                severity="secondary"
                                className="panel-header-user-menu"
                            >
                                {config.userProfile.avatar ? (
                                    <Avatar
                                        image={config.userProfile.avatar}
                                        shape="circle"
                                        size="normal"
                                    />
                                ) : (
                                    <Avatar
                                        icon="pi pi-user"
                                        shape="circle"
                                        size="normal"
                                        className="bg-blue-500 text-white"
                                    />
                                )}
                            </Button>

                            <Menu
                                model={userMenuItems}
                                popup
                                ref={userMenuRef}
                                className="panel-user-menu"
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
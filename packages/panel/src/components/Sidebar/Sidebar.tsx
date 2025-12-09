import { useNavigate } from 'react-router-dom';
import { PanelMenu } from 'primereact/panelmenu';
import { Badge } from 'primereact/badge';
import { classNames } from 'primereact/utils';
import { usePanelContext } from '../../context/PanelContext';
import { MenuItem, SidebarProps } from '../../types';

export const Sidebar = ({ className }: SidebarProps) => {
    const { sidebarCollapsed, config, activeItem } = usePanelContext();
    const navigate = useNavigate();

    // Transform menu items for PanelMenu
    const transformMenuItem = (item: MenuItem): MenuItem => {
        const isActive = item.path === activeItem;

        return {
            ...item,
            className: classNames(item.className, {
                'panel-menu-item-active': isActive,
            }),
            template: item.template || ((item) => {
                return (
                    <div className="flex items-center gap-3 w-full">
                        {item.icon && !sidebarCollapsed && (
                            <i className={classNames(item.icon, 'text-lg')} />
                        )}
                        {item.icon && sidebarCollapsed && (
                            <i className={classNames(item.icon, 'text-xl')} />
                        )}
                        {!sidebarCollapsed && (
                            <>
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <Badge
                                        value={item.badge}
                                        severity={item.badgeSeverity || 'info'}
                                    />
                                )}
                            </>
                        )}
                    </div>
                );
            }),
            command: (e) => {
                if (item.command) {
                    item.command(e);
                }
                if (item.path) {
                    navigate(item.path);
                }
            },
            items: item.items?.map(transformMenuItem),
        };
    };

    const menuModel = config.menuItems.map(transformMenuItem);

    return (
        <aside
            className={classNames(
                'panel-sidebar',
                'bg-white border-r border-gray-200 transition-all duration-300',
                {
                    'panel-sidebar-collapsed': sidebarCollapsed,
                    'panel-sidebar-expanded': !sidebarCollapsed,
                },
                className
            )}
            style={{
                width: sidebarCollapsed
                    ? config.sidebarCollapsedWidth || '80px'
                    : config.sidebarWidth || '280px'
            }}
        >
            <nav className="panel-sidebar-nav">
                <PanelMenu
                    model={menuModel}
                    className={classNames('panel-menu', {
                        'panel-menu-collapsed': sidebarCollapsed
                    })}
                    multiple={false}
                    pt={{
                        root: { className: 'border-none' },
                        panel: { className: 'mb-0' },
                        headerContent: { className: 'rounded-lg' },
                        content: { className: 'p-0' },
                        menuContent: { className: 'py-0' },
                        action: { className: 'rounded-lg transition-colors' }
                    }}
                />
            </nav>
        </aside>
    );
};
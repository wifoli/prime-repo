import { useNavigate, useLocation } from 'react-router-dom';
import { usePanelContext } from '../../context';
import { MenuItem } from '../../types';
import { classNames } from 'primereact/utils';

export const Sidebar = () => {
    const { sidebarCollapsed, config } = usePanelContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = (item: MenuItem) => {
        if (item.command) {
            item.command();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    const isActive = (item: MenuItem) => {
        return item.path === location.pathname;
    };

    const renderMenuItem = (item: MenuItem, index: number) => {
        const active = isActive(item);

        return (
            <div
                key={index}
                className={classNames('menu-item', { active })}
                onClick={() => handleMenuClick(item)}
                title={sidebarCollapsed ? item.label : undefined}
            >
                {item.icon && (
                    <i className={classNames('menu-item-icon', item.icon)} />
                )}
                {!sidebarCollapsed && (
                    <span className="menu-item-text">{item.label}</span>
                )}
            </div>
        );
    };

    return (
        <aside
            className={classNames(
                'panel-sidebar bg-white border-r border-gray-200',
                {
                    collapsed: sidebarCollapsed,
                    expanded: !sidebarCollapsed
                }
            )}
        >
            <nav className="py-4 px-2">
                <div className="flex flex-col gap-1">
                    {config.menuItems.map((item, index) => renderMenuItem(item, index))}
                </div>
            </nav>
        </aside>
    );
};
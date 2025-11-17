import { Button } from '@prime-repo/ui';
import { usePanelContext } from '../../context';

export const Header = () => {
    const { sidebarCollapsed, toggleSidebar, config } = usePanelContext();

    return (
        <header className="panel-header">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <Button
                        icon={sidebarCollapsed ? 'pi pi-bars' : 'pi pi-times'}
                        onClick={toggleSidebar}
                        variant="secondary"
                        size="small"
                        className="!p-2"
                        text
                        rounded
                    />

                    <div className="flex items-center gap-3">
                        {config.appLogo && (
                            <img
                                src={config.appLogo}
                                alt={config.appName}
                                className="h-8 w-8 object-contain"
                            />
                        )}
                        <h1 className="text-xl font-bold text-gray-800">
                            {config.appName}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {config.userMenu && config.userMenu.length > 0 && (
                        <div className="flex items-center gap-2">
                            {config.userMenu.map((item, index) => (
                                <Button
                                    key={index}
                                    icon={item.icon}
                                    label={item.label}
                                    onClick={item.command}
                                    variant="secondary"
                                    size="small"
                                    text
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
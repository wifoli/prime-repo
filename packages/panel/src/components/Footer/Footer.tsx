import { usePanelContext } from '../../context/PanelContext';
import { FooterProps } from '../../types';
import { classNames } from 'primereact/utils';

export const Footer = ({ className }: FooterProps) => {
    const { config } = usePanelContext();

    if (!config.showFooter) {
        return null;
    }

    const currentYear = new Date().getFullYear();
    const footerText = config.footerText || `© ${currentYear} ${config.appName}. All rights reserved.`;

    return (
        <footer className={classNames('panel-footer bg-white border-t border-gray-200', className)}>
            <div className="px-6 py-4">
                <p className="text-sm text-gray-600 text-center m-0">
                    {footerText}
                </p>
            </div>
        </footer>
    );
};
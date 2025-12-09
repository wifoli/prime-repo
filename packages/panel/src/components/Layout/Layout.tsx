import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import { LayoutProps } from '../../types';

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="panel-container min-h-screen flex flex-col">
            <Header />

            <div className="panel-main flex flex-1">
                <Sidebar />

                <main className="panel-content flex-1 p-6 overflow-auto bg-gray-50">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
};
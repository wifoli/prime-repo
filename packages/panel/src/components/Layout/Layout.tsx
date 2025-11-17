import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import { LayoutProps } from '../../types';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="panel-container">
      <Header />

      <div className="panel-main">
        <Sidebar />

        <main className="panel-content">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};
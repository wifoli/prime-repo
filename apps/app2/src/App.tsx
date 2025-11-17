import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PanelProvider, Layout, PanelConfig } from '@prime-repo/panel';
import { Home, Products, About } from './pages';
import '@prime-repo/ui/styles.css';
import '@prime-repo/panel/styles.css';

const panelConfig: PanelConfig = {
    appName: 'App2',
    menuItems: [
        {
            label: 'Home',
            icon: 'pi pi-home',
            path: '/'
        },
        {
            label: 'Products',
            icon: 'pi pi-shopping-cart',
            path: '/products'
        },
        {
            label: 'About',
            icon: 'pi pi-info-circle',
            path: '/about'
        }
    ],
    userMenu: [
        {
            label: 'Account',
            icon: 'pi pi-user',
            command: () => alert('Account clicked')
        },
        {
            label: 'Help',
            icon: 'pi pi-question-circle',
            command: () => alert('Help clicked')
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => alert('Logout clicked')
        }
    ],
    showFooter: true,
    footerText: '© 2024 App2 - Prime Repo. All rights reserved.'
};

function App() {
    return (
        <BrowserRouter>
            <PanelProvider config={panelConfig}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Layout>
            </PanelProvider>
        </BrowserRouter>
    );
}

export default App;
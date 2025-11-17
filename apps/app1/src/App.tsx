import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PanelProvider, Layout, PanelConfig } from '@prime-repo/panel';
import { Dashboard, Users, Settings } from './pages';
import '@prime-repo/ui/styles.css';
import '@prime-repo/panel/styles.css';

const panelConfig: PanelConfig = {
    appName: 'App1',
    menuItems: [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            path: '/'
        },
        {
            label: 'Users',
            icon: 'pi pi-users',
            path: '/users'
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            path: '/settings'
        }
    ],
    userMenu: [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => alert('Profile clicked')
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => alert('Logout clicked')
        }
    ],
    showFooter: true,
    footerText: '© 2024 App1 - Prime Repo. All rights reserved.'
};

function App() {
    return (
        <BrowserRouter>
            <PanelProvider config={panelConfig}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Layout>
            </PanelProvider>
        </BrowserRouter>
    );
}

export default App;
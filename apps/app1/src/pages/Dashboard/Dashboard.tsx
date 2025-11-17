import { Card, Button } from '@prime-repo/ui';

export const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard - App1</h1>
                <p className="text-gray-600">Welcome to your dashboard with PrimeReact and Tailwind v4</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card
                    title="Total Users"
                    subTitle="Active users in the system"
                    elevated
                    className="!p-6"
                >
                    <div className="text-4xl font-bold text-blue-600 my-4">1,234</div>
                    <Button
                        label="View Details"
                        icon="pi pi-arrow-right"
                        variant="primary"
                        size="small"
                        iconPos="right"
                    />
                </Card>

                <Card
                    title="Revenue"
                    subTitle="Monthly revenue"
                    elevated
                    className="!p-6"
                >
                    <div className="text-4xl font-bold text-green-600 my-4">$45.2K</div>
                    <Button
                        label="View Report"
                        icon="pi pi-chart-line"
                        variant="success"
                        size="small"
                        iconPos="right"
                    />
                </Card>

                <Card
                    title="Tasks"
                    subTitle="Pending tasks"
                    elevated
                    className="!p-6"
                >
                    <div className="text-4xl font-bold text-orange-600 my-4">23</div>
                    <Button
                        label="View Tasks"
                        icon="pi pi-list"
                        variant="warning"
                        size="small"
                        iconPos="right"
                    />
                </Card>
            </div>

            <Card
                title="Quick Actions"
                elevated
                className="!p-6"
            >
                <div className="flex flex-wrap gap-3">
                    <Button label="New User" icon="pi pi-user-plus" variant="primary" />
                    <Button label="Generate Report" icon="pi pi-file" variant="secondary" />
                    <Button label="Settings" icon="pi pi-cog" variant="info" />
                    <Button label="Help" icon="pi pi-question-circle" variant="secondary" />
                </div>
            </Card>
        </div>
    );
};
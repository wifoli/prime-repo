import { Card, Button, Input } from '@prime-repo/ui';
import { useState } from 'react';

export const Settings = () => {
    const [appName, setAppName] = useState('App1');
    const [apiUrl, setApiUrl] = useState('https://api.example.com');
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
                <p className="text-gray-600">Configure your application preferences</p>
            </div>

            <Card
                title="General Settings"
                subTitle="Basic application configuration"
                elevated
                className="!p-6"
            >
                <div className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Application Name
                        </label>
                        <Input
                            fullWidth
                            value={appName}
                            onChange={(e) => setAppName(e.target.value)}
                            placeholder="Enter application name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            API URL
                        </label>
                        <Input
                            fullWidth
                            value={apiUrl}
                            onChange={(e) => setApiUrl(e.target.value)}
                            placeholder="Enter API URL"
                            helperText="Base URL for API requests"
                        />
                    </div>
                </div>
            </Card>

            <Card
                title="Notification Preferences"
                subTitle="Manage notification settings"
                elevated
                className="!p-6"
            >
                <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-800">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                        </div>
                        <Button
                            label={notifications ? 'Enabled' : 'Disabled'}
                            variant={notifications ? 'success' : 'secondary'}
                            size="small"
                            onClick={() => setNotifications(!notifications)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-800">Desktop Notifications</p>
                            <p className="text-sm text-gray-600">Show desktop notifications</p>
                        </div>
                        <Button
                            label="Disabled"
                            variant="secondary"
                            size="small"
                        />
                    </div>
                </div>
            </Card>

            <div className="flex justify-end gap-3">
                <Button
                    label="Cancel"
                    variant="secondary"
                    icon="pi pi-times"
                />
                <Button
                    label="Save Changes"
                    variant="primary"
                    icon="pi pi-check"
                    onClick={handleSave}
                />
            </div>
        </div>
    );
};
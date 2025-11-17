import { useState } from 'react';
import { Card, Input, Button } from '@prime-repo/ui';

export const Users = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        // Simple email validation
        setEmailError(value.length > 0 && !value.includes('@'));
    };

    const handleSubmit = () => {
        if (!emailError && name && email) {
            alert(`User created: ${name} (${email})`);
            setName('');
            setEmail('');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Users Management</h1>
                <p className="text-gray-600">Manage your application users</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card
                    title="Create New User"
                    subTitle="Add a new user to the system"
                    elevated
                    className="!p-6"
                >
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <Input
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter user name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <Input
                                fullWidth
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter email address"
                                error={emailError}
                                helperText={emailError ? 'Please enter a valid email' : ''}
                            />
                        </div>

                        <Button
                            label="Create User"
                            icon="pi pi-user-plus"
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={!name || !email || emailError}
                        />
                    </div>
                </Card>

                <Card
                    title="User Statistics"
                    subTitle="Current user metrics"
                    elevated
                    className="!p-6"
                >
                    <div className="space-y-4 mt-4">
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-blue-600">1,234</p>
                            </div>
                            <i className="pi pi-users text-4xl text-blue-600"></i>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600">Active Users</p>
                                <p className="text-2xl font-bold text-green-600">987</p>
                            </div>
                            <i className="pi pi-check-circle text-4xl text-green-600"></i>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600">Pending Approval</p>
                                <p className="text-2xl font-bold text-orange-600">47</p>
                            </div>
                            <i className="pi pi-clock text-4xl text-orange-600"></i>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
import { Card, Button } from '@prime-repo/ui';

export const Home = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to App2</h1>
                <p className="text-gray-600">A different application using the same components</p>
            </div>

            <Card
                title="Getting Started"
                subTitle="Quick introduction to App2"
                elevated
                className="!p-6"
            >
                <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                        This is App2, demonstrating how multiple applications can share the same UI components
                        and panel layout while maintaining their own unique content and styling.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Built with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>React 18 with TypeScript</li>
                        <li>PrimeReact UI Components</li>
                        <li>Tailwind CSS v4</li>
                        <li>Vite for fast development</li>
                        <li>Shared @prime-repo/ui components</li>
                        <li>Shared @prime-repo/panel layout</li>
                    </ul>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    title="Fast Development"
                    elevated
                    className="!p-6"
                >
                    <div className="text-center">
                        <i className="pi pi-bolt text-6xl text-yellow-500 mb-4"></i>
                        <p className="text-gray-600">
                            Hot Module Replacement for instant feedback during development
                        </p>
                    </div>
                </Card>

                <Card
                    title="Shared Components"
                    elevated
                    className="!p-6"
                >
                    <div className="text-center">
                        <i className="pi pi-share-alt text-6xl text-blue-500 mb-4"></i>
                        <p className="text-gray-600">
                            Reusable components across all applications in the monorepo
                        </p>
                    </div>
                </Card>

                <Card
                    title="Type Safety"
                    elevated
                    className="!p-6"
                >
                    <div className="text-center">
                        <i className="pi pi-shield text-6xl text-green-500 mb-4"></i>
                        <p className="text-gray-600">
                            Full TypeScript support for better development experience
                        </p>
                    </div>
                </Card>
            </div>

            <Card
                title="Actions"
                elevated
                className="!p-6"
            >
                <div className="flex flex-wrap gap-3">
                    <Button label="View Products" icon="pi pi-shopping-cart" variant="primary" />
                    <Button label="Learn More" icon="pi pi-info-circle" variant="info" />
                    <Button label="Contact Us" icon="pi pi-envelope" variant="secondary" />
                </div>
            </Card>
        </div>
    );
};
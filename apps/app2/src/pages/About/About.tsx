import { Card } from '@prime-repo/ui';

export const About = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">About Us</h1>
                <p className="text-gray-600">Learn more about our mission and values</p>
            </div>

            <Card
                title="Our Mission"
                elevated
                className="!p-6"
            >
                <p className="text-gray-700 text-lg leading-relaxed">
                    We're building the next generation of web applications using modern technologies
                    and best practices. Our monorepo architecture allows us to share code efficiently
                    while maintaining independence between applications.
                </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                    title="Innovation"
                    elevated
                    className="!p-6"
                >
                    <div className="space-y-3">
                        <i className="pi pi-lightbulb text-5xl text-yellow-500"></i>
                        <p className="text-gray-700">
                            We constantly explore new technologies and methodologies to deliver
                            the best possible solutions to our users.
                        </p>
                    </div>
                </Card>

                <Card
                    title="Quality"
                    elevated
                    className="!p-6"
                >
                    <div className="space-y-3">
                        <i className="pi pi-star text-5xl text-blue-500"></i>
                        <p className="text-gray-700">
                            Quality is at the heart of everything we do. We ensure our code is
                            maintainable, tested, and follows industry standards.
                        </p>
                    </div>
                </Card>

                <Card
                    title="Collaboration"
                    elevated
                    className="!p-6"
                >
                    <div className="space-y-3">
                        <i className="pi pi-users text-5xl text-green-500"></i>
                        <p className="text-gray-700">
                            We believe in the power of teamwork and open communication to
                            achieve remarkable results together.
                        </p>
                    </div>
                </Card>

                <Card
                    title="Efficiency"
                    elevated
                    className="!p-6"
                >
                    <div className="space-y-3">
                        <i className="pi pi-gauge text-5xl text-purple-500"></i>
                        <p className="text-gray-700">
                            Our monorepo structure and shared components enable rapid
                            development without sacrificing quality.
                        </p>
                    </div>
                </Card>
            </div>

            <Card
                title="Technology Stack"
                elevated
                className="!p-6"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <i className="pi pi-code text-3xl text-blue-600 mb-2"></i>
                        <p className="font-medium">React 18</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <i className="pi pi-file text-3xl text-blue-600 mb-2"></i>
                        <p className="font-medium">TypeScript</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <i className="pi pi-palette text-3xl text-blue-600 mb-2"></i>
                        <p className="font-medium">Tailwind v4</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <i className="pi pi-box text-3xl text-blue-600 mb-2"></i>
                        <p className="font-medium">Turborepo</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
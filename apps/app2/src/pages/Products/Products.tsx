import { Card, Button } from '@prime-repo/ui';

const products = [
    {
        id: 1,
        name: 'Premium Package',
        price: '$99.99',
        description: 'Full access to all features',
        features: ['Unlimited users', '24/7 Support', 'Advanced analytics', 'Custom branding'],
        color: 'blue'
    },
    {
        id: 2,
        name: 'Standard Package',
        price: '$49.99',
        description: 'Perfect for small teams',
        features: ['Up to 10 users', 'Email support', 'Basic analytics', 'Standard features'],
        color: 'green'
    },
    {
        id: 3,
        name: 'Starter Package',
        price: '$19.99',
        description: 'Get started quickly',
        features: ['Up to 3 users', 'Community support', 'Basic features', 'Limited storage'],
        color: 'orange'
    }
];

export const Products = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
                <p className="text-gray-600">Choose the perfect plan for your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        title={product.name}
                        subTitle={product.description}
                        elevated
                        className="!p-6"
                    >
                        <div className="space-y-4 mt-4">
                            <div className={`text-4xl font-bold text-${product.color}-600`}>
                                {product.price}
                                <span className="text-base font-normal text-gray-600">/month</span>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-gray-700">
                                            <i className={`pi pi-check text-${product.color}-600`}></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                label="Choose Plan"
                                icon="pi pi-arrow-right"
                                variant={product.color === 'blue' ? 'primary' : product.color === 'green' ? 'success' : 'warning'}
                                iconPos="right"
                                className="w-full"
                            />
                        </div>
                    </Card>
                ))}
            </div>

            <Card
                title="Need Help Choosing?"
                subTitle="Contact our sales team"
                elevated
                className="!p-6"
            >
                <p className="text-gray-700 mb-4">
                    Not sure which plan is right for you? Our team is here to help you find the perfect solution.
                </p>
                <div className="flex gap-3">
                    <Button label="Contact Sales" icon="pi pi-phone" variant="primary" />
                    <Button label="Schedule Demo" icon="pi pi-calendar" variant="secondary" />
                </div>
            </Card>
        </div>
    );
};
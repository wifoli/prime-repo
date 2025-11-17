import { Card as PrimeCard, CardProps as PrimeCardProps } from 'primereact/card';
import { classNames } from 'primereact/utils';

export interface CardProps extends PrimeCardProps {
    elevated?: boolean;
    bordered?: boolean;
}

export const Card = ({
                         elevated = true,
                         bordered = false,
                         className,
                         ...props
                     }: CardProps) => {
    return (
        <PrimeCard
            {...props}
            className={classNames(
                'bg-white rounded-lg transition-shadow duration-200',
                {
                    'card-shadow hover:shadow-lg': elevated,
                    'border border-gray-200': bordered,
                },
                className
            )}
        />
    );
};
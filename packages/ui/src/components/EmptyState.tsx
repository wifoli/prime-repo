import { ReactNode } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { VStack } from './layouts/Stack.tsx';
import { Typography } from './Typography';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  children?: ReactNode;
}

/**
 * EmptyState component for empty data scenarios
 */
export function EmptyState({
  icon = 'pi pi-inbox',
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  return (
    <Card className="!p-12">
      <VStack spacing={4} align="center">
        <i className={`${icon} text-6xl text-gray-400`}></i>
        
        <VStack spacing={2} align="center">
          <Typography variant="h4" color="secondary" align="center">
            {title}
          </Typography>
          
          {description && (
            <Typography variant="body2" color="muted" align="center" className="max-w-md">
              {description}
            </Typography>
          )}
        </VStack>

        {action && (
          <Button
            label={action.label}
            icon={action.icon}
            onClick={action.onClick}
            variant="primary"
          />
        )}

        {children}
      </VStack>
    </Card>
  );
}

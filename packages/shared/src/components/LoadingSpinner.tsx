import { ProgressSpinner } from 'primereact/progressspinner';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  message?: string;
}

/**
 * Loading spinner component
 */
export function LoadingSpinner({
  size = 'medium',
  fullScreen = false,
  message,
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: '30px',
    medium: '50px',
    large: '80px',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <ProgressSpinner
        style={{ width: sizeMap[size], height: sizeMap[size] }}
        strokeWidth="4"
      />
      {message && (
        <p className="text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
}

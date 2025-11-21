import { Component, ReactNode, ErrorInfo } from 'react';
import { Card, Button } from '@prime-repo/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Component to catch errors in React tree
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
          <Card className="max-w-md w-full">
            <div className="text-center space-y-4">
              <i className="pi pi-exclamation-triangle text-6xl text-red-500"></i>
              <h2 className="text-2xl font-bold text-gray-800">Algo deu errado</h2>
              <p className="text-gray-600">
                Ocorreu um erro inesperado. Por favor, tente novamente.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-4 p-4 bg-gray-100 rounded text-left">
                  <p className="font-mono text-sm text-red-600">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              <Button
                label="Tentar Novamente"
                icon="pi pi-refresh"
                onClick={this.handleReset}
                variant="primary"
              />
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

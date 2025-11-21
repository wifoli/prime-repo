import { Component, ReactNode, ErrorInfo } from 'react';
import { logger } from '../core/Logger';

interface ErrorBoundaryLoggerProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryLoggerState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary with automatic logging
 */
export class ErrorBoundaryLogger extends Component<ErrorBoundaryLoggerProps, ErrorBoundaryLoggerState> {
  constructor(props: ErrorBoundaryLoggerProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryLoggerState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to logger
    logger.error('React ErrorBoundary caught error', error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });

    // Call custom handler
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

/**
 * Hook to log errors
 */
export function useLogger() {
  const logError = (message: string, error?: Error, context?: Record<string, any>) => {
    logger.error(message, error, context);
  };

  const logInfo = (message: string, context?: Record<string, any>) => {
    logger.info(message, context);
  };

  const logWarn = (message: string, context?: Record<string, any>) => {
    logger.warn(message, context);
  };

  const logDebug = (message: string, context?: Record<string, any>) => {
    logger.debug(message, context);
  };

  return {
    logError,
    logInfo,
    logWarn,
    logDebug,
    logger,
  };
}

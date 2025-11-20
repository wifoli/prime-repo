import { format, formatDistance, formatRelative, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Format date with pattern
export function formatDate(
  date: Date | string,
  pattern: string = 'dd/MM/yyyy'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Data inválida';
  }
  
  return format(dateObj, pattern, { locale: ptBR });
}

// Format date and time
export function formatDateTime(date: Date | string): string {
  return formatDate(date, "dd/MM/yyyy 'às' HH:mm");
}

// Format only time
export function formatTime(date: Date | string): string {
  return formatDate(date, 'HH:mm:ss');
}

// Format relative time (ex: "há 2 dias")
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Data inválida';
  }
  
  return formatDistance(dateObj, new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}

// Format relative with base date
export function formatRelativeDate(date: Date | string, baseDate: Date = new Date()): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Data inválida';
  }
  
  return formatRelative(dateObj, baseDate, { locale: ptBR });
}

// Format to ISO string
export function formatISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return '';
  }
  
  return dateObj.toISOString();
}

// Parse date string
export function parseDate(dateString: string): Date | null {
  const date = parseISO(dateString);
  return isValid(date) ? date : null;
}

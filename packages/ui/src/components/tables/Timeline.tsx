import { Timeline as PrimeTimeline, TimelineProps as PrimeTimelineProps } from 'primereact/timeline';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface TimelineEvent {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  [key: string]: any;
}

export interface TimelineProps extends Omit<PrimeTimelineProps, 'value'> {
  value: TimelineEvent[];
  align?: 'left' | 'right' | 'alternate' | 'top' | 'bottom';
  layout?: 'vertical' | 'horizontal';
  marker?: (item: TimelineEvent) => ReactNode;
  content?: (item: TimelineEvent) => ReactNode;
  opposite?: (item: TimelineEvent) => ReactNode;
  className?: string;
}

/**
 * Timeline - Linha do tempo de eventos
 * Use para mostrar sequência cronológica de eventos
 * 
 * @example
 * const events = [
 *   { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
 *   { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
 *   { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
 *   { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
 * ];
 * 
 * <Timeline
 *   value={events}
 *   align="alternate"
 *   content={(item) => <div>{item.status}</div>}
 *   opposite={(item) => <small>{item.date}</small>}
 * />
 */
export function Timeline({
  value,
  align = 'left',
  layout = 'vertical',
  marker,
  content,
  opposite,
  className,
  ...props
}: TimelineProps) {
  const defaultMarker = (item: TimelineEvent) => (
    <span 
      className="flex items-center justify-center w-8 h-8 rounded-full z-10 shadow"
      style={{ backgroundColor: item.color || '#3B82F6' }}
    >
      {item.icon && <i className={`${item.icon} text-white`}></i>}
      {item.image && <img src={item.image} alt={item.status} className="w-full h-full rounded-full object-cover" />}
    </span>
  );

  return (
    <PrimeTimeline
      value={value}
      align={align}
      layout={layout}
      marker={marker || defaultMarker}
      content={content}
      opposite={opposite}
      className={classNames('timeline-wrapper', className)}
      {...props}
    />
  );
}

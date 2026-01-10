import { AutoComplete as PrimeAutoComplete, AutoCompleteProps as PrimeAutoCompleteProps } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';
import { ReactNode, useState } from 'react';

export interface AutoCompleteOption {
    label: string;
    value: any;
}

export interface AutoCompleteProps extends Omit<PrimeAutoCompleteProps, 'onChange' | 'suggestions' | 'completeMethod'> {
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
    label?: string;
    required?: boolean;
    startAddon?: ReactNode;
    endAddon?: ReactNode;
    onChange?: (value: any) => void;
    // Local data
    options?: AutoCompleteOption[];
    // API fetch
    onSearch?: (query: string) => Promise<AutoCompleteOption[]>;
    minSearchLength?: number;
    searchDelay?: number;
}

export const AutoComplete = ({
                                 fullWidth = false,
                                 error = false,
                                 helperText,
                                 label,
                                 required = false,
                                 className,
                                 id,
                                 startAddon,
                                 endAddon,
                                 onChange,
                                 options = [],
                                 onSearch,
                                 minSearchLength = 1,
                                 searchDelay = 300,
                                 placeholder = 'Buscar...',
                                 emptyMessage = 'Nenhum resultado encontrado',
                                 ...props
                             }: AutoCompleteProps) => {
    const inputId = id || `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
    const [suggestions, setSuggestions] = useState<AutoCompleteOption[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        if (onChange) {
            onChange(e.value);
        }
    };

    const search = async (event: any) => {
        const query = event.query || '';

        // Check min length
        if (query.length < minSearchLength) {
            setSuggestions([]);
            return;
        }

        // If API search is provided
        if (onSearch) {
            setLoading(true);
            try {
                const results = await onSearch(query);
                setSuggestions(results);
            } catch (error) {
                console.error('AutoComplete search error:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        } else {
            // Local filter
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
        }
    };

    const autoCompleteElement = (
        <PrimeAutoComplete
            {...props}
            inputId={inputId}
            value={props.value}
            onChange={handleChange}
            suggestions={suggestions}
            completeMethod={search}
            placeholder={placeholder}
            emptyMessage={loading ? 'Buscando...' : emptyMessage}
            delay={searchDelay}
            className={classNames(
                'transition-colors duration-200',
                {
                    'w-full': fullWidth,
                },
                className
            )}
            inputClassName={classNames(
                'px-3 py-2 border rounded-md transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                {
                    'w-full': fullWidth,
                    'border-red-500 focus:ring-red-500': error,
                    'border-gray-300 hover:border-gray-400': !error,
                }
            )}
            panelClassName="shadow-lg border border-gray-200"
        />
    );

    return (
        <div className={classNames('flex flex-col gap-1', { 'w-full': fullWidth })}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {(startAddon || endAddon) ? (
                <div className={classNames('flex items-center gap-2', { 'w-full': fullWidth })}>
                    {startAddon}
                    <div className="flex-1">
                        {autoCompleteElement}
                    </div>
                    {endAddon}
                </div>
            ) : (
                autoCompleteElement
            )}

            {helperText && (
                <span className={classNames('text-sm', {
                    'text-red-500': error,
                    'text-gray-600': !error
                })}>
                    {helperText}
                </span>
            )}
        </div>
    );
};

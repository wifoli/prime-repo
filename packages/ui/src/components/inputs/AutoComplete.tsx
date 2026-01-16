import {
    AutoCompleteChangeEvent,
    AutoCompleteCompleteEvent,
    AutoComplete as PrimeAutoComplete,
    AutoCompleteProps as PrimeAutoCompleteProps
} from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';
import { ReactNode, useState, useCallback, useRef } from 'react';

export interface AutoCompleteOption {
    label: string;
    value: any;
}

export interface AutoCompleteProps extends Omit<
    PrimeAutoCompleteProps,
    'onChange' | 'suggestions' | 'completeMethod' | 'onSelect' | 'value'
> {
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
    label?: string;
    required?: boolean;
    startAddon?: ReactNode;
    endAddon?: ReactNode;
    
    /**
     * O valor selecionado (objeto AutoCompleteOption ou null)
     */
    value?: AutoCompleteOption | null;
    
    /**
     * Callback quando um item é selecionado
     */
    onChange?: (value: AutoCompleteOption | null) => void;
    
    /**
     * Callback adicional quando um item é selecionado (útil para efeitos colaterais)
     */
    onSelect?: (value: AutoCompleteOption) => void;
    
    /**
     * Callback quando o campo é limpo
     */
    onClear?: () => void;
    
    // Busca local
    options?: AutoCompleteOption[];
    
    // Busca em API
    onSearch?: (query: string) => Promise<AutoCompleteOption[]>;
    
    minSearchLength?: number;
    searchDelay?: number;
    
    /**
     * Se true, força a seleção de um item válido da lista
     * Se false, permite texto livre
     * @default false
     */
    forceSelection?: boolean;
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
    value,
    onChange,
    onSelect,
    onClear,
    options = [],
    onSearch,
    minSearchLength = 1,
    searchDelay = 300,
    placeholder = 'Buscar...',
    emptyMessage = 'Nenhum resultado encontrado',
    forceSelection = false,
    disabled = false,
    ...props
}: AutoCompleteProps) => {
    const inputId = id || `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
    
    // Estado interno para as sugestões
    const [suggestions, setSuggestions] = useState<AutoCompleteOption[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Estado interno para o texto de input (permite digitação livre)
    const [inputValue, setInputValue] = useState<string | AutoCompleteOption | null>(
        value || ''
    );
    
    // Ref para controlar debounce da busca
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Manipula mudanças no input
     * - Durante digitação: e.value é string
     * - Após seleção: e.value é AutoCompleteOption
     */
    const handleChange = useCallback((e: AutoCompleteChangeEvent) => {
        const newValue = e.value;
        
        // Atualiza o estado interno do input
        setInputValue(newValue);
        
        // Se o valor for um objeto (seleção), notifica o onChange
        if (newValue && typeof newValue === 'object' && 'label' in newValue && 'value' in newValue) {
            onChange?.(newValue as AutoCompleteOption);
            onSelect?.(newValue as AutoCompleteOption);
        }
        // Se for string vazia ou null, limpa a seleção
        else if (newValue === '' || newValue === null) {
            onChange?.(null);
            onClear?.();
        }
        // Se for string (digitação) e não forçamos seleção, podemos opcionalmente notificar
        // mas NÃO limpamos o valor selecionado anterior
    }, [onChange, onSelect, onClear]);

    /**
     * Manipula a seleção de um item da lista de sugestões
     */
    const handleSelect = useCallback((e: { value: AutoCompleteOption }) => {
        setInputValue(e.value);
        onChange?.(e.value);
        onSelect?.(e.value);
    }, [onChange, onSelect]);

    /**
     * Manipula o clear do campo (botão X ou tecla Escape)
     */
    const handleClear = useCallback(() => {
        setInputValue('');
        setSuggestions([]);
        onChange?.(null);
        onClear?.();
    }, [onChange, onClear]);

    /**
     * Executa a busca de sugestões
     */
    const search = useCallback(async (event: AutoCompleteCompleteEvent) => {
        const query = event.query || '';

        // Cancela busca anterior se houver
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Verifica tamanho mínimo
        if (query.length < minSearchLength) {
            setSuggestions([]);
            return;
        }

        // Se busca em API é fornecida
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
            // Filtro local
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
        }
    }, [onSearch, options, minSearchLength]);

    /**
     * Manipula blur do campo
     * Se forceSelection está ativo e o valor não é um objeto válido, limpa
     */
    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (forceSelection) {
            // Se inputValue é string (não selecionou nada), limpa
            if (typeof inputValue === 'string') {
                // Verifica se existe uma opção exata
                const exactMatch = suggestions.find(
                    opt => opt.label.toLowerCase() === inputValue.toLowerCase()
                );
                
                if (exactMatch) {
                    setInputValue(exactMatch);
                    onChange?.(exactMatch);
                } else {
                    setInputValue(value || '');
                }
            }
        }
        
        // Chama onBlur original se existir
        props.onBlur?.(e);
    }, [forceSelection, inputValue, suggestions, value, onChange, props.onBlur]);

    // Sincroniza com valor externo quando muda
    // useEffect foi removido para evitar loops - o PrimeReact gerencia isso internamente

    const autoCompleteElement = (
        <PrimeAutoComplete
            {...props}
            inputId={inputId}
            value={inputValue}
            onChange={handleChange}
            onSelect={handleSelect}
            onClear={handleClear}
            onBlur={handleBlur}
            suggestions={suggestions}
            completeMethod={search}
            field="label"
            forceSelection={forceSelection}
            placeholder={placeholder}
            emptyMessage={loading ? 'Buscando...' : emptyMessage}
            delay={searchDelay}
            disabled={disabled}
            dropdown={props.dropdown}
            showClear={props.showClear ?? true}
            className={classNames(
                'transition-colors duration-200',
                { 'w-full': fullWidth },
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
            panelClassName="shadow-lg border border-gray-200 bg-white"
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


// ============================================
// EXEMPLO DE USO - AutoComplete
// ============================================

// import { useState } from 'react';
// import { AutoComplete, AutoCompleteOption } from './AutoComplete';

// // Dados de exemplo
// const languageOptions: AutoCompleteOption[] = [
//     { label: 'JavaScript', value: 'js' },
//     { label: 'TypeScript', value: 'ts' },
//     { label: 'Python', value: 'py' },
//     { label: 'Java', value: 'java' },
//     { label: 'C#', value: 'csharp' },
//     { label: 'Go', value: 'go' },
//     { label: 'Rust', value: 'rust' },
//     { label: 'Ruby', value: 'ruby' },
//     { label: 'PHP', value: 'php' },
//     { label: 'Swift', value: 'swift' },
// ];

// export function AutoCompleteExamples() {
//     // ============================================
//     // EXEMPLO 1: Busca Local (mais comum)
//     // ============================================
//     const [language, setLanguage] = useState<AutoCompleteOption | null>(null);

//     // ============================================
//     // EXEMPLO 2: Busca em API
//     // ============================================
//     const [city, setCity] = useState<AutoCompleteOption | null>(null);

//     // Simula busca em API
//     const searchCities = async (query: string): Promise<AutoCompleteOption[]> => {
//         // Simula delay de rede
//         await new Promise(resolve => setTimeout(resolve, 300));
        
//         // Mock de dados
//         const cities = [
//             { label: 'São Paulo', value: 1 },
//             { label: 'Rio de Janeiro', value: 2 },
//             { label: 'Belo Horizonte', value: 3 },
//             { label: 'Curitiba', value: 4 },
//             { label: 'Porto Alegre', value: 5 },
//             { label: 'Salvador', value: 6 },
//             { label: 'Brasília', value: 7 },
//             { label: 'Fortaleza', value: 8 },
//         ];
        
//         return cities.filter(c => 
//             c.label.toLowerCase().includes(query.toLowerCase())
//         );
//     };

//     // ============================================
//     // EXEMPLO 3: Com Force Selection
//     // ============================================
//     const [product, setProduct] = useState<AutoCompleteOption | null>(null);

//     const productOptions: AutoCompleteOption[] = [
//         { label: 'Notebook Dell', value: 'dell-note' },
//         { label: 'Notebook Lenovo', value: 'lenovo-note' },
//         { label: 'Monitor LG', value: 'lg-mon' },
//         { label: 'Teclado Logitech', value: 'logi-kb' },
//     ];

//     return (
//         <div className="p-8 space-y-8 max-w-2xl mx-auto">
//             <h1 className="text-2xl font-bold mb-6">AutoComplete - Exemplos de Uso</h1>

//             {/* EXEMPLO 1: Busca Local */}
//             <div className="p-6 border rounded-lg bg-gray-50">
//                 <h2 className="text-lg font-semibold mb-4">1. Busca Local</h2>
                
//                 <AutoComplete
//                     label="Linguagem de Programação"
//                     options={languageOptions}
//                     value={language}
//                     onChange={(value) => {
//                         console.log('Selecionado:', value);
//                         setLanguage(value);
//                     }}
//                     placeholder="Digite para buscar..."
//                     minSearchLength={1}
//                     fullWidth
//                     required
//                 />

//                 <div className="mt-4 p-3 bg-white rounded border">
//                     <strong>Valor selecionado:</strong>
//                     <pre className="text-sm mt-2">
//                         {JSON.stringify(language, null, 2)}
//                     </pre>
//                 </div>
//             </div>

//             {/* EXEMPLO 2: Busca em API */}
//             <div className="p-6 border rounded-lg bg-gray-50">
//                 <h2 className="text-lg font-semibold mb-4">2. Busca em API</h2>
                
//                 <AutoComplete
//                     label="Cidade"
//                     value={city}
//                     onChange={(value) => {
//                         console.log('Cidade selecionada:', value);
//                         setCity(value);
//                     }}
//                     onSearch={searchCities}
//                     minSearchLength={2}
//                     searchDelay={300}
//                     placeholder="Digite o nome da cidade..."
//                     fullWidth
//                     helperText="Digite pelo menos 2 caracteres para buscar"
//                 />

//                 <div className="mt-4 p-3 bg-white rounded border">
//                     <strong>Valor selecionado:</strong>
//                     <pre className="text-sm mt-2">
//                         {JSON.stringify(city, null, 2)}
//                     </pre>
//                 </div>
//             </div>

//             {/* EXEMPLO 3: Com Force Selection */}
//             <div className="p-6 border rounded-lg bg-gray-50">
//                 <h2 className="text-lg font-semibold mb-4">3. Com Force Selection</h2>
//                 <p className="text-sm text-gray-600 mb-4">
//                     Quando <code>forceSelection=true</code>, o usuário deve selecionar um item da lista.
//                     Se sair do campo sem selecionar, o valor anterior é restaurado.
//                 </p>
                
//                 <AutoComplete
//                     label="Produto"
//                     options={productOptions}
//                     value={product}
//                     onChange={(value) => {
//                         console.log('Produto selecionado:', value);
//                         setProduct(value);
//                     }}
//                     placeholder="Selecione um produto..."
//                     forceSelection={true}
//                     fullWidth
//                 />

//                 <div className="mt-4 p-3 bg-white rounded border">
//                     <strong>Valor selecionado:</strong>
//                     <pre className="text-sm mt-2">
//                         {JSON.stringify(product, null, 2)}
//                     </pre>
//                 </div>
//             </div>

//             {/* EXEMPLO 4: Com Erro */}
//             <div className="p-6 border rounded-lg bg-gray-50">
//                 <h2 className="text-lg font-semibold mb-4">4. Com Estado de Erro</h2>
                
//                 <AutoComplete
//                     label="Campo Obrigatório"
//                     options={languageOptions}
//                     value={null}
//                     onChange={() => {}}
//                     placeholder="Este campo é obrigatório"
//                     error={true}
//                     helperText="Por favor, selecione uma opção"
//                     required
//                     fullWidth
//                 />
//             </div>

//             {/* EXEMPLO 5: Com Dropdown Button */}
//             <div className="p-6 border rounded-lg bg-gray-50">
//                 <h2 className="text-lg font-semibold mb-4">5. Com Botão Dropdown</h2>
                
//                 <AutoComplete
//                     label="Com Dropdown"
//                     options={languageOptions}
//                     value={language}
//                     onChange={setLanguage}
//                     placeholder="Clique na seta ou digite..."
//                     dropdown={true}
//                     fullWidth
//                 />
//             </div>
//         </div>
//     );
// }

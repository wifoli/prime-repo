import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import type { ValidationResult, ValidatorFn } from "@front-engine/utils-ts/validations";
import { ApiError } from "@front-engine/api";

export interface FieldConfig<T = any> {
    validators?: ValidatorFn[];
    initialValue?: T;
    setter?: (value: T) => T;
}

export type FormConfig<T extends Record<string, any>> = {
    [K in keyof T]: FieldConfig<T[K]>;
};

export type FormErrors<T extends Record<string, any>> = Partial<Record<keyof T, string>>;
export type FormValues<T extends Record<string, any>> = T;

export interface UseFormResult<T extends Record<string, any>> {
    values: FormValues<T>;
    errors: FormErrors<T>;
    touched: Partial<Record<keyof T, boolean>>;
    isValid: boolean;
    isSubmitting: boolean;
    setValue: (field: keyof T, value: any) => void;
    setValues: (values: Partial<FormValues<T>>) => void;
    setError: (field: keyof T, error: string) => void;
    setErrors: (errors: FormErrors<T>) => void;
    setTouched: (field: keyof T, touched: boolean) => void;
    setApiErrors: (apiError?: ApiError | null, keyMap?: Record<string, keyof T>) => void;
    validateField: (field: keyof T) => boolean;
    validateForm: () => boolean;
    handleChange: (
        field: keyof T,
    ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string | number) => void;
    handleBlur: (field: keyof T) => () => void;
    handleSubmit: (
        onSubmit: (values: FormValues<T>) => void | Promise<void>,
    ) => (e: FormEvent) => Promise<void>;
    reset: () => void;
}

export function useForm<T extends Record<string, any>>(config: FormConfig<T>): UseFormResult<T> {
    const initialValues = Object.keys(config).reduce((acc, key) => {
        const k = key as keyof T;
        (acc as any)[k] = config[k as keyof typeof config].initialValue ?? "";
        return acc;
    }, {} as FormValues<T>);

    const [values, setValuesState] = useState<FormValues<T>>(initialValues);
    const [errors, setErrorsState] = useState<FormErrors<T>>({});
    const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = useCallback(
        (field: keyof T, valueArg?: any): boolean => {
            const fieldKey = field as string;
            const fieldConfig = (config as any)[fieldKey] as FieldConfig<any> | undefined;
            if (!fieldConfig?.validators) return true;

            const value = valueArg !== undefined ? valueArg : (values as any)[fieldKey];

            for (const validator of fieldConfig.validators) {
                const result: ValidationResult = validator(value);
                if (!result.valid) {
                    setErrorsState((prev) => ({
                        ...(prev as any),
                        [fieldKey]: result.error || "Campo inválido",
                    }));
                    return false;
                }
            }

            setErrorsState((prev) => {
                const newErrors = { ...(prev as any) } as FormErrors<T>;
                delete (newErrors as any)[fieldKey];
                return newErrors;
            });

            return true;
        },
        [config, values],
    );

    const validateForm = useCallback((): boolean => {
        let isValid = true;
        const newErrors: FormErrors<T> = {};

        (Object.keys(config) as (keyof T)[]).forEach((field) => {
            const fieldConfig = (config as any)[field as string] as FieldConfig<any> | undefined;
            if (!fieldConfig?.validators) return;

            const value = (values as any)[field as string];

            for (const validator of fieldConfig.validators) {
                const result: ValidationResult = validator(value);
                if (!result.valid) {
                    (newErrors as any)[field as string] = result.error || "Campo inválido";
                    isValid = false;
                    break;
                }
            }
        });

        setErrorsState(newErrors);
        return isValid;
    }, [config, values]);

    const applySetter = useCallback(
        (field: keyof T, value: any) => {
            const fieldConfig = config[field];
            return fieldConfig?.setter ? fieldConfig.setter(value) : value;
        },
        [config],
    );

    const setValue = useCallback(
        (field: keyof T, value: any) => {
            const finalValue = applySetter(field, value);

            setValuesState(
                (prev) => ({ ...prev, [field as string]: finalValue }) as FormValues<T>,
            );
        },
        [applySetter],
    );


    const setValues = useCallback(
        (newValues: Partial<FormValues<T>>) => {
            setValuesState((prev) => {
                const updated = { ...prev };

                for (const key in newValues) {
                    const field = key as keyof T;
                    updated[field] = applySetter(field, newValues[field]);
                }

                return updated;
            });
        },
        [applySetter],
    );


    const setError = useCallback((field: keyof T, error: string) => {
        setErrorsState((prev) => ({ ...(prev as any), [field as string]: error }));
    }, []);

    const setErrors = useCallback((newErrors: FormErrors<T>) => {
        setErrorsState(newErrors);
    }, []);

    const setTouched = useCallback((field: keyof T, isTouched: boolean) => {
        setTouchedState((prev) => ({ ...(prev as any), [field as string]: isTouched }));
    }, []);

    const setApiErrors = useCallback(
        (apiError?: ApiError | null, keyMap?: Record<string, keyof T>) => {
            if (!apiError || !apiError.errors) {
                return;
            }

            const out: Partial<Record<keyof T, string>> = {};

            for (const [apiKey, arr] of Object.entries(apiError.errors)) {
                if (!arr) continue;
                const message = Array.isArray(arr) ? arr.filter(Boolean).join(" ") : String(arr);

                if (keyMap && keyMap[apiKey]) {
                    out[keyMap[apiKey]] = message;
                } else {
                    (out as any)[apiKey] = message;
                }
            }

            setErrorsState(out as FormErrors<T>);
        },
        [],
    );

    const handleChange = useCallback(
        (field: keyof T) => {
            let value: any;
            return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string | number) => {
                if (typeof e === "string" || typeof e === "number") {
                    value = e;
                } else if (e !== null && 'target' in e) {
                    value = (e.target as HTMLInputElement).value;
                } else {
                    value = undefined;
                }

                setValue(field, value);

                if ((touched as any)[field as string]) {
                    validateField(field, value);
                }
            };
        },
        [setValue, touched, validateField],
    );

    const handleBlur = useCallback(
        (field: keyof T) => {
            return () => {
                setTouched(field, true);
                validateField(field);
            };
        },
        [setTouched, validateField],
    );

    const handleSubmit = useCallback(
        (onSubmit: (values: FormValues<T>) => void | Promise<void>) => {
            return async (e: FormEvent) => {
                e.preventDefault();

                const allTouched = (Object.keys(config) as (keyof T)[]).reduce(
                    (acc, field) => {
                        (acc as any)[field as string] = true;
                        return acc;
                    },
                    {} as Partial<Record<keyof T, boolean>>,
                );
                setTouchedState(allTouched);

                // Validate
                if (!validateForm()) {
                    return;
                }

                setIsSubmitting(true);
                try {
                    await onSubmit(values);
                } finally {
                    setIsSubmitting(false);
                }
            };
        },
        [config, values, validateForm],
    );

    const reset = useCallback(() => {
        setValuesState(initialValues);
        setErrorsState({});
        setTouchedState({});
        setIsSubmitting(false);
    }, [initialValues]);

    const isValid = Object.keys(errors).length === 0;

    return {
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        setValue,
        setValues,
        setError,
        setErrors,
        setTouched,
        setApiErrors,
        validateField,
        validateForm,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
    };
}

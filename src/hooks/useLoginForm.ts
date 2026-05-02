import type React from "react";
import type { ChangeEvent, FocusEvent, MouseEvent, SubmitEvent } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import { useEffect, useState } from "react";

interface FormState {
    fullName: string;
    email: string;
    password: string;
}

export interface UseLoginFormReturn {
    // State
    form: FormState;
    isRegister: boolean;
    showPassword: boolean;
    isSubmitting: boolean;
    error: string | null;

    // Handlers
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: SubmitEvent<HTMLFormElement>) => Promise<void>;
    handleFocus: (e: FocusEvent<HTMLInputElement>) => void;
    handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
    handleLinkMouseOver: (e: MouseEvent<HTMLElement>) => void;
    handleLinkMouseOut: (e: MouseEvent<HTMLElement>) => void;
    handleBtnMouseOver: (e: MouseEvent<HTMLButtonElement>) => void;
    handleBtnMouseOut: (e: MouseEvent<HTMLButtonElement>) => void;
    toggleShowPassword: () => void;
    toggleMode: () => void;
}

export function useLoginForm(): UseLoginFormReturn {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { login, register, user } = useAuth();

    const [isRegister, setIsRegister] = useState<boolean>(searchParams.get("mode") === "signup");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>({
        fullName: "",
        email: "",
        password: "",
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (user) {
            const form = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/fields";
            void navigate(form, { replace: true });
        }
    }, [user, navigate, location.state]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
        setError(null);
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (isRegister) {
                await register(form.email, form.fullName, form.password);
            } else {
                await login(form.email, form.password);
            }
            const redirectPath = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/fields";
            void navigate(redirectPath, { replace: true });
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
        e.target.style.borderColor = 'var(--color-primary)';
      };
    
    const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
        e.target.style.borderColor = 'var(--color-border)';
      };
    
    const handleLinkMouseOver = (e: MouseEvent<HTMLElement>): void => {
        (e.target as HTMLElement).style.color = 'var(--color-primary-hover)';
      };
    
    const handleLinkMouseOut = (e: MouseEvent<HTMLElement>): void => {
        (e.target as HTMLElement).style.color = 'var(--color-primary)';
      };
    
    const handleBtnMouseOver = (e: MouseEvent<HTMLButtonElement>): void => {
        if (!isSubmitting) {
          e.currentTarget.style.background = 'var(--color-primary-hover)';
        }
      };
    
    const handleBtnMouseOut = (e: MouseEvent<HTMLButtonElement>): void => {
        e.currentTarget.style.background = 'var(--color-primary)';
      };
    
    const toggleShowPassword = (): void => {
        setShowPassword((p) => !p);
    }

    const toggleMode = (): void => {
        setIsRegister((r) => !r);
        setError(null);
    }

    return {
        form,
        isRegister,
        showPassword,
        isSubmitting,
        error,
        handleChange,
        handleSubmit,
        handleFocus,
        handleBlur,
        handleLinkMouseOver,
        handleLinkMouseOut,
        handleBtnMouseOver,
        handleBtnMouseOut,
        toggleShowPassword,
        toggleMode,
    };
}

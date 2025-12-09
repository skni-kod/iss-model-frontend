import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/lib/api/authService";
import axios from "axios";

interface UseRegisterResult {
    isLoading: boolean;
    successMessage: string | null;
    errorMessage: string | null;
    handleRegister: (data: { email: string; password: string; username: string }) => Promise<void>;
}

export function useRegister(): UseRegisterResult {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (data: { email: string; password: string; username: string }) => {
        setIsLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            await register({
                email: data.email,
                password: data.password,
                username: data.username,
            });

            setSuccessMessage("Konto zostało utworzone! Przekierowuję do logowania...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message
                    || error.response?.data?.error
                    || "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.";
                setErrorMessage(message);
            } else {
                setErrorMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        successMessage,
        errorMessage,
        handleRegister,
    };
}

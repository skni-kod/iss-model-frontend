import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/api/authService";
import axios from "axios";

interface UseLoginResult {
    isLoading: boolean;
    errorMessage: string | null;
    handleLogin: (data: { username: string; password: string }) => Promise<void>;
}

export function useLogin(): UseLoginResult {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (data: { username: string; password: string }) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await login({
                username: data.username,
                password: data.password,
            });

            localStorage.setItem("authToken", response.token);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message
                    || error.response?.data?.error
                    || "Nieprawidłowe dane logowania. Spróbuj ponownie.";
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
        errorMessage,
        handleLogin,
    };
}

import { Satellite } from "lucide-react";

interface PlaceholderImageProps {
    className?: string;
    iconClassName?: string;
    containerClassName?: string;
}

export function PlaceholderImage({
    className = "",
    iconClassName = "w-16 h-16 md:w-20 md:h-20",
    containerClassName = "p-6 rounded-3xl"
}: PlaceholderImageProps) {
    return (
        <div
            className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 overflow-hidden ${className}`}
        >
            <div className={`bg-black/40 shadow-2xl backdrop-blur-md border border-white/10 flex items-center justify-center ${containerClassName}`}>
                <Satellite className={`text-white transform rotate-12 ${iconClassName}`} />
            </div>
        </div>
    );
}

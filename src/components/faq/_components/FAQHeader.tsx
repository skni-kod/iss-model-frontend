import { HelpCircle } from "lucide-react";

export const FAQHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-blue-600/20 rounded-full border border-blue-500/30">
          <HelpCircle className="w-12 h-12 text-blue-400" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Najczęściej zadawane pytania
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Znajdź odpowiedzi na najczęstsze pytania dotyczące Międzynarodowej
        Stacji Kosmicznej i naszego projektu
      </p>
    </div>
  );
};

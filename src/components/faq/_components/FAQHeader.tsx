import { HelpCircle } from "lucide-react";

export const FAQHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-gray-900 rounded-full border border-gray-700/50">
          <HelpCircle className="w-12 h-12 text-white" />
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

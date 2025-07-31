interface KnowledgeBaseHeaderProps {}

function KnowledgeBaseHeader({}: KnowledgeBaseHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-4 text-foreground">
        Baza Wiedzy Kosmicznej
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl">
        Odkryj fascynujący świat eksploracji kosmosu. Znajdziesz tutaj artykuły
        o Międzynarodowej Stacji Kosmicznej, satelitach, misjach kosmicznych i
        najnowszych odkryciach z orbity ziemskiej.
      </p>
    </div>
  );
}

export default KnowledgeBaseHeader;

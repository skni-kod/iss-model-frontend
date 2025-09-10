interface PostsSummaryProps {
  filteredCount: number;
  totalCount: number;
}

const PostsSummary = ({ filteredCount, totalCount }: PostsSummaryProps) => {
  return (
    <div className="mt-6 text-sm text-gray-500">
      Wyświetlono {filteredCount} z {totalCount} postów
    </div>
  );
};

export default PostsSummary;

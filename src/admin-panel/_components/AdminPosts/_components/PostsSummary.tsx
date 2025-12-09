interface PostsSummaryProps {
  filteredCount: number;
  totalCount: number;
}

const PostsSummary = ({ filteredCount, totalCount }: PostsSummaryProps) => {
  return (
    <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
      Wyświetlono {filteredCount} z {totalCount} postów
    </div>
  );
};

export default PostsSummary;

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Search, X } from "lucide-react";

interface TagsFilterSectionProps {
  postsCount: number;
  totalPostsCount: number;
  searchQuery: string;
  selectedTags: string[];
  allTags: string[];
  onSearchChange: (query: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}

function TagsFilterSection({
  postsCount,
  totalPostsCount,
  searchQuery,
  selectedTags,
  allTags,
  onSearchChange,
  onTagToggle,
  onClearFilters,
  hasFilters,
}: TagsFilterSectionProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Szukaj artykułów..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
          className="pl-10"
        />
      </div>

      {/* Tags and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Filtry:
          </span>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              size="sm"
              className="h-7 px-3 text-xs rounded-full"
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Button>
          ))}
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              Wyczyść
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {hasFilters && <span className="text-primary"> (filtrowane)</span>}
        </div>
      </div>
    </div>
  );
}

export default TagsFilterSection;

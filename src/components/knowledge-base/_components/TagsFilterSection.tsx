import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Search, X, ChevronDown, Filter } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";

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
  postsCount: _postsCount,
  totalPostsCount: _totalPostsCount,
  searchQuery,
  selectedTags,
  allTags,
  onSearchChange,
  onTagToggle,
  onClearFilters,
  hasFilters,
}: TagsFilterSectionProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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

      {/* Collapsible Filters */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtry
              {hasFilters && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {selectedTags.length}
                </span>
              )}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isFiltersOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              Wyczyść filtry
            </Button>
          )}
        </div>

        <CollapsibleContent className="mt-4">
          <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg border">
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                size="sm"
                className="h-8 px-4 text-sm rounded-full"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default TagsFilterSection;

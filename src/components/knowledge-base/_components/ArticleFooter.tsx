import { Button } from "../../ui/button";

interface ArticleFooterProps {}

function ArticleFooter({}: ArticleFooterProps) {
  return (
    <footer className="mt-12 pt-8 border-t">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            Podobało Ci się?
          </h3>
          <p className="text-sm text-muted-foreground">
            Udostępnij ten artykuł swoim znajomym zainteresowanym eksploracją
            kosmosu.
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
            Udostępnij
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
          >
            Zapisz
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default ArticleFooter;

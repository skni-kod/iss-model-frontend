import type { Post } from "../types";

interface ArticleContentProps {
  post: Post;
}

function ArticleContent({ post }: ArticleContentProps) {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <div
        className="text-foreground leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: post.content
            .split("\n")
            .map((line) => {
              // Handle headings
              if (line.startsWith("# ")) {
                return `<h1 class="text-3xl font-bold mt-8 mb-4 text-foreground">${line.slice(
                  2
                )}</h1>`;
              }
              if (line.startsWith("## ")) {
                return `<h2 class="text-2xl font-bold mt-6 mb-3 text-foreground">${line.slice(
                  3
                )}</h2>`;
              }
              if (line.startsWith("### ")) {
                return `<h3 class="text-xl font-bold mt-4 mb-2 text-foreground">${line.slice(
                  4
                )}</h3>`;
              }

              // Handle images
              if (line.startsWith("![")) {
                const match = line.match(/!\[([^\]]*)\]\(([^)]*)\)/);
                if (match) {
                  return `<div class="my-6"><img src="${match[2]}" alt="${match[1]}" class="w-full rounded-lg shadow-sm" /></div>`;
                }
              }

              // Handle bold text
              line = line.replace(
                /\*\*([^*]+)\*\*/g,
                '<strong class="font-semibold">$1</strong>'
              );

              // Handle bullet points
              if (line.startsWith("- ")) {
                return `<li class="mb-2 text-muted-foreground">${line.slice(
                  2
                )}</li>`;
              }

              // Handle regular paragraphs
              if (line.trim() && !line.startsWith("<")) {
                return `<p class="mb-4 text-muted-foreground">${line}</p>`;
              }

              return line;
            })
            .join("\n")
            .replace(
              /(<li[^>]*>.*<\/li>)/gs,
              '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>'
            ),
        }}
      />
    </article>
  );
}

export default ArticleContent;

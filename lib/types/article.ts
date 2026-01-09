export interface Article {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: string;
}

export interface ArticleContentSection {
  subtitle: string;
  paragraphs: string[];
}

export interface FullArticle extends Article {
  content: ArticleContentSection[];
}

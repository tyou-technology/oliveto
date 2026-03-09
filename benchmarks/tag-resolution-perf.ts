
interface Tag {
  id: string;
  name: string;
}

interface Article {
  id: string;
  tagIds: string[];
  tags?: Tag[];
}

// Setup Data
const NUM_ARTICLES = 10000;
const NUM_TAGS = 100;
const TAGS_PER_ARTICLE = 5;

const allTags: Tag[] = Array.from({ length: NUM_TAGS }, (_, i) => ({
  id: `tag-${i}`,
  name: `Tag ${i}`,
}));

const articles: Article[] = Array.from({ length: NUM_ARTICLES }, (_, i) => ({
  id: `article-${i}`,
  tagIds: Array.from({ length: TAGS_PER_ARTICLE }, () => `tag-${Math.floor(Math.random() * NUM_TAGS)}`),
}));

// Baseline Implementation: O(N*M)
function resolveTagsBaseline(article: Article, tags: Tag[]): Tag[] {
  return (article.tagIds?.map(id => tags.find(t => t.id === id)).filter(Boolean) as Tag[]) || [];
}

// Optimized Implementation: O(1) Lookup
function resolveTagsOptimized(article: Article, tagsMap: Map<string, Tag>): Tag[] {
  return (article.tagIds?.map(id => tagsMap.get(id)).filter(Boolean) as Tag[]) || [];
}

// Warmup
console.log("Warming up...");
for (let i = 0; i < 100; i++) {
  resolveTagsBaseline(articles[0], allTags);
}

// Measure Baseline
console.log("Measuring Baseline (Array.find)...");
const startBaseline = performance.now();
for (const article of articles) {
  resolveTagsBaseline(article, allTags);
}
const endBaseline = performance.now();
const baselineTime = endBaseline - startBaseline;

// Measure Optimized
console.log("Measuring Optimized (Map.get)...");
const tagsMap = new Map(allTags.map(t => [t.id, t])); // One-time setup cost included or excluded?
// In the app, it's done once per page load/tag update (useMemo), so for per-item render, we exclude setup time.
// However, I will measure loop time only.

const startOptimized = performance.now();
for (const article of articles) {
  resolveTagsOptimized(article, tagsMap);
}
const endOptimized = performance.now();
const optimizedTime = endOptimized - startOptimized;

console.log(`\nResults for ${NUM_ARTICLES} articles resolution:`);
console.log(`Baseline Time: ${baselineTime.toFixed(2)} ms`);
console.log(`Optimized Time: ${optimizedTime.toFixed(2)} ms`);
console.log(`Speedup: ${(baselineTime / optimizedTime).toFixed(2)}x`);

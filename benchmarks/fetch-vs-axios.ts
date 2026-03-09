
import { performance } from 'perf_hooks';

// Mock simulation of network latency
const NETWORK_DELAY_MS = 100;

async function mockNetworkCall(url: string) {
  await new Promise(resolve => setTimeout(resolve, NETWORK_DELAY_MS));
  return { data: `Content for ${url}` };
}

// Scenario A: Axios (No auto-memoization)
async function scenarioAxios(articleIds: string[]) {
  const start = performance.now();
  let networkCalls = 0;

  // 1. Generate Static Params (Fetch List)
  await mockNetworkCall('/articles');
  networkCalls++;

  for (const id of articleIds) {
    // 2. Page Render (Fetch Detail)
    await mockNetworkCall(`/articles/${id}`);
    networkCalls++;

    // 3. Metadata Generation (Fetch Detail again - often needed for title/description)
    // Axios doesn't dedup, so this hits the network again
    await mockNetworkCall(`/articles/${id}`);
    networkCalls++;
  }

  const duration = performance.now() - start;
  return { duration, networkCalls };
}

// Scenario B: Fetch (With Memoization)
const requestCache = new Map<string, Promise<any>>();

async function mockFetchWithMemoization(url: string) {
  if (requestCache.has(url)) {
    return requestCache.get(url);
  }

  const promise = mockNetworkCall(url);
  requestCache.set(url, promise);
  return promise;
}

async function scenarioFetch(articleIds: string[]) {
  const start = performance.now();
  let networkCalls = 0;

  // Clear cache for fresh run
  requestCache.clear();

  // We wrap our "network" counter in the mock to only count *actual* calls
  // (In reality, Next.js handles this logic)
  const trackedFetch = async (url: string) => {
    if (requestCache.has(url)) {
      return requestCache.get(url);
    }
    networkCalls++;
    return mockFetchWithMemoization(url);
  };

  // 1. Generate Static Params (Fetch List)
  await trackedFetch('/articles');

  for (const id of articleIds) {
    // 2. Page Render (Fetch Detail)
    await trackedFetch(`/articles/${id}`);

    // 3. Metadata Generation (Fetch Detail again)
    // Should be deduped
    await trackedFetch(`/articles/${id}`);
  }

  const duration = performance.now() - start;
  return { duration, networkCalls };
}

async function runBenchmark() {
  const ARTICLE_COUNT = 10;
  const articleIds = Array.from({ length: ARTICLE_COUNT }, (_, i) => `id-${i}`);

  console.log(`Running Benchmark with ${ARTICLE_COUNT} articles...`);
  console.log(`Simulated Network Delay: ${NETWORK_DELAY_MS}ms`);
  console.log('---');

  const axiosResult = await scenarioAxios(articleIds);
  console.log('Scenario A (Axios/No-Dedup):');
  console.log(`  Duration: ${axiosResult.duration.toFixed(2)}ms`);
  console.log(`  Network Calls: ${axiosResult.networkCalls}`);

  const fetchResult = await scenarioFetch(articleIds);
  console.log('Scenario B (Fetch/Dedup):');
  console.log(`  Duration: ${fetchResult.duration.toFixed(2)}ms`);
  console.log(`  Network Calls: ${fetchResult.networkCalls}`);

  const improvement = ((axiosResult.duration - fetchResult.duration) / axiosResult.duration) * 100;
  console.log('---');
  console.log(`Estimated Improvement: ${improvement.toFixed(2)}%`);
  console.log(`Call Reduction: ${axiosResult.networkCalls} -> ${fetchResult.networkCalls}`);
}

runBenchmark();

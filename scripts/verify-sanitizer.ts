
import { sanitizeHtml } from "../src/lib/utils/sanitizer";
import assert from "assert";

console.log("🔒 Starting Sanitization Verification...");

const tests = [
  {
    name: "Basic Text",
    input: "Hello World",
    expected: "Hello World",
  },
  {
    name: "Allowed Tags (p, b, i)",
    input: "<p><b>Hello</b> <i>World</i></p>",
    expected: "<p><b>Hello</b> <i>World</i></p>",
  },
  {
    name: "Strip Script Tag",
    input: "Hello <script>alert('xss')</script> World",
    expected: "Hello  World",
  },
  {
    name: "Strip OnError Attribute",
    input: '<img src="x" onerror="alert(1)">',
    expected: '<img src="x">',
  },
  {
    name: "Strip OnClick Attribute",
    input: '<a href="#" onclick="evil()">Click me</a>',
    expected: '<a href="#">Click me</a>',
  },
  {
    name: "Strip Javascript Protocol",
    input: '<a href="javascript:alert(1)">Evil Link</a>',
    expected: '<a>Evil Link</a>',
  },
  {
    name: "Allow Safe Links",
    input: '<a href="https://example.com" target="_blank" rel="noopener">Safe Link</a>',
    expected: '<a href="https://example.com" target="_blank" rel="noopener">Safe Link</a>',
  },
  {
    name: "Allow Images",
    input: '<img src="image.jpg" alt="Test" width="100">',
    expected: '<img src="image.jpg" alt="Test" width="100">',
  },
  {
    name: "Strip Style (Safe)",
    input: '<p style="color: red; text-align: center;">Styled</p>',
    expected: '<p>Styled</p>', // We strip all styles for maximum security
  },
  {
    name: "Strip Style (Dangerous)",
    input: '<div style="background-image: url(javascript:alert(1))">Evil CSS</div>',
    expected: '<div>Evil CSS</div>',
  },
  {
    name: "Iframe (Forbidden)",
    input: '<iframe src="https://evil.com"></iframe>',
    expected: '',
  }
];

let passed = 0;
let failed = 0;

tests.forEach((test) => {
  try {
    const output = sanitizeHtml(test.input);
    // Note: DOMPurify might change attribute order or spacing, strict string equality might be flaky.
    // For simple cases, it works. If it fails due to benign differences, we'll adjust.
    // DOMPurify is deterministic.

    // We check if dangerous parts are gone for complex cases where exact match is hard
    if (test.name.includes("Strip") || test.name.includes("Forbidden")) {
        if (output.includes("script") || output.includes("onerror") || output.includes("javascript:") || output.includes("iframe")) {
             throw new Error(`Sanitization failed! Output contained forbidden content: ${output}`);
        }
    }

    // For expected exact matches
    if (test.expected !== undefined) {
         if (output !== test.expected) {
             // Sometimes DOMPurify adds quotes or changes structure slightly.
             // Let's log it.
             console.warn(`[${test.name}] Output mismatch (might be benign).`);
             console.warn(`Expected: ${test.expected}`);
             console.warn(`Actual:   ${output}`);

             if (output === test.expected) {
                 // Exact match
             } else {
                 // For now, strict check, but allow if it's just attribute order if we had a parser.
                 // We will fail on mismatch to be safe, then adjust test if needed.
                 throw new Error(`Output mismatch.`);
             }
         }
    }

    console.log(`✅ ${test.name}`);
    passed++;
  } catch (error: any) {
    console.error(`❌ ${test.name}: ${error.message}`);
    failed++;
  }
});

console.log("\n---------------------------------------------------");
console.log(`Total: ${tests.length} | Passed: ${passed} | Failed: ${failed}`);
console.log("---------------------------------------------------");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All Security Tests Passed!");
}

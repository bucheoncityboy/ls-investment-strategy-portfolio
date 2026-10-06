import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const workflow = readFileSync(".github/workflows/deploy-pages.yml", "utf8");
const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor: ${match[1]}`);
for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
  const href = match[1].replace(/&amp;/g, "&");
  if (/^(?:https:|mailto:)/.test(href)) continue;
  assert.ok(existsSync(href.split("?")[0]), `Missing local asset: ${href}`);
}
for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="[^"]*noopener/);
assert.match(html, /<html lang="ko">/);
assert.equal(Array.from(html.matchAll(/<h1\b/g)).length, 1);
assert.match(html, /LS증권 투자전략 RA 지원 포트폴리오/);
assert.match(html, /aria-label="주요 메뉴"/);
assert.match(html, /class="skip-link"/);
assert.match(html, /19회 확대되고 17회 축소/);
assert.match(html, /다음 관측일인 D\+1/);
assert.match(html, /학회원 피드백 기준/);
assert.match(html, /직접 작성한 학회 브리핑과 구분/);
assert.doesNotMatch(html, /src="[^\"]*\.pdf|href="[^\"]*\.pdf|<iframe|<embed|<object|data:application\/pdf|<script\b/i);
assert.doesNotMatch(html, /(?:file:\/\/|[A-Z]:[\\/])|12\.5%|7\.4%/);
assert.doesNotMatch(html, /실현 수익|승률|합격 보장|업무 경험 보유자/);
assert.match(css, /@media \(max-width: 720px\)/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /:focus-visible/);
assert.match(workflow, /npm ci/);
assert.match(workflow, /npm run check/);
assert.match(workflow, /npm run typecheck/);
assert.match(workflow, /cp index\.html styles\.css \.nojekyll/);
assert.match(workflow, /cp -R assets _site\//);
assert.doesNotMatch(workflow, /cp -R \. _site|path: '\.'/);
function filesIn(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (["node_modules", ".git", "tmp"].includes(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}
for (const path of filesIn(".")) assert.doesNotMatch(path, /\.(?:pdf|docx|pptx)$/i, `Private document must not be packaged: ${path}`);
console.log("Site checks passed: anchors, assets, accessibility, attribution, document privacy, and deployment.");

import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";

const html = readFileSync("index.html", "utf8");
const sample = readFileSync("samples/2026-10-07.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const workflow = readFileSync(".github/workflows/deploy-pages.yml", "utf8");
const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor: ${match[1]}`);
for (const [path, document] of [["index.html", html], ["samples/2026-10-07.html", sample]]) {
  const documentIds = Array.from(document.matchAll(/\bid="([^"]+)"/g), match => match[1]);
  assert.equal(new Set(documentIds).size, documentIds.length, `Duplicate IDs: ${path}`);
  for (const match of document.matchAll(/href="#([^"]+)"/g)) assert.ok(documentIds.includes(match[1]), `Missing anchor in ${path}: ${match[1]}`);
  for (const match of document.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const href = match[1].replace(/&amp;/g, "&");
    if (/\.pdf(?:[?#]|$)/i.test(href)) assert.match(href, /^https:\/\/(?:www\.treasurydirect\.gov\/instit\/annceresult\/press\/preanre\/2026\/|www\.cmegroup\.com\/daily_bulletin\/current\/)/, `Only official public source PDFs may be linked: ${href}`);
    if (/^(?:https:|mailto:)/.test(href)) continue;
    assert.ok(existsSync(join(dirname(path), href.split(/[?#]/)[0])), `Missing local asset in ${path}: ${href}`);
  }
  for (const match of document.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="[^"]*noopener/);
  assert.doesNotMatch(document, /src="[^\"]*\.pdf|<iframe|<embed|<object|data:application\/pdf|<script\b/i);
  assert.doesNotMatch(document, /(?:file:\/\/|\/Users\/|[A-Z]:[\\/])/);
}
for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="[^"]*noopener/);
assert.match(html, /<html lang="ko">/);
assert.equal(Array.from(html.matchAll(/<h1\b/g)).length, 1);
assert.match(html, /LS증권 투자전략 RA 지원 포트폴리오/);
assert.match(html, /aria-label="주요 메뉴"/);
assert.match(html, /class="skip-link"/);
assert.match(html, /19회 확대되고 17회 축소/);
assert.match(html, /다음 관측일을 D\+1, 다섯째 관측일을 D\+5/);
assert.match(html, /학회원 피드백 기준/);
assert.match(html, /직접 작성한 학회 브리핑과 구분/);
assert.match(html, /href="samples\/2026-10-07\.html"/);
assert.match(sample, /2026\.10\.07 Morning Market Briefing/);
assert.match(sample, /AI 활용 리서치 샘플/);
assert.match(sample, /07:00 KST/);
assert.match(sample, /미국 세션 2026-10-06/);
assert.match(sample, /한국 세션 2026-10-06/);
for (const section of ["Summary", "Rates", "FX", "Commodity", "Equity, Vol", "한국 증시", "주요 일정"]) assert.ok(sample.includes(section), `Missing briefing section: ${section}`);
for (const date of ["2026-10-07", "2026-10-08", "2026-10-12", "2026-10-13", "2026-10-14"]) assert.ok(sample.includes(`datetime="${date}"`), `Missing Korean trading day: ${date}`);
assert.equal(Array.from(sample.matchAll(/<h1\b/g)).length, 1);
assert.match(sample, /<html lang="ko">/);
assert.doesNotMatch(sample, /김재원|작성자|\bby\b|매수 추천|매도 추천/);
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
assert.match(workflow, /cp -R samples _site\//);
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

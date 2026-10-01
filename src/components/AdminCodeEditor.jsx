import React, { useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { Code2, Eye, GitBranch, RotateCcw, Save, WandSparkles } from "lucide-react";
import {
  EDITABLE_PAGES,
  getPageOverride,
  getPageOverrides,
  removePageOverride,
  sanitizePageHtml,
  savePageOverride,
  scopePageCss,
  updatePublishedPageOverrides,
} from "../data/pageOverrides";
import { useTheme } from "./ThemeContext";

function getStoredContent(pageId) {
  const saved = getPageOverride(pageId);
  return saved ? { html: saved.html, css: saved.css || "" } : { html: "", css: "" };
}

const PAGE_SOURCE_PATHS = {
  navbar: "/",
  home: "/",
  about: "/about",
  services: "/services",
  arjun: "/arjun",
  "service-detail": "/services/registrations",
  knowledge: "/knowledge-bank",
  "team-detail": "/team/ca-prudhvi-raju-addala",
  contact: "/contact",
};

function extractPageCss(document, root) {
  const elements = [root, ...root.querySelectorAll("*")];
  const classes = new Set(elements.flatMap((element) => [...element.classList]));
  const tags = new Set(elements.map((element) => element.tagName.toLowerCase()));

  function selectorIsUsed(selector) {
    if (selector.includes(":root") || selector.includes("*")) return true;
    for (const className of classes) {
      const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`\\.${escapedClass}(?![\\w-])`).test(selector)) return true;
    }
    return [...tags].some((tag) => new RegExp(`(^|[\\s>+~,(])${tag}(?=[\\s.#:[>+~),]|$)`, "i").test(selector));
  }

  function collectRules(rules) {
    const output = [];
    for (const rule of rules) {
      if (rule.selectorText) {
        if (rule.selectorText.trim().toLowerCase() === "section") continue;
        if (selectorIsUsed(rule.selectorText)) output.push(rule.cssText);
      } else if (rule.cssRules) {
        const nested = collectRules(rule.cssRules);
        if (nested) {
          const wrapper = rule.conditionText
            ? `@media ${rule.conditionText}`
            : rule.cssText.slice(0, rule.cssText.indexOf("{"));
          output.push(`${wrapper} {\n${nested}\n}`);
        }
      }
    }
    return output.join("\n");
  }

  const sheets = [...document.styleSheets];
  return sheets.map((sheet) => {
    try {
      return collectRules(sheet.cssRules);
    } catch {
      return "";
    }
  }).filter(Boolean).join("\n\n");
}

function makePreviewDocument(htmlCode, cssCode, theme) {
  const safeHtml = sanitizePageHtml(htmlCode);
  const safeCss = scopePageCss(cssCode);
  const themeCss = theme === "dark"
    ? "body{background:#111a23!important;color:#e4edf4!important}.custom-site-page{color:#e4edf4!important}.custom-site-page :is(.card,.mini,.resource,.team,.form,.detail-list article,.about-expertise-card,.about-principles-card,.about-service-card,.about-team-section,.about-story-section,.page-hero,.soft,aside){background-color:#1b2833!important;color:#e4edf4!important;border-color:#334452!important}.custom-site-page :is(h1,h2,h3,h4,strong,b,label){color:#e4edf4!important}.custom-site-page :is(p,small){color:#aab9c5!important}.custom-site-page input,.custom-site-page textarea,.custom-site-page select{background:#111a23!important;color:#e4edf4!important;border-color:#40515e!important}"
    : "";
  return `<!doctype html><html data-theme="${theme}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{margin:0;padding:20px;font-family:Arial,sans-serif;color:#17283a;background:#f7fbfd}.preview-note{padding:18px;border:1px dashed #9fb4c3;border-radius:8px;color:#617184;font-size:14px}</style>${safeCss ? `<style>${safeCss}</style>` : ""}${themeCss ? `<style>${themeCss}</style>` : ""}</head><body><div class="custom-site-page">${safeHtml || '<div class="preview-note">Paste HTML to see a live preview.</div>'}</div></body></html>`;
}

export default function AdminCodeEditor() {
  const { theme } = useTheme();
  const [pageId, setPageId] = useState(EDITABLE_PAGES[0].id);
  const [fileType, setFileType] = useState("html");
  const [content, setContent] = useState(() => getStoredContent(EDITABLE_PAGES[0].id));
  const [drafts, setDrafts] = useState({});
  const [message, setMessage] = useState("");
  const [formatting, setFormatting] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [githubToken, setGithubToken] = useState("");
  const [githubRepository, setGithubRepository] = useState("anjaneyuluj157-beep/spl2");
  const [githubBranch, setGithubBranch] = useState("main");
  const [publishing, setPublishing] = useState(false);
  const [isLoadingExisting, setIsLoadingExisting] = useState(
    () => !getPageOverride(EDITABLE_PAGES[0].id),
  );
  const [sourceVersion, setSourceVersion] = useState(0);
  const activePage = EDITABLE_PAGES.find((page) => page.id === pageId);
  const sourcePath = PAGE_SOURCE_PATHS[pageId];
  const preview = useMemo(
    () => makePreviewDocument(content.html, content.css, theme),
    [content.html, content.css, theme],
  );

  function closePublishDialog() {
    if (publishing) return;
    setGithubToken("");
    setPublishDialogOpen(false);
  }

  function changePage(nextPageId) {
    setPageId(nextPageId);
    const savedContent = getStoredContent(nextPageId);
    const draft = drafts[nextPageId];
    if (savedContent.html) {
      setContent(savedContent);
      setIsLoadingExisting(false);
      setMessage("Loaded your saved page code.");
    } else if (draft) {
      setContent(draft);
      setIsLoadingExisting(false);
      setMessage("Loaded your unsaved edits.");
    } else {
      setContent({ html: "", css: "" });
      setIsLoadingExisting(true);
      setMessage("Loading existing page code…");
      setSourceVersion((version) => version + 1);
    }
  }

  function changeCode(value) {
    setContent((current) => {
      const updated = { ...current, [fileType]: value };
      setDrafts((currentDrafts) => ({ ...currentDrafts, [pageId]: updated }));
      return updated;
    });
    setMessage("");
  }

  function loadExistingPage(event) {
    const pageDocument = event.currentTarget.contentDocument;
    window.setTimeout(() => {
      const main = pageId === "navbar"
        ? pageDocument?.querySelector("header nav")
        : pageDocument?.querySelector("main");
      if (!main || getPageOverride(pageId)) return;
      const existingContent = {
        html: main.innerHTML.trim(),
        css: extractPageCss(pageDocument, main),
      };
      setContent(existingContent);
      setDrafts((currentDrafts) => ({
        ...currentDrafts,
        [pageId]: existingContent,
      }));
      setIsLoadingExisting(false);
      setMessage("Existing page HTML and matching CSS loaded. Edit and save when ready.");
    }, 250);
  }

  function save() {
    if (!content.html.trim()) {
      setMessage("Add HTML before saving. Existing page content remains until then.");
      return;
    }
    setMessage(
      savePageOverride(pageId, content)
        ? "Saved. This page now uses your edited HTML and CSS in this browser."
        : "Could not save in browser storage. Check available storage and try again.",
    );
  }

  function restoreOriginal() {
    removePageOverride(pageId);
    setContent({ html: "", css: "" });
    setDrafts((currentDrafts) => {
      const nextDrafts = { ...currentDrafts };
      delete nextDrafts[pageId];
      return nextDrafts;
    });
    setIsLoadingExisting(true);
    setSourceVersion((version) => version + 1);
    setMessage("Reloading the original page source…");
  }

  async function formatCurrentFile() {
    setFormatting(true);
    try {
      const [prettier, parserPlugin] = fileType === "html"
        ? await Promise.all([import("prettier/standalone"), import("prettier/plugins/html")])
        : await Promise.all([import("prettier/standalone"), import("prettier/plugins/postcss")]);
      const formatted = await prettier.format(content[fileType], {
        parser: fileType === "html" ? "html" : "css",
        plugins: [parserPlugin],
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
      });
      changeCode(formatted);
      setMessage(`${fileType.toUpperCase()} formatted with Prettier.`);
    } catch (formatError) {
      setMessage(`Could not format this ${fileType.toUpperCase()} code: ${formatError.message}`);
    } finally {
      setFormatting(false);
    }
  }

  function encodeBase64(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return window.btoa(binary);
  }

  async function publishToGithub(event) {
    event.preventDefault();
    const repositoryParts = githubRepository.trim().replace(/^https:\/\/github\.com\//i, "").replace(/\.git$/i, "").split("/");
    const [owner, repository] = repositoryParts;
    if (repositoryParts.length !== 2 || !owner || !repository || !githubToken.trim() || !githubBranch.trim()) {
      setMessage("Enter a repository as owner/repository, its branch, and a GitHub token with Contents read/write access.");
      return;
    }

    setPublishing(true);
    setMessage("");
    try {
      const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/contents/public/site-edits.json`;
      const headers = {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken.trim()}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      };
      const query = new URLSearchParams({ ref: githubBranch.trim() });
      const currentFileResponse = await fetch(`${endpoint}?${query}`, { headers });
      let sha;
      if (currentFileResponse.ok) {
        sha = (await currentFileResponse.json()).sha;
      } else if (currentFileResponse.status !== 404) {
        const error = await currentFileResponse.json();
        throw new Error(error.message || "GitHub could not read the target file.");
      }

      const previousOverrides = getPageOverrides();
      const published = Object.fromEntries(
        Object.entries(previousOverrides)
          .filter(([, override]) => override && typeof override.html === "string")
          .map(([id, override]) => [id, {
            html: override.html,
            css: override.css || "",
          }]),
      );
      published[pageId] = { html: content.html, css: content.css };
      const savedLocally = savePageOverride(pageId, content);
      if (!savedLocally) throw new Error("Could not save the current edit in browser storage.");

      const putResponse = await fetch(endpoint, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: `Publish ${activePage?.name || "website page"} edits`,
          content: encodeBase64(`${JSON.stringify(published, null, 2)}\n`),
          branch: githubBranch.trim(),
          ...(sha ? { sha } : {}),
        }),
      });
      const result = await putResponse.json();
      if (!putResponse.ok) throw new Error(result.message || "GitHub rejected the commit.");

      updatePublishedPageOverrides(published);
      setGithubToken("");
      setPublishDialogOpen(false);
      setMessage(`Published to ${owner}/${repository}:${githubBranch}. Netlify will deploy after its GitHub build finishes.`);
    } catch (publishError) {
      setMessage(`GitHub publish failed: ${publishError.message}`);
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="admin-code-editor">
      <div className="admin-code-toolbar">
        <label className="admin-page-picker">
          <span>EDIT PAGE</span>
          <select value={pageId} onChange={(event) => changePage(event.target.value)}>
            {EDITABLE_PAGES.map((page) => <option key={page.id} value={page.id}>{page.name}</option>)}
          </select>
        </label>
        <div className="admin-code-actions">
          <button type="button" className="admin-code-secondary" onClick={formatCurrentFile} disabled={formatting}><WandSparkles size={15} /> {formatting ? "Formatting…" : "Format"}</button>
          <button type="button" className="admin-code-secondary" onClick={restoreOriginal}><RotateCcw size={15} /> Restore original</button>
          <button type="button" className="admin-primary-button admin-code-save" onClick={save}><Save size={15} /> Save page</button>
          <button type="button" className="admin-publish-button" onClick={() => setPublishDialogOpen(true)}><GitBranch size={16} /> Push to GitHub</button>
        </div>
      </div>

      <div className="admin-code-workspace">
        <iframe
          key={`${sourcePath}-${sourceVersion}`}
          className="admin-source-frame"
          title={`${activePage?.name} existing source`}
          src={`${sourcePath}?admin-source=${sourceVersion}`}
          onLoad={loadExistingPage}
          style={{ position: "fixed", left: "-10000px", top: 0, width: 1280, height: 900, opacity: 0, pointerEvents: "none", border: 0, zIndex: -1 }}
        />
        <section className="admin-code-pane">
          <div className="admin-code-pane-title"><span><Code2 size={16} /> {activePage?.name}</span><span className="admin-code-language">HTML + CSS</span></div>
          <div className="admin-code-tabs" role="tablist" aria-label="Page source files">
            <button type="button" role="tab" aria-selected={fileType === "html"} className={fileType === "html" ? "is-active" : ""} onClick={() => setFileType("html")}>index.html</button>
            <button type="button" role="tab" aria-selected={fileType === "css"} className={fileType === "css" ? "is-active" : ""} onClick={() => setFileType("css")}>styles.css</button>
          </div>
          <CodeMirror
            value={content[fileType]}
            height="calc(100vh - 310px)"
            theme={theme === "dark" ? vscodeDark : vscodeLight}
            extensions={[fileType === "html" ? html() : css()]}
            onChange={changeCode}
            editable={!isLoadingExisting}
            basicSetup={{ lineNumbers: true, foldGutter: true, autocompletion: true, highlightActiveLine: true }}
          />
          <div className="admin-code-status">{isLoadingExisting ? "Loading existing page code…" : message || "Edit the existing HTML/CSS · JavaScript is disabled"}</div>
        </section>

        <section className="admin-live-preview">
          <div className="admin-code-pane-title"><span><Eye size={16} /> Live preview</span><span className="admin-code-language">SANDBOXED</span></div>
          <iframe title={`${activePage?.name} code preview`} sandbox="" srcDoc={preview} />
          <p>Preview is isolated. Scripts and form submissions are disabled in preview only.</p>
        </section>
      </div>
      <div className="admin-code-footnote">Existing page markup and relevant CSS load automatically. Save to replace the selected page content; restore anytime. Service detail and Team profile edits apply to their shared templates.</div>

      {publishDialogOpen && <div className="admin-publish-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePublishDialog(); }}>
        <form className="admin-publish-dialog" onSubmit={publishToGithub}>
          <div className="admin-publish-dialog-heading"><span className="admin-publish-icon"><GitBranch size={20} /></span><button type="button" aria-label="Close publish dialog" onClick={closePublishDialog} disabled={publishing}>×</button></div>
          <span className="admin-eyebrow">PUBLISH WEBSITE CHANGES</span>
          <h2>Push page edits to GitHub</h2>
          <p>This creates a commit that updates <b>public/site-edits.json</b> on your chosen branch. Netlify publishes it for visitors if that branch is connected to an active deploy.</p>
          <label htmlFor="publish-repository">GitHub repository <span className="admin-publish-field-hint">Owner and repository name</span><input id="publish-repository" value={githubRepository} onChange={(event) => setGithubRepository(event.target.value)} placeholder="your-account/your-repository" autoComplete="off" spellCheck="false" required /></label>
          <label htmlFor="publish-branch">Target branch <span className="admin-publish-field-hint">The branch Netlify deploys</span><input id="publish-branch" value={githubBranch} onChange={(event) => setGithubBranch(event.target.value)} placeholder="main" autoComplete="off" spellCheck="false" required /></label>
          <label htmlFor="publish-token">Fine-grained personal access token <span className="admin-publish-field-hint">Select this repository and grant Contents: Read and write. <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">Create a token on GitHub ↗</a></span><input id="publish-token" type="password" autoComplete="new-password" value={githubToken} onChange={(event) => setGithubToken(event.target.value)} placeholder="github_pat_…" required /></label>
          <small className="admin-token-note">The token is sent directly to GitHub for this publish action and is not saved in local storage. Do not share it or paste it into the page editor.</small>
          <div className="admin-publish-dialog-actions"><button type="button" className="admin-code-secondary" onClick={closePublishDialog} disabled={publishing}>Cancel</button><button type="submit" className="admin-publish-button" disabled={publishing}><GitBranch size={15} /> {publishing ? "Pushing commit…" : "Commit to GitHub"}</button></div>
        </form>
      </div>}
    </div>
  );
}

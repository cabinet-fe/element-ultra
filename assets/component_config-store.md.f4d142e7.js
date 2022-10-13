import{_ as n,o as s,c as a,f as e}from"./app.61216854.js";const f='{"title":"\u5168\u5C40\u914D\u7F6E","description":"","frontmatter":{"title":"\u5168\u5C40\u914D\u7F6E","lang":"zh-CN"},"headers":[{"level":2,"title":"\u4F7F\u7528\u65B9\u5F0F","slug":"\u4F7F\u7528\u65B9\u5F0F"},{"level":2,"title":"\u6240\u6709\u914D\u7F6E\u5C5E\u6027","slug":"\u6240\u6709\u914D\u7F6E\u5C5E\u6027"}],"relativePath":"component/config-store.md"}',t={},p=e(`<h1 id="useconfig-\u5168\u5C40\u914D\u7F6E" tabindex="-1">useConfig \u5168\u5C40\u914D\u7F6E <a class="header-anchor" href="#useconfig-\u5168\u5C40\u914D\u7F6E" aria-hidden="true">#</a></h1><p>useConfig\u662F\u4E00\u4E2A\u63D0\u4F9B\u4E86\u5168\u5C40\u914D\u7F6E\u7684\u7EC4\u5408\u5F0F\u65B9\u6CD5, \u901A\u5E38\u5EFA\u8BAE\u4F60\u5728\u9879\u76EE\u7684\u5165\u53E3\u6587\u4EF6\u5904\u5C06\u5176\u914D\u7F6E\u5B8C\u6BD5.</p><p>\u5E95\u5C42\u4F7F\u7528reactive, \u6613\u7528\u4E14\u6613\u8BFB</p><h2 id="\u4F7F\u7528\u65B9\u5F0F" tabindex="-1">\u4F7F\u7528\u65B9\u5F0F <a class="header-anchor" href="#\u4F7F\u7528\u65B9\u5F0F" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;element-ultra&#39;</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span><span class="token punctuation">,</span> setConfigStore<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">setConfigStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  size<span class="token operator">:</span> <span class="token string">&#39;large&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="\u6240\u6709\u914D\u7F6E\u5C5E\u6027" tabindex="-1">\u6240\u6709\u914D\u7F6E\u5C5E\u6027 <a class="header-anchor" href="#\u6240\u6709\u914D\u7F6E\u5C5E\u6027" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">interface</span> <span class="token class-name">ConfigStore</span> <span class="token punctuation">{</span>
  <span class="token comment">/** \u5168\u5C40\u7EC4\u4EF6\u5C3A\u5BF8 */</span>
  size<span class="token operator">?</span><span class="token operator">:</span> <span class="token string">&#39;large&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;default&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;small&#39;</span>
  <span class="token comment">/** \u96C6\u6210\u8868\u683C\u7684api\u4F7F\u7528\u7684\u8BF7\u6C42\u65B9\u6CD5 */</span>
  proTableRequestMethod<span class="token operator">?</span><span class="token operator">:</span> ProTableRequestMethod
  <span class="token comment">/** \u96C6\u6210\u8868\u683C\u5206\u9875\u9ED8\u8BA4\u5927\u5C0F */</span>
  proTableDefaultSize<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token comment">/** \u65AD\u70B9 */</span>
  breakpoint<span class="token operator">:</span> <span class="token punctuation">{</span> xs<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> s<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> m<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> l<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> xl<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span>
  <span class="token comment">/** \u8868\u683C\u9009\u62E9\u5668 */</span>
  tableSelectRequestMethod<span class="token operator">?</span><span class="token operator">:</span> TableSelectRequestMethod
  <span class="token comment">/** \u6D88\u606F\u5F39\u6846 */</span>
  message<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    max<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/** zIndex */</span>
  zIndex<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token comment">/** \u547D\u540D\u7A7A\u95F4, \u9ED8\u8BA4el */</span>
  namespace<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u5168\u5C40\u914D\u7F6E\u540E\u7EED\u8FD8\u4F1A\u7EE7\u7EED\u66F4\u65B0, \u53C2\u8003\u6B64<a href="https://github.com/cabinet-fe/element-pro/blob/main/packages/hooks/use-config/index.ts" target="_blank" rel="noopener noreferrer">\u6587\u4EF6</a>\u6765\u67E5\u770B\u6700\u65B0\u7684\u914D\u7F6E</p>`,8),o=[p];function c(l,r,i,u,k,d){return s(),a("div",null,o)}var g=n(t,[["render",c]]);export{f as __pageData,g as default};

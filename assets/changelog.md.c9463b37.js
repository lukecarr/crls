import{_ as s,c as a,o as n,a as l}from"./app.182ff1de.js";const A=JSON.parse('{"title":"Changelog","description":"","frontmatter":{},"headers":[{"level":2,"title":"2.0.0","slug":"_2-0-0","link":"#_2-0-0","children":[{"level":3,"title":"Simplified security expression","slug":"simplified-security-expression","link":"#simplified-security-expression","children":[]}]},{"level":2,"title":"1.0.0","slug":"_1-0-0","link":"#_1-0-0","children":[]}],"relativePath":"changelog.md","lastUpdated":1667770015000}'),o={name:"changelog.md"},p=l(`<h1 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-hidden="true">#</a></h1><p>Please visit the <a href="https://github.com/lukecarr/crls/releases" target="_blank" rel="noreferrer">CRLS release page</a> for all historical releases.</p><h2 id="_2-0-0" tabindex="-1"><a href="https://github.com/lukecarr/crls/releases/tag/v2.0.0" target="_blank" rel="noreferrer">2.0.0</a> <a class="header-anchor" href="#_2-0-0" aria-hidden="true">#</a></h2><p>Published on Sun Nov 06 2022.</p><h3 id="simplified-security-expression" tabindex="-1">Simplified security expression <a class="header-anchor" href="#simplified-security-expression" aria-hidden="true">#</a></h3><p>This update introduces a revamped security expression that combines column and row-level security into one function parameter.</p><p><strong>v1.0.0</strong>:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> withCRLS </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">crls</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BlogPost</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> security: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">row</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">author</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">column</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">luke</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Set</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">author</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Set</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">author</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p><strong>v2.0.0</strong>:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> withCRLS </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">crls</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BlogPost</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">author</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">username</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">luke</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Set</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">author</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="_1-0-0" tabindex="-1"><a href="https://github.com/lukecarr/crls/releases/tag/v1.0.0" target="_blank" rel="noreferrer">1.0.0</a> <a class="header-anchor" href="#_1-0-0" aria-hidden="true">#</a></h2><p>Published on Sun Oct 16 2022.</p><p>This tag marks the initial release of CRLS.</p>`,13),e=[p];function t(r,c,F,D,y,i){return n(),a("div",null,e)}const h=s(o,[["render",t]]);export{A as __pageData,h as default};

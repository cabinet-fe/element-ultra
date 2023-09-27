var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// .vitepress/config/head.ts
var head = [
  [
    "link",
    {
      rel: "stylesheet",
      href: "//fonts.loli.net/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap"
    }
  ],
  [
    "link",
    {
      rel: "stylesheet",
      href: "//unpkg.com/nprogress@0.2.0/nprogress.css"
    }
  ],
  [
    "script",
    {
      async: "true",
      src: "https://www.googletagmanager.com/gtag/js?id=UA-175337989-1"
    }
  ],
  [
    "script",
    {},
    `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-175337989-1');`
  ]
];

// .vitepress/config/sidebars.ts
var sidebars = {
  "/guide/": [
    {
      text: "\u57FA\u7840",
      children: [
        {
          text: "\u8BBE\u8BA1",
          link: "/guide/design"
        },
        {
          text: "\u5BFC\u822A",
          link: "/guide/nav"
        },
        {
          text: "\u5B89\u88C5",
          link: "/guide/installation"
        },
        {
          text: "\u5FEB\u901F\u5F00\u59CB",
          link: "/guide/quickstart"
        },
        {
          text: "css\u53D8\u91CF",
          link: "/guide/css-var"
        }
      ]
    },
    {
      text: "\u8FDB\u9636",
      children: [
        {
          text: "\u4ECE Element UI \u5347\u7EA7",
          link: "/guide/migration"
        },
        {
          text: "\u4E3B\u9898",
          link: "/guide/theming"
        },
        {
          text: "\u5185\u7F6E\u8FC7\u6E21\u52A8\u753B",
          link: "/guide/transitions"
        },
        {
          text: "\u66F4\u65B0\u65E5\u5FD7",
          link: "/guide/changelog"
        }
      ]
    }
  ],
  "/component/": [
    {
      text: "Basic \u57FA\u7840\u7EC4\u4EF6",
      children: [
        {
          link: "/component/button",
          text: "Button \u6309\u94AE"
        },
        {
          link: "/component/border",
          text: "Border \u8FB9\u6846"
        },
        {
          link: "/component/color",
          text: "Color \u8272\u5F69"
        },
        {
          link: "/component/container",
          text: "Container \u5E03\u5C40\u5BB9\u5668"
        },
        {
          link: "/component/icon",
          text: "Icon \u56FE\u6807"
        },
        {
          link: "/component/layout",
          text: "Layout \u5E03\u5C40"
        },
        {
          link: "/component/link",
          text: "Link \u94FE\u63A5"
        },
        {
          link: "/component/scrollbar",
          text: "Scrollbar \u6EDA\u52A8\u6761"
        },
        {
          link: "/component/space",
          text: "Space \u95F4\u8DDD"
        },
        {
          link: "/component/typography",
          text: "Typography \u6392\u7248"
        }
      ]
    },
    {
      text: "\u914D\u7F6E\u7EC4\u4EF6",
      children: [
        {
          link: "/component/config-store",
          text: "Config \u5168\u5C40\u914D\u7F6E(\u65B0)"
        }
      ]
    },
    {
      text: "Form \u8868\u5355\u7EC4\u4EF6",
      children: [
        {
          link: "/component/cascade",
          text: "Cascade \u7EA7\u8054\u9009\u62E9\u5668"
        },
        {
          link: "/component/checkbox",
          text: "Checkbox \u591A\u9009\u6846"
        },
        {
          link: "/component/color-picker",
          text: "Color Picker \u53D6\u8272\u5668"
        },
        {
          link: "/component/date-picker",
          text: "Date Picker \u65E5\u671F\u9009\u62E9\u5668"
        },
        {
          link: "/component/datetime-picker",
          text: "DateTime Picker \u65E5\u671F\u65F6\u95F4\u9009\u62E9\u5668"
        },
        {
          link: "/component/form",
          text: "Form \u8868\u5355"
        },
        {
          link: "/component/input",
          text: "Input \u8F93\u5165\u6846"
        },
        {
          link: "/component/batch-input",
          text: "BatchInput \u6279\u91CF\u8F93\u5165"
        },
        {
          link: "/component/input-number",
          text: "Input Number \u6570\u5B57\u8F93\u5165\u6846"
        },
        {
          link: "/component/textarea",
          text: "Textarea \u6587\u672C\u57DF"
        },
        {
          link: "/component/radio",
          text: "Radio \u5355\u9009\u6846"
        },
        {
          link: "/component/rate",
          text: "Rate \u8BC4\u5206"
        },
        {
          link: "/component/select",
          text: "Select \u9009\u62E9\u5668"
        },
        {
          link: "/component/slider",
          text: "Slider \u6ED1\u5757"
        },
        {
          link: "/component/switch",
          text: "Switch \u5F00\u5173"
        },
        {
          link: "/component/time-picker",
          text: "Time Picker \u65F6\u95F4\u9009\u62E9\u5668"
        },
        {
          link: "/component/time-select",
          text: "Time Select \u65F6\u95F4\u9009\u62E9"
        },
        {
          link: "/component/transfer",
          text: "Transfer \u7A7F\u68AD\u6846"
        },
        {
          link: "/component/upload",
          text: "Upload \u4E0A\u4F20"
        }
      ]
    },
    {
      text: "Data \u6570\u636E\u5C55\u793A",
      children: [
        {
          link: "/component/avatar",
          text: "Avatar \u5934\u50CF"
        },
        {
          link: "/component/badge",
          text: "Badge \u5FBD\u7AE0"
        },
        {
          link: "/component/calendar",
          text: "Calendar \u65E5\u5386"
        },
        {
          link: "/component/card",
          text: "Card \u5361\u7247"
        },
        {
          link: "/component/carousel",
          text: "Carousel \u8D70\u9A6C\u706F"
        },
        {
          link: "/component/collapse",
          text: "Collapse \u6298\u53E0\u9762\u677F"
        },
        {
          link: "/component/descriptions",
          text: "Descriptions \u63CF\u8FF0\u5217\u8868"
        },
        {
          link: "/component/empty",
          text: "Empty \u7A7A\u72B6\u6001"
        },
        {
          link: "/component/image",
          text: "Image \u56FE\u7247"
        },
        {
          link: "/component/infinite-scroll",
          text: "Infinite Scroll \u65E0\u9650\u6EDA\u52A8"
        },
        {
          link: "/component/pagination",
          text: "Pagination \u5206\u9875"
        },
        {
          link: "/component/progress",
          text: "Progress \u8FDB\u5EA6\u6761"
        },
        {
          link: "/component/result",
          text: "Result \u7ED3\u679C"
        },
        {
          link: "/component/skeleton",
          text: "Skeleton \u9AA8\u67B6\u5C4F"
        },
        {
          link: "/component/table",
          text: "Table \u8868\u683C"
        },
        {
          link: "/component/data-table",
          text: "DataTable \u6570\u636E\u8868\u683C"
        },
        {
          link: "/component/tag",
          text: "Tag \u6807\u7B7E"
        },
        {
          link: "/component/timeline",
          text: "Timeline \u65F6\u95F4\u7EBF"
        },
        {
          link: "/component/tree",
          text: "Tree \u6811\u5F62\u63A7\u4EF6"
        },
        {
          link: "/component/tree-select",
          text: "TreeSelect \u6811\u5F62\u9009\u62E9\u5668"
        }
      ]
    },
    {
      text: "Navigation \u5BFC\u822A",
      children: [
        {
          link: "/component/affix",
          text: "Affix \u56FA\u9489"
        },
        {
          link: "/component/backtop",
          text: "Backtop \u56DE\u5230\u9876\u90E8"
        },
        {
          link: "/component/breadcrumb",
          text: "Breadcrumb \u9762\u5305\u5C51"
        },
        {
          link: "/component/dropdown",
          text: "Dropdown \u4E0B\u62C9\u83DC\u5355"
        },
        {
          link: "/component/menu",
          text: "Menu \u83DC\u5355"
        },
        {
          link: "/component/page",
          text: "Page \u9875\u9762"
        },
        {
          link: "/component/page-header",
          text: "Page Header \u9875\u5934"
        },
        {
          link: "/component/steps",
          text: "Steps \u6B65\u9AA4\u6761"
        },
        {
          link: "/component/tabs",
          text: "Tabs \u6807\u7B7E\u9875"
        }
      ]
    },
    {
      text: "Feedback \u53CD\u9988\u7EC4\u4EF6",
      children: [
        {
          link: "/component/alert",
          text: "Alert \u63D0\u793A"
        },
        {
          link: "/component/dialog",
          text: "Dialog \u5BF9\u8BDD\u6846"
        },
        {
          link: "/component/drawer",
          text: "Drawer \u62BD\u5C49"
        },
        {
          link: "/component/loading",
          text: "Loading \u52A0\u8F7D"
        },
        {
          link: "/component/message",
          text: "Message \u6D88\u606F\u63D0\u793A"
        },
        {
          link: "/component/message-box",
          text: "Message Box \u6D88\u606F\u5F39\u51FA\u6846"
        },
        {
          link: "/component/notification",
          text: "Notification \u901A\u77E5"
        },
        {
          link: "/component/popconfirm",
          text: "Pop Confirm \u5F39\u51FA\u786E\u8BA4\u6846"
        },
        {
          link: "/component/popover",
          text: "Popover \u5F39\u51FA\u6846"
        },
        {
          link: "/component/tooltip",
          text: "Tooltip \u6587\u5B57\u63D0\u793A"
        },
        {
          link: "/component/action",
          text: "Action \u64CD\u4F5C\u6309\u94AE"
        }
      ]
    },
    {
      text: "Others \u5176\u4ED6",
      children: [
        {
          link: "/component/divider",
          text: "Divider \u5206\u5272\u7EBF"
        }
      ]
    },
    {
      text: "Integrated \u96C6\u6210\u7EC4\u4EF6",
      children: [
        {
          link: "/component/pro-table",
          text: "ProTable \u96C6\u6210\u8868\u683C"
        },
        {
          link: "/component/form-dialog",
          text: "FormDialog \u8868\u5355\u5F39\u6846"
        },
        {
          link: "/component/multiple-form",
          text: "MultipleForm \u591A\u884C\u8868\u5355"
        },
        {
          link: "/component/edit-bar",
          text: "EditBar \u7F16\u8F91\u680F"
        },
        {
          link: "/component/table-select",
          text: "TableSelect \u8868\u683C\u9009\u62E9\u7EC4\u4EF6"
        }
      ]
    }
  ]
};

// .vitepress/utils/shared.ts
var BASE_PATH = "/element-ultra/";

// .vitepress/config/nav.ts
var addPrefix = (arr) => {
  let base = BASE_PATH.slice(0, -1);
  return arr.map((item) => {
    return {
      ...item,
      link: base + item.link,
      activeMatch: base + item.activeMatch
    };
  });
};
var nav = addPrefix([
  { text: "\u6307\u5357", link: "/guide/design", activeMatch: "/guide/" },
  {
    text: "\u7EC4\u4EF6",
    link: "/component/button",
    activeMatch: "/component/"
  },
  {
    text: "\u8D44\u6E90",
    link: "/resource/index",
    activeMatch: "/resource/"
  }
]);

// .vitepress/config/plugins.ts
import path2 from "path";
import fs from "fs";
import MarkdownIt from "file:///D:/codes/element-ultra/node_modules/.pnpm/markdown-it@12.3.2/node_modules/markdown-it/index.js";
import mdContainer from "file:///D:/codes/element-ultra/node_modules/.pnpm/markdown-it-container@3.0.0/node_modules/markdown-it-container/index.js";

// .vitepress/utils/highlight.ts
import chalk from "file:///D:/codes/element-ultra/node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/index.js";
import escapeHtml from "file:///D:/codes/element-ultra/node_modules/.pnpm/escape-html@1.0.3/node_modules/escape-html/index.js";
import prism from "file:///D:/codes/element-ultra/node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/prism.js";
var loadLanguages = __require("file:///D:/codes/element-ultra/node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/index.js");
loadLanguages(["markup", "css", "javascript"]);
function wrap(code, lang) {
  if (lang === "text") {
    code = escapeHtml(code);
  }
  return `<pre v-pre><code>${code}</code></pre>`;
}
var highlight = (str, lang) => {
  if (!lang) {
    return wrap(str, "text");
  }
  lang = lang.toLowerCase();
  const rawLang = lang;
  if (lang === "vue" || lang === "html") {
    lang = "markup";
  }
  if (lang === "md") {
    lang = "markdown";
  }
  if (lang === "ts") {
    lang = "typescript";
  }
  if (lang === "py") {
    lang = "python";
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang]);
    } catch (e) {
      console.warn(
        chalk.yellow(
          `[vitepress] Syntax highlight for language "${lang}" is not supported.`
        )
      );
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang);
    return wrap(code, rawLang);
  }
  return wrap(str, "text");
};

// .vitepress/utils/paths.ts
import path from "path";
var __vite_injected_original_dirname = "D:\\codes\\element-ultra\\docs\\.vitepress\\utils";
var vpRoot = path.resolve(__vite_injected_original_dirname, "..");
var docRoot = path.resolve(vpRoot, "..");
var projRoot = path.resolve(docRoot, "..");

// .vitepress/config/plugins.ts
var localMd = MarkdownIt();
var mdPlugin = (md) => {
  md.use(mdContainer, "demo", {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      var _a;
      const token = tokens[idx];
      const m = token.info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : "";
        const sourceFileToken = tokens[idx + 2];
        let source = "";
        const sourceFile = ((_a = sourceFileToken.children) == null ? void 0 : _a[0].content) ?? "";
        if (sourceFileToken.type === "inline") {
          source = fs.readFileSync(
            path2.resolve(docRoot, "examples", `${sourceFile}.vue`),
            "utf-8"
          );
        }
        if (!source)
          throw new Error(`\u9519\u8BEF\u7684\u6E90\u6587\u4EF6: ${sourceFile}`);
        return `<Demo :demos="demos" source="${encodeURIComponent(
          highlight(source, "vue")
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(localMd.render(description))}">`;
      } else {
        return "</Demo>";
      }
    }
  });
};

// .vitepress/config.ts
console.log(`DOC_ENV: ${process.env.DOC_ENV}`);
var config = {
  title: "Element Ultra",
  description: "\u4E00\u4E2A\u4E13\u4E3A\u8BBE\u8BA1\u5E08\u548C\u5F00\u53D1\u8005\u6253\u9020\u7684Vue3\u7EC4\u4EF6\u5E93",
  head,
  lang: "zh-CN",
  base: BASE_PATH,
  themeConfig: {
    repo: "cabinet-fe/element-ultra",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",
    sidebars,
    nav
    // agolia: {
    //   apiKey: '377f2b647a96d9b1d62e4780f2344da2',
    //   appId: 'BH4D9OD16A',
    // },
  },
  markdown: {
    config: (md) => {
      return mdPlugin(md);
    }
  },
  vue: {
    // template: {
    //   ssr: true,
    //   compilerOptions: {
    //     directiveTransforms: buildTransformers(),
    //   },
    // },
  }
};
var config_default = config;
export {
  config,
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcvaGVhZC50cyIsICIudml0ZXByZXNzL2NvbmZpZy9zaWRlYmFycy50cyIsICIudml0ZXByZXNzL3V0aWxzL3NoYXJlZC50cyIsICIudml0ZXByZXNzL2NvbmZpZy9uYXYudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvcGx1Z2lucy50cyIsICIudml0ZXByZXNzL3V0aWxzL2hpZ2hsaWdodC50cyIsICIudml0ZXByZXNzL3V0aWxzL3BhdGhzLnRzIiwgIi52aXRlcHJlc3MvY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29kZXNcXFxcZWxlbWVudC11bHRyYVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFxlbGVtZW50LXVsdHJhXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxcaGVhZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZXMvZWxlbWVudC11bHRyYS9kb2NzLy52aXRlcHJlc3MvY29uZmlnL2hlYWQudHNcIjtcbmltcG9ydCB0eXBlIHsgSGVhZENvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcblxuLy8gaGVhZFx1NjgwN1x1N0I3RVx1NEUyRFx1NzY4NFx1NEUxQ1x1ODk3RlxuZXhwb3J0IGNvbnN0IGhlYWQ6IEhlYWRDb25maWdbXSA9IFtcblxuICBbXG4gICAgJ2xpbmsnLFxuICAgIHtcbiAgICAgIHJlbDogJ3N0eWxlc2hlZXQnLFxuICAgICAgaHJlZjogJy8vZm9udHMubG9saS5uZXQvY3NzP2ZhbWlseT1JbnRlcjozMDAsNDAwLDUwMCw2MDB8T3BlbitTYW5zOjQwMCw2MDA7ZGlzcGxheT1zd2FwJyxcbiAgICB9LFxuICBdLFxuICBbXG4gICAgJ2xpbmsnLFxuICAgIHtcbiAgICAgIHJlbDogJ3N0eWxlc2hlZXQnLFxuICAgICAgaHJlZjogJy8vdW5wa2cuY29tL25wcm9ncmVzc0AwLjIuMC9ucHJvZ3Jlc3MuY3NzJyxcbiAgICB9LFxuICBdLFxuXG4gIFtcbiAgICAnc2NyaXB0JyxcbiAgICB7XG4gICAgICBhc3luYzogJ3RydWUnLFxuICAgICAgc3JjOiAnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcz9pZD1VQS0xNzUzMzc5ODktMScsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgICdzY3JpcHQnLFxuICAgIHt9LFxuICAgIGB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcbmZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31cbmd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG5ndGFnKCdjb25maWcnLCAnVUEtMTc1MzM3OTg5LTEnKTtgLFxuICBdLFxuXVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFxlbGVtZW50LXVsdHJhXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVzXFxcXGVsZW1lbnQtdWx0cmFcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxzaWRlYmFycy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZXMvZWxlbWVudC11bHRyYS9kb2NzLy52aXRlcHJlc3MvY29uZmlnL3NpZGViYXJzLnRzXCI7ZXhwb3J0IGNvbnN0IHNpZGViYXJzID0ge1xuICAnL2d1aWRlLyc6IFtcbiAgICB7XG4gICAgICB0ZXh0OiAnXHU1N0ZBXHU3ODQwJyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU4QkJFXHU4QkExJyxcbiAgICAgICAgICBsaW5rOiAnL2d1aWRlL2Rlc2lnbidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTVCRkNcdTgyMkEnLFxuICAgICAgICAgIGxpbms6ICcvZ3VpZGUvbmF2J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1NUI4OVx1ODhDNScsXG4gICAgICAgICAgbGluazogJy9ndWlkZS9pbnN0YWxsYXRpb24nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU1RkVCXHU5MDFGXHU1RjAwXHU1OUNCJyxcbiAgICAgICAgICBsaW5rOiAnL2d1aWRlL3F1aWNrc3RhcnQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnY3NzXHU1M0Q4XHU5MUNGJyxcbiAgICAgICAgICBsaW5rOiAnL2d1aWRlL2Nzcy12YXInXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdcdThGREJcdTk2MzYnLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTRFQ0UgRWxlbWVudCBVSSBcdTUzNDdcdTdFQTcnLFxuICAgICAgICAgIGxpbms6ICcvZ3VpZGUvbWlncmF0aW9uJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1NEUzQlx1OTg5OCcsXG4gICAgICAgICAgbGluazogJy9ndWlkZS90aGVtaW5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1NTE4NVx1N0Y2RVx1OEZDN1x1NkUyMVx1NTJBOFx1NzUzQicsXG4gICAgICAgICAgbGluazogJy9ndWlkZS90cmFuc2l0aW9ucydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTY2RjRcdTY1QjBcdTY1RTVcdTVGRDcnLFxuICAgICAgICAgIGxpbms6ICcvZ3VpZGUvY2hhbmdlbG9nJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdLFxuICAnL2NvbXBvbmVudC8nOiBbXG4gICAge1xuICAgICAgdGV4dDogJ0Jhc2ljIFx1NTdGQVx1Nzg0MFx1N0VDNFx1NEVGNicsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvYnV0dG9uJyxcbiAgICAgICAgICB0ZXh0OiAnQnV0dG9uIFx1NjMwOVx1OTRBRSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2JvcmRlcicsXG4gICAgICAgICAgdGV4dDogJ0JvcmRlciBcdThGQjlcdTY4NDYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9jb2xvcicsXG4gICAgICAgICAgdGV4dDogJ0NvbG9yIFx1ODI3Mlx1NUY2OSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2NvbnRhaW5lcicsXG4gICAgICAgICAgdGV4dDogJ0NvbnRhaW5lciBcdTVFMDNcdTVDNDBcdTVCQjlcdTU2NjgnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9pY29uJyxcbiAgICAgICAgICB0ZXh0OiAnSWNvbiBcdTU2RkVcdTY4MDcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9sYXlvdXQnLFxuICAgICAgICAgIHRleHQ6ICdMYXlvdXQgXHU1RTAzXHU1QzQwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvbGluaycsXG4gICAgICAgICAgdGV4dDogJ0xpbmsgXHU5NEZFXHU2M0E1J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvc2Nyb2xsYmFyJyxcbiAgICAgICAgICB0ZXh0OiAnU2Nyb2xsYmFyIFx1NkVEQVx1NTJBOFx1Njc2MSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3NwYWNlJyxcbiAgICAgICAgICB0ZXh0OiAnU3BhY2UgXHU5NUY0XHU4REREJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvdHlwb2dyYXBoeScsXG4gICAgICAgICAgdGV4dDogJ1R5cG9ncmFwaHkgXHU2MzkyXHU3MjQ4J1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnXHU5MTREXHU3RjZFXHU3RUM0XHU0RUY2JyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9jb25maWctc3RvcmUnLFxuICAgICAgICAgIHRleHQ6ICdDb25maWcgXHU1MTY4XHU1QzQwXHU5MTREXHU3RjZFKFx1NjVCMCknXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdGb3JtIFx1ODg2OFx1NTM1NVx1N0VDNFx1NEVGNicsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvY2FzY2FkZScsXG4gICAgICAgICAgdGV4dDogJ0Nhc2NhZGUgXHU3RUE3XHU4MDU0XHU5MDA5XHU2MkU5XHU1NjY4J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvY2hlY2tib3gnLFxuICAgICAgICAgIHRleHQ6ICdDaGVja2JveCBcdTU5MUFcdTkwMDlcdTY4NDYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9jb2xvci1waWNrZXInLFxuICAgICAgICAgIHRleHQ6ICdDb2xvciBQaWNrZXIgXHU1M0Q2XHU4MjcyXHU1NjY4J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvZGF0ZS1waWNrZXInLFxuICAgICAgICAgIHRleHQ6ICdEYXRlIFBpY2tlciBcdTY1RTVcdTY3MUZcdTkwMDlcdTYyRTlcdTU2NjgnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9kYXRldGltZS1waWNrZXInLFxuICAgICAgICAgIHRleHQ6ICdEYXRlVGltZSBQaWNrZXIgXHU2NUU1XHU2NzFGXHU2NUY2XHU5NUY0XHU5MDA5XHU2MkU5XHU1NjY4J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvZm9ybScsXG4gICAgICAgICAgdGV4dDogJ0Zvcm0gXHU4ODY4XHU1MzU1J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvaW5wdXQnLFxuICAgICAgICAgIHRleHQ6ICdJbnB1dCBcdThGOTNcdTUxNjVcdTY4NDYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9iYXRjaC1pbnB1dCcsXG4gICAgICAgICAgdGV4dDogJ0JhdGNoSW5wdXQgXHU2Mjc5XHU5MUNGXHU4RjkzXHU1MTY1J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvaW5wdXQtbnVtYmVyJyxcbiAgICAgICAgICB0ZXh0OiAnSW5wdXQgTnVtYmVyIFx1NjU3MFx1NUI1N1x1OEY5M1x1NTE2NVx1Njg0NidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3RleHRhcmVhJyxcbiAgICAgICAgICB0ZXh0OiAnVGV4dGFyZWEgXHU2NTg3XHU2NzJDXHU1N0RGJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvcmFkaW8nLFxuICAgICAgICAgIHRleHQ6ICdSYWRpbyBcdTUzNTVcdTkwMDlcdTY4NDYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9yYXRlJyxcbiAgICAgICAgICB0ZXh0OiAnUmF0ZSBcdThCQzRcdTUyMDYnXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3NlbGVjdCcsXG4gICAgICAgICAgdGV4dDogJ1NlbGVjdCBcdTkwMDlcdTYyRTlcdTU2NjgnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9zbGlkZXInLFxuICAgICAgICAgIHRleHQ6ICdTbGlkZXIgXHU2RUQxXHU1NzU3J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvc3dpdGNoJyxcbiAgICAgICAgICB0ZXh0OiAnU3dpdGNoIFx1NUYwMFx1NTE3MydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3RpbWUtcGlja2VyJyxcbiAgICAgICAgICB0ZXh0OiAnVGltZSBQaWNrZXIgXHU2NUY2XHU5NUY0XHU5MDA5XHU2MkU5XHU1NjY4J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvdGltZS1zZWxlY3QnLFxuICAgICAgICAgIHRleHQ6ICdUaW1lIFNlbGVjdCBcdTY1RjZcdTk1RjRcdTkwMDlcdTYyRTknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC90cmFuc2ZlcicsXG4gICAgICAgICAgdGV4dDogJ1RyYW5zZmVyIFx1N0E3Rlx1NjhBRFx1Njg0NidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3VwbG9hZCcsXG4gICAgICAgICAgdGV4dDogJ1VwbG9hZCBcdTRFMEFcdTRGMjAnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdEYXRhIFx1NjU3MFx1NjM2RVx1NUM1NVx1NzkzQScsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvYXZhdGFyJyxcbiAgICAgICAgICB0ZXh0OiAnQXZhdGFyIFx1NTkzNFx1NTBDRidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2JhZGdlJyxcbiAgICAgICAgICB0ZXh0OiAnQmFkZ2UgXHU1RkJEXHU3QUUwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvY2FsZW5kYXInLFxuICAgICAgICAgIHRleHQ6ICdDYWxlbmRhciBcdTY1RTVcdTUzODYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9jYXJkJyxcbiAgICAgICAgICB0ZXh0OiAnQ2FyZCBcdTUzNjFcdTcyNDcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9jYXJvdXNlbCcsXG4gICAgICAgICAgdGV4dDogJ0Nhcm91c2VsIFx1OEQ3MFx1OUE2Q1x1NzA2RidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2NvbGxhcHNlJyxcbiAgICAgICAgICB0ZXh0OiAnQ29sbGFwc2UgXHU2Mjk4XHU1M0UwXHU5NzYyXHU2NzdGJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvZGVzY3JpcHRpb25zJyxcbiAgICAgICAgICB0ZXh0OiAnRGVzY3JpcHRpb25zIFx1NjNDRlx1OEZGMFx1NTIxN1x1ODg2OCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2VtcHR5JyxcbiAgICAgICAgICB0ZXh0OiAnRW1wdHkgXHU3QTdBXHU3MkI2XHU2MDAxJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvaW1hZ2UnLFxuICAgICAgICAgIHRleHQ6ICdJbWFnZSBcdTU2RkVcdTcyNDcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9pbmZpbml0ZS1zY3JvbGwnLFxuICAgICAgICAgIHRleHQ6ICdJbmZpbml0ZSBTY3JvbGwgXHU2NUUwXHU5NjUwXHU2RURBXHU1MkE4J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvcGFnaW5hdGlvbicsXG4gICAgICAgICAgdGV4dDogJ1BhZ2luYXRpb24gXHU1MjA2XHU5ODc1J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvcHJvZ3Jlc3MnLFxuICAgICAgICAgIHRleHQ6ICdQcm9ncmVzcyBcdThGREJcdTVFQTZcdTY3NjEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9yZXN1bHQnLFxuICAgICAgICAgIHRleHQ6ICdSZXN1bHQgXHU3RUQzXHU2NzlDJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvc2tlbGV0b24nLFxuICAgICAgICAgIHRleHQ6ICdTa2VsZXRvbiBcdTlBQThcdTY3QjZcdTVDNEYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC90YWJsZScsXG4gICAgICAgICAgdGV4dDogJ1RhYmxlIFx1ODg2OFx1NjgzQydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2RhdGEtdGFibGUnLFxuICAgICAgICAgIHRleHQ6ICdEYXRhVGFibGUgXHU2NTcwXHU2MzZFXHU4ODY4XHU2ODNDJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvdGFnJyxcbiAgICAgICAgICB0ZXh0OiAnVGFnIFx1NjgwN1x1N0I3RSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3RpbWVsaW5lJyxcbiAgICAgICAgICB0ZXh0OiAnVGltZWxpbmUgXHU2NUY2XHU5NUY0XHU3RUJGJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvdHJlZScsXG4gICAgICAgICAgdGV4dDogJ1RyZWUgXHU2ODExXHU1RjYyXHU2M0E3XHU0RUY2J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvdHJlZS1zZWxlY3QnLFxuICAgICAgICAgIHRleHQ6ICdUcmVlU2VsZWN0IFx1NjgxMVx1NUY2Mlx1OTAwOVx1NjJFOVx1NTY2OCdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ05hdmlnYXRpb24gXHU1QkZDXHU4MjJBJyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9hZmZpeCcsXG4gICAgICAgICAgdGV4dDogJ0FmZml4IFx1NTZGQVx1OTQ4OSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2JhY2t0b3AnLFxuICAgICAgICAgIHRleHQ6ICdCYWNrdG9wIFx1NTZERVx1NTIzMFx1OTg3Nlx1OTBFOCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2JyZWFkY3J1bWInLFxuICAgICAgICAgIHRleHQ6ICdCcmVhZGNydW1iIFx1OTc2Mlx1NTMwNVx1NUM1MSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2Ryb3Bkb3duJyxcbiAgICAgICAgICB0ZXh0OiAnRHJvcGRvd24gXHU0RTBCXHU2MkM5XHU4M0RDXHU1MzU1J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvbWVudScsXG4gICAgICAgICAgdGV4dDogJ01lbnUgXHU4M0RDXHU1MzU1J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvcGFnZScsXG4gICAgICAgICAgdGV4dDogJ1BhZ2UgXHU5ODc1XHU5NzYyJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvcGFnZS1oZWFkZXInLFxuICAgICAgICAgIHRleHQ6ICdQYWdlIEhlYWRlciBcdTk4NzVcdTU5MzQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9zdGVwcycsXG4gICAgICAgICAgdGV4dDogJ1N0ZXBzIFx1NkI2NVx1OUFBNFx1Njc2MSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3RhYnMnLFxuICAgICAgICAgIHRleHQ6ICdUYWJzIFx1NjgwN1x1N0I3RVx1OTg3NSdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0ZlZWRiYWNrIFx1NTNDRFx1OTk4OFx1N0VDNFx1NEVGNicsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvYWxlcnQnLFxuICAgICAgICAgIHRleHQ6ICdBbGVydCBcdTYzRDBcdTc5M0EnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9kaWFsb2cnLFxuICAgICAgICAgIHRleHQ6ICdEaWFsb2cgXHU1QkY5XHU4QkREXHU2ODQ2J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvZHJhd2VyJyxcbiAgICAgICAgICB0ZXh0OiAnRHJhd2VyIFx1NjJCRFx1NUM0OSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2xvYWRpbmcnLFxuICAgICAgICAgIHRleHQ6ICdMb2FkaW5nIFx1NTJBMFx1OEY3RCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L21lc3NhZ2UnLFxuICAgICAgICAgIHRleHQ6ICdNZXNzYWdlIFx1NkQ4OFx1NjA2Rlx1NjNEMFx1NzkzQSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L21lc3NhZ2UtYm94JyxcbiAgICAgICAgICB0ZXh0OiAnTWVzc2FnZSBCb3ggXHU2RDg4XHU2MDZGXHU1RjM5XHU1MUZBXHU2ODQ2J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICB0ZXh0OiAnTm90aWZpY2F0aW9uIFx1OTAxQVx1NzdFNSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3BvcGNvbmZpcm0nLFxuICAgICAgICAgIHRleHQ6ICdQb3AgQ29uZmlybSBcdTVGMzlcdTUxRkFcdTc4NkVcdThCQTRcdTY4NDYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9wb3BvdmVyJyxcbiAgICAgICAgICB0ZXh0OiAnUG9wb3ZlciBcdTVGMzlcdTUxRkFcdTY4NDYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC90b29sdGlwJyxcbiAgICAgICAgICB0ZXh0OiAnVG9vbHRpcCBcdTY1ODdcdTVCNTdcdTYzRDBcdTc5M0EnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9hY3Rpb24nLFxuICAgICAgICAgIHRleHQ6ICdBY3Rpb24gXHU2NENEXHU0RjVDXHU2MzA5XHU5NEFFJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnT3RoZXJzIFx1NTE3Nlx1NEVENicsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJy9jb21wb25lbnQvZGl2aWRlcicsXG4gICAgICAgICAgdGV4dDogJ0RpdmlkZXIgXHU1MjA2XHU1MjcyXHU3RUJGJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnSW50ZWdyYXRlZCBcdTk2QzZcdTYyMTBcdTdFQzRcdTRFRjYnLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L3Byby10YWJsZScsXG4gICAgICAgICAgdGV4dDogJ1Byb1RhYmxlIFx1OTZDNlx1NjIxMFx1ODg2OFx1NjgzQydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2Zvcm0tZGlhbG9nJyxcbiAgICAgICAgICB0ZXh0OiAnRm9ybURpYWxvZyBcdTg4NjhcdTUzNTVcdTVGMzlcdTY4NDYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC9tdWx0aXBsZS1mb3JtJyxcbiAgICAgICAgICB0ZXh0OiAnTXVsdGlwbGVGb3JtIFx1NTkxQVx1ODg0Q1x1ODg2OFx1NTM1NSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50L2VkaXQtYmFyJyxcbiAgICAgICAgICB0ZXh0OiAnRWRpdEJhciBcdTdGMTZcdThGOTFcdTY4MEYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudC90YWJsZS1zZWxlY3QnLFxuICAgICAgICAgIHRleHQ6ICdUYWJsZVNlbGVjdCBcdTg4NjhcdTY4M0NcdTkwMDlcdTYyRTlcdTdFQzRcdTRFRjYnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29kZXNcXFxcZWxlbWVudC11bHRyYVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVzXFxcXGVsZW1lbnQtdWx0cmFcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHV0aWxzXFxcXHNoYXJlZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZXMvZWxlbWVudC11bHRyYS9kb2NzLy52aXRlcHJlc3MvdXRpbHMvc2hhcmVkLnRzXCI7ZXhwb3J0IGNvbnN0IEJBU0VfUEFUSCA9ICcvZWxlbWVudC11bHRyYS8nIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFxlbGVtZW50LXVsdHJhXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVzXFxcXGVsZW1lbnQtdWx0cmFcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxuYXYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGVzL2VsZW1lbnQtdWx0cmEvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9uYXYudHNcIjtpbXBvcnQgeyBCQVNFX1BBVEggfSBmcm9tICcuLi91dGlscy9zaGFyZWQnXG5cbmNvbnN0IGFkZFByZWZpeCA9IChhcnI6IGFueVtdKSA9PiB7XG4gIGxldCBiYXNlID0gQkFTRV9QQVRILnNsaWNlKDAsIC0xKVxuICByZXR1cm4gYXJyLm1hcChpdGVtID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uaXRlbSxcbiAgICAgIGxpbms6IGJhc2UgKyBpdGVtLmxpbmssXG4gICAgICBhY3RpdmVNYXRjaDogYmFzZSArIGl0ZW0uYWN0aXZlTWF0Y2hcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBuYXYgPWFkZFByZWZpeChbXG4gIHsgdGV4dDogJ1x1NjMwN1x1NTM1NycsIGxpbms6ICcvZ3VpZGUvZGVzaWduJywgYWN0aXZlTWF0Y2g6ICcvZ3VpZGUvJyB9LFxuICB7XG4gICAgdGV4dDogJ1x1N0VDNFx1NEVGNicsXG4gICAgbGluazogJy9jb21wb25lbnQvYnV0dG9uJyxcbiAgICBhY3RpdmVNYXRjaDogJy9jb21wb25lbnQvJyxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdcdThENDRcdTZFOTAnLFxuICAgIGxpbms6ICcvcmVzb3VyY2UvaW5kZXgnLFxuICAgIGFjdGl2ZU1hdGNoOiAnL3Jlc291cmNlLycsXG4gIH0sXG5dKVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFxlbGVtZW50LXVsdHJhXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVzXFxcXGVsZW1lbnQtdWx0cmFcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxwbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2Rlcy9lbGVtZW50LXVsdHJhL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvcGx1Z2lucy50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCdcbmltcG9ydCBtZENvbnRhaW5lciBmcm9tICdtYXJrZG93bi1pdC1jb250YWluZXInXG5pbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tICcuLi91dGlscy9oaWdobGlnaHQnXG5pbXBvcnQgeyBkb2NSb290IH0gZnJvbSAnLi4vdXRpbHMvcGF0aHMnXG5pbXBvcnQgdHlwZSBUb2tlbiBmcm9tICdtYXJrZG93bi1pdC9saWIvdG9rZW4nXG5pbXBvcnQgdHlwZSBSZW5kZXJlciBmcm9tICdtYXJrZG93bi1pdC9saWIvcmVuZGVyZXInXG5cbmNvbnN0IGxvY2FsTWQgPSBNYXJrZG93bkl0KClcbmNvbnN0IHNjcmlwdFNldHVwUkUgPSAvPFxccypzY3JpcHRbXj5dKlxcYnNldHVwXFxiW14+XSovXG5cbmludGVyZmFjZSBDb250YWluZXJPcHRzIHtcbiAgbWFya2VyPzogc3RyaW5nIHwgdW5kZWZpbmVkXG4gIHZhbGlkYXRlPyhwYXJhbXM6IHN0cmluZyk6IGJvb2xlYW5cbiAgcmVuZGVyPyhcbiAgICB0b2tlbnM6IFRva2VuW10sXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBvcHRpb25zOiBhbnksXG4gICAgZW52OiBhbnksXG4gICAgc2VsZjogUmVuZGVyZXJcbiAgKTogc3RyaW5nXG59XG5cbmV4cG9ydCBjb25zdCBtZFBsdWdpbiA9IChtZDogTWFya2Rvd25JdCkgPT4ge1xuICBtZC51c2UobWRDb250YWluZXIsICdkZW1vJywge1xuICAgIHZhbGlkYXRlKHBhcmFtcykge1xuICAgICAgcmV0dXJuICEhcGFyYW1zLnRyaW0oKS5tYXRjaCgvXmRlbW9cXHMqKC4qKSQvKVxuICAgIH0sXG5cbiAgICByZW5kZXIodG9rZW5zLCBpZHgpIHtcblxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XVxuICAgICAgY29uc3QgbSA9IHRva2VuLmluZm8udHJpbSgpLm1hdGNoKC9eZGVtb1xccyooLiopJC8pXG4gICAgICAvKiBtZWFucyB0aGUgdGFnIGlzIG9wZW5pbmcgKi9cbiAgICAgIGlmICh0b2tlbnNbaWR4XS5uZXN0aW5nID09PSAxICkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IG0gJiYgbS5sZW5ndGggPiAxID8gbVsxXSA6ICcnXG4gICAgICAgIGNvbnN0IHNvdXJjZUZpbGVUb2tlbiA9IHRva2Vuc1tpZHggKyAyXVxuICAgICAgICBsZXQgc291cmNlID0gJydcbiAgICAgICAgY29uc3Qgc291cmNlRmlsZSA9IHNvdXJjZUZpbGVUb2tlbi5jaGlsZHJlbj8uWzBdLmNvbnRlbnQgPz8gJydcblxuICAgICAgICBpZiAoc291cmNlRmlsZVRva2VuLnR5cGUgPT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgc291cmNlID0gZnMucmVhZEZpbGVTeW5jKFxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKGRvY1Jvb3QsICdleGFtcGxlcycsIGAke3NvdXJjZUZpbGV9LnZ1ZWApLFxuICAgICAgICAgICAgJ3V0Zi04J1xuICAgICAgICAgIClcblxuICAgICAgICB9XG4gICAgICAgIGlmICghc291cmNlKSB0aHJvdyBuZXcgRXJyb3IoYFx1OTUxOVx1OEJFRlx1NzY4NFx1NkU5MFx1NjU4N1x1NEVGNjogJHtzb3VyY2VGaWxlfWApXG5cbiAgICAgICAgcmV0dXJuIGA8RGVtbyA6ZGVtb3M9XCJkZW1vc1wiIHNvdXJjZT1cIiR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGhpZ2hsaWdodChzb3VyY2UsICd2dWUnKVxuICAgICAgICApfVwiIHBhdGg9XCIke3NvdXJjZUZpbGV9XCIgcmF3LXNvdXJjZT1cIiR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIHNvdXJjZVxuICAgICAgICApfVwiIGRlc2NyaXB0aW9uPVwiJHtlbmNvZGVVUklDb21wb25lbnQobG9jYWxNZC5yZW5kZXIoZGVzY3JpcHRpb24pKX1cIj5gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJzwvRGVtbz4nXG4gICAgICB9XG4gICAgfSxcbiAgfSBhcyBDb250YWluZXJPcHRzKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFxlbGVtZW50LXVsdHJhXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZXNcXFxcZWxlbWVudC11bHRyYVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdXRpbHNcXFxcaGlnaGxpZ2h0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2Rlcy9lbGVtZW50LXVsdHJhL2RvY3MvLnZpdGVwcmVzcy91dGlscy9oaWdobGlnaHQudHNcIjsvLyByZWYgaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3ZpdGVwcmVzcy9ibG9iL21haW4vc3JjL25vZGUvbWFya2Rvd24vcGx1Z2lucy9oaWdobGlnaHQudHNcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBlc2NhcGVIdG1sIGZyb20gJ2VzY2FwZS1odG1sJ1xuaW1wb3J0IHByaXNtIGZyb20gJ3ByaXNtanMnXG5cbi8vIHByaXNtIGlzIGxpc3RlZCBhcyBhY3R1YWwgZGVwIHNvIGl0J3Mgb2sgdG8gcmVxdWlyZVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbmNvbnN0IGxvYWRMYW5ndWFnZXMgPSByZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvaW5kZXgnKVxuXG4vLyByZXF1aXJlZCB0byBtYWtlIGVtYmVkZGVkIGhpZ2hsaWdodGluZyB3b3JrLi4uXG5sb2FkTGFuZ3VhZ2VzKFsnbWFya3VwJywgJ2NzcycsICdqYXZhc2NyaXB0J10pXG5cbmZ1bmN0aW9uIHdyYXAoY29kZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAobGFuZyA9PT0gJ3RleHQnKSB7XG4gICAgY29kZSA9IGVzY2FwZUh0bWwoY29kZSlcbiAgfVxuICByZXR1cm4gYDxwcmUgdi1wcmU+PGNvZGU+JHtjb2RlfTwvY29kZT48L3ByZT5gXG59XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoc3RyOiBzdHJpbmcsIGxhbmc6IHN0cmluZykgPT4ge1xuICBpZiAoIWxhbmcpIHtcbiAgICByZXR1cm4gd3JhcChzdHIsICd0ZXh0JylcbiAgfVxuICBsYW5nID0gbGFuZy50b0xvd2VyQ2FzZSgpXG4gIGNvbnN0IHJhd0xhbmcgPSBsYW5nXG4gIGlmIChsYW5nID09PSAndnVlJyB8fCBsYW5nID09PSAnaHRtbCcpIHtcbiAgICBsYW5nID0gJ21hcmt1cCdcbiAgfVxuICBpZiAobGFuZyA9PT0gJ21kJykge1xuICAgIGxhbmcgPSAnbWFya2Rvd24nXG4gIH1cbiAgaWYgKGxhbmcgPT09ICd0cycpIHtcbiAgICBsYW5nID0gJ3R5cGVzY3JpcHQnXG4gIH1cbiAgaWYgKGxhbmcgPT09ICdweScpIHtcbiAgICBsYW5nID0gJ3B5dGhvbidcbiAgfVxuICBpZiAoIXByaXNtLmxhbmd1YWdlc1tsYW5nXSkge1xuICAgIHRyeSB7XG4gICAgICBsb2FkTGFuZ3VhZ2VzKFtsYW5nXSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBjaGFsay55ZWxsb3coXG4gICAgICAgICAgYFt2aXRlcHJlc3NdIFN5bnRheCBoaWdobGlnaHQgZm9yIGxhbmd1YWdlIFwiJHtsYW5nfVwiIGlzIG5vdCBzdXBwb3J0ZWQuYFxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICB9XG4gIGlmIChwcmlzbS5sYW5ndWFnZXNbbGFuZ10pIHtcbiAgICBjb25zdCBjb2RlID0gcHJpc20uaGlnaGxpZ2h0KHN0ciwgcHJpc20ubGFuZ3VhZ2VzW2xhbmddLCBsYW5nKVxuICAgIHJldHVybiB3cmFwKGNvZGUsIHJhd0xhbmcpXG4gIH1cbiAgcmV0dXJuIHdyYXAoc3RyLCAndGV4dCcpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVzXFxcXGVsZW1lbnQtdWx0cmFcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFxlbGVtZW50LXVsdHJhXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFx1dGlsc1xcXFxwYXRocy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZXMvZWxlbWVudC11bHRyYS9kb2NzLy52aXRlcHJlc3MvdXRpbHMvcGF0aHMudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5leHBvcnQgY29uc3QgdnBSb290ID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJylcbmV4cG9ydCBjb25zdCBkb2NSb290ID0gcGF0aC5yZXNvbHZlKHZwUm9vdCwgJy4uJylcbmV4cG9ydCBjb25zdCBwcm9qUm9vdCA9IHBhdGgucmVzb2x2ZShkb2NSb290LCAnLi4nKVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFxlbGVtZW50LXVsdHJhXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZXNcXFxcZWxlbWVudC11bHRyYVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2Rlcy9lbGVtZW50LXVsdHJhL2RvY3MvLnZpdGVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBoZWFkIH0gZnJvbSAnLi9jb25maWcvaGVhZCdcbmltcG9ydCB7IHNpZGViYXJzIH0gZnJvbSAnLi9jb25maWcvc2lkZWJhcnMnXG5pbXBvcnQgeyBuYXYgfSBmcm9tICcuL2NvbmZpZy9uYXYnXG5pbXBvcnQgeyBtZFBsdWdpbiB9IGZyb20gJy4vY29uZmlnL3BsdWdpbnMnXG5pbXBvcnQgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xuaW1wb3J0IHsgQkFTRV9QQVRIIH0gZnJvbSAnLi91dGlscy9zaGFyZWQnXG5cbmNvbnN0IGJ1aWxkVHJhbnNmb3JtZXJzID0gKCkgPT4ge1xuICBjb25zdCB0cmFuc2Zvcm1lciA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IFtdLFxuICAgICAgbmVlZFJ1bnRpbWU6IHRydWUsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdHJhbnNmb3JtZXJzID0ge31cbiAgY29uc3QgZGlyZWN0aXZlcyA9IFtcbiAgICAnaW5maW5pdGUtc2Nyb2xsJyxcbiAgICAnbG9hZGluZycsXG4gICAgJ3BvcG92ZXInLFxuICAgICdjbGljay1vdXRzaWRlJyxcbiAgICAncmVwZWF0LWNsaWNrJyxcbiAgICAndHJhcC1mb2N1cycsXG4gICAgJ21vdXNld2hlZWwnLFxuICAgICdyZXNpemUnLFxuICBdXG4gIGRpcmVjdGl2ZXMuZm9yRWFjaCgoaykgPT4ge1xuICAgIHRyYW5zZm9ybWVyc1trXSA9IHRyYW5zZm9ybWVyXG4gIH0pXG5cbiAgcmV0dXJuIHRyYW5zZm9ybWVyc1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuY29uc29sZS5sb2coYERPQ19FTlY6ICR7cHJvY2Vzcy5lbnYuRE9DX0VOVn1gKVxuXG5leHBvcnQgY29uc3QgY29uZmlnOiBVc2VyQ29uZmlnID0ge1xuICB0aXRsZTogJ0VsZW1lbnQgVWx0cmEnLFxuICBkZXNjcmlwdGlvbjogJ1x1NEUwMFx1NEUyQVx1NEUxM1x1NEUzQVx1OEJCRVx1OEJBMVx1NUUwOFx1NTQ4Q1x1NUYwMFx1NTNEMVx1ODAwNVx1NjI1M1x1OTAyMFx1NzY4NFZ1ZTNcdTdFQzRcdTRFRjZcdTVFOTMnLFxuICBoZWFkLFxuICBsYW5nOiAnemgtQ04nLFxuICBiYXNlOiBCQVNFX1BBVEgsXG5cbiAgdGhlbWVDb25maWc6IHtcbiAgICByZXBvOiAnY2FiaW5ldC1mZS9lbGVtZW50LXVsdHJhJyxcbiAgICBkb2NzRGlyOiAnZG9jcycsXG5cbiAgICBlZGl0TGlua3M6IHRydWUsXG4gICAgZWRpdExpbmtUZXh0OiAnRWRpdCB0aGlzIHBhZ2Ugb24gR2l0SHViJyxcbiAgICBsYXN0VXBkYXRlZDogJ0xhc3QgVXBkYXRlZCcsXG5cbiAgICBzaWRlYmFycyxcbiAgICBuYXYsXG4gICAgLy8gYWdvbGlhOiB7XG4gICAgLy8gICBhcGlLZXk6ICczNzdmMmI2NDdhOTZkOWIxZDYyZTQ3ODBmMjM0NGRhMicsXG4gICAgLy8gICBhcHBJZDogJ0JINEQ5T0QxNkEnLFxuICAgIC8vIH0sXG4gIH0sXG5cbiAgbWFya2Rvd246IHtcbiAgICBjb25maWc6IChtZCkgPT4ge1xuXG4gICAgICByZXR1cm4gbWRQbHVnaW4obWQpXG4gICAgfSxcbiAgfSxcblxuICB2dWU6IHtcbiAgICAvLyB0ZW1wbGF0ZToge1xuICAgIC8vICAgc3NyOiB0cnVlLFxuICAgIC8vICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgLy8gICAgIGRpcmVjdGl2ZVRyYW5zZm9ybXM6IGJ1aWxkVHJhbnNmb3JtZXJzKCksXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBSU8sSUFBTSxPQUFxQjtBQUFBLEVBRWhDO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFFQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0EsQ0FBQztBQUFBLElBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlGO0FBQ0Y7OztBQ3BDc1UsSUFBTSxXQUFXO0FBQUEsRUFDclYsV0FBVztBQUFBLElBQ1Q7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxRQUNSO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUjtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWU7QUFBQSxJQUNiO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUjtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxRQUNSO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLFFBQ1I7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBRUE7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUjtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLFFBQ1I7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLFFBQ1I7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEs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

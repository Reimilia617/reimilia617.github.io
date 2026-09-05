/* ==========================================================================
   Reimilia617 · 个人博客 —— 全局交互
   1) MD3 深色/浅色主题  2) 右下角浮动按钮组显隐  3) 左向展开式搜索
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 工具 ---------- */
  var $ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ---------- 1. 深色 / 浅色主题 ---------- */
  var THEME_KEY = "md3-theme";

  function systemTheme() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
    // 同步浏览器地址栏/状态栏主题色
    var meta = $('meta[name="theme-color"]');
    if (meta) {
      var surface = getComputedStyle(document.documentElement)
        .getPropertyValue("--md-surface")
        .trim();
      if (surface) meta.setAttribute("content", surface);
    }
    // 同步每个主题按钮的 aria-label
    $$(".theme-fab").forEach(function (btn) {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "切换到浅色模式" : "切换到深色模式"
      );
      btn.setAttribute("title", theme === "dark" ? "切换到浅色模式" : "切换到深色模式");
    });
  }

  function currentTheme() {
    return document.documentElement.dataset.theme || systemTheme();
  }

  $$(".theme-fab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  });
  applyTheme(currentTheme()); // 初始化按钮文案

  /* ---------- 2. 右下角浮动按钮组（滚动后出现） ---------- */
  var fabGroup = $(".fab-group");
  if (fabGroup) {
    var onScroll = function () {
      var show = window.scrollY > 96;
      fabGroup.classList.toggle("is-visible", show);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 回到顶端 */
  $$(".to-top").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ---------- 3. 左向展开式搜索（首页右下角 + 文章页侧栏，可多实例） ---------- */
  var indexData = null;

  function getIndex() {
    if (indexData) return indexData;
    try {
      var el = document.getElementById("search-index");
      indexData = el ? JSON.parse(el.textContent) : [];
    } catch (e) {
      indexData = [];
    }
    return indexData;
  }

  function matchScore(item, kw) {
    var hay =
      (item.title || "") +
      " " +
      (item.desc || "") +
      " " +
      (item.tags || []).join(" ");
    return hay.toLowerCase().indexOf(kw);
  }

  function runSearch(widget, keyword) {
    var resultsBox = $(".search-results", widget);
    var kw = keyword.trim().toLowerCase();
    if (!resultsBox) return;
    if (!kw) {
      resultsBox.classList.remove("open");
      return;
    }
    var hits = getIndex()
      .map(function (item) {
        return { item: item, score: matchScore(item, kw) };
      })
      .filter(function (h) {
        return h.score > -1;
      })
      .sort(function (a, b) {
        return a.score - b.score;
      })
      .slice(0, 6);

    var list = $(".sr-list", resultsBox);
    var empty = $(".sr-empty", resultsBox);
    var head = $(".sr-head", resultsBox);
    if (!hits.length) {
      list.innerHTML = "";
      if (head) head.textContent = "搜索 “" + kw + "”";
      if (empty) empty.style.display = "block";
    } else {
      if (head)
        head.textContent = "“" + kw + "” · 找到 " + hits.length + " 篇";
      if (empty) empty.style.display = "none";
      list.innerHTML = hits
        .map(function (h) {
          var i = h.item;
          var tags = (i.tags || []).length
            ? '<span class="sr-desc">' + i.tags.join(" · ") + "</span>"
            : "";
          return (
            '<a class="sr-item" href="' +
            i.url +
            '"><div class="sr-title">' +
            escapeHtml(i.title) +
            "</div>" +
            (i.desc ? '<div class="sr-desc">' + escapeHtml(i.desc) + "</div>" : "") +
            tags +
            "</a>"
          );
        })
        .join("");
    }
    resultsBox.classList.add("open");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  $$(".search-widget").forEach(function (widget) {
    var fabBtn = $(".sw-btn", widget); // 右下角那颗放大镜按钮
    var input = $(".search-bar input", widget);
    var goBtn = $(".search-go", widget);
    var resultsBox = $(".search-results", widget);

    function openWidget() {
      widget.classList.add("open");
      if (fabBtn) fabBtn.setAttribute("aria-expanded", "true");
      if (input) input.focus();
    }

    function closeWidget() {
      widget.classList.remove("open");
      if (fabBtn) fabBtn.setAttribute("aria-expanded", "false");
      if (resultsBox) resultsBox.classList.remove("open");
    }

    if (fabBtn) {
      fabBtn.addEventListener("click", function () {
        widget.classList.contains("open") ? closeWidget() : openWidget();
      });
      fabBtn.setAttribute("aria-expanded", "false");
    }

    if (input) {
      input.addEventListener("input", function () {
        runSearch(widget, input.value);
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          var first = $(".sr-item", widget);
          if (first) {
            window.location.href = first.getAttribute("href");
          } else {
            runSearch(widget, input.value);
          }
        } else if (e.key === "Escape") {
          e.preventDefault();
          closeWidget();
        }
      });
    }

    if (goBtn) {
      goBtn.addEventListener("click", function () {
        var first = $(".sr-item", widget);
        if (first) window.location.href = first.getAttribute("href");
        else runSearch(widget, input ? input.value : "");
      });
    }

    // 点击组件外部时收起（悬停展开在触屏上不可用，点按切换）
    document.addEventListener("pointerdown", function (e) {
      if (!widget.contains(e.target) && widget.classList.contains("open")) {
        closeWidget();
      }
    });
  });
})();

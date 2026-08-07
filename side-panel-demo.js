(() => {
  const params = new URLSearchParams(location.search);
  const asset = name => `assets/figma/${name}`;
  const sites = [
    { id: "all", name: "全部站点", domain: "", icon: "" },
    { id: "figma", name: "Figma", domain: "figma.com", icon: "site-01.png" },
    { id: "github", name: "GitHub", domain: "github.com", icon: "site-02.png" },
    { id: "zhihu", name: "知乎", domain: "zhihu.com", icon: "site-05.png" },
    { id: "douyin", name: "抖音", domain: "douyin.com", icon: "site-10.png" },
    { id: "bilibili", name: "Bilibili", domain: "bilibili.com", icon: "site-04.png" },
    { id: "notion", name: "Notion", domain: "notion.so", icon: "site-09.png" },
    { id: "behance", name: "Behance", domain: "behance.net", icon: "site-08.png" },
    { id: "youtube", name: "YouTube", domain: "youtube.com", icon: "site-06.png" },
    { id: "chatgpt", name: "ChatGPT", domain: "chatgpt.com", icon: "site-16.png" },
    { id: "chrome", name: "Chrome", domain: "developer.chrome.com", icon: "" },
    { id: "xiaohongshu", name: "小红书", domain: "xiaohongshu.com", icon: "site-07.png" },
    { id: "dribbble", name: "Dribbble", domain: "dribbble.com", icon: "site-03.png" },
    { id: "pinterest", name: "Pinterest", domain: "pinterest.com", icon: "site-11.png" },
    { id: "medium", name: "Medium", domain: "medium.com", icon: "site-12.png" },
    { id: "awwwards", name: "Awwwards", domain: "awwwards.com", icon: "site-13.png" },
    { id: "producthunt", name: "Product Hunt", domain: "producthunt.com", icon: "site-14.png" },
    { id: "twitter", name: "X / Twitter", domain: "x.com", icon: "site-15.png" },
    { id: "stackoverflow", name: "Stack Overflow", domain: "stackoverflow.com", icon: "site-17.png" },
    { id: "ximalaya", name: "喜马拉雅", domain: "ximalaya.com", icon: "site-ximalaya.png" },
    { id: "premiere", name: "Premiere", domain: "adobe.com", icon: "site-premiere.png" }
  ];

  const folders = [
    { id: "all", name: "全部收藏", parent: null, icon: "library", color: "#6f7782" },
    { id: "uncategorized", name: "未分类", parent: "all", icon: "inbox", color: "#d39a26" },
    { id: "design", name: "设计资料", parent: "all", icon: "folder", color: "#d97800" },
    { id: "components", name: "组件案例", parent: "design", icon: "folder", color: "#bd9600" },
    { id: "product", name: "产品研究", parent: "all", icon: "folder", color: "#6c9d22" },
    { id: "later", name: "稍后阅读", parent: "all", icon: "folder", color: "#00a26f" },
    { id: "projects", name: "项目资料", parent: "all", icon: "folder", color: "#008fb8" },
    { id: "zero", name: "ZERO 新标签页", parent: "projects", icon: "folder", color: "#3c70df" }
  ];

  const bookmarks = [
    { id: "b1", title: "ZERO 新标签页组件与响应式标注", domain: "figma.com", site: "figma", folder: "design", tags: ["视觉", "组件"], icon: "site-01.png", savedAt: 12 },
    { id: "b2", title: "ZERO 新标签页需求与决策记录", domain: "github.com", site: "github", folder: "zero", tags: ["产品", "开发"], icon: "site-02.png", savedAt: 11 },
    { id: "b3", title: "Chrome 侧栏产品交互参考", domain: "zhihu.com", site: "zhihu", folder: "product", tags: ["交互", "竞品"], icon: "site-05.png", savedAt: 10 },
    { id: "b4", title: "高密度侧栏列表的排版方法", domain: "behance.net", site: "behance", folder: "design", tags: ["视觉", "排版"], icon: "site-08.png", savedAt: 9 },
    { id: "b5", title: "标签筛选与内容找回策略", domain: "notion.so", site: "notion", folder: "product", tags: ["产品", "标签"], icon: "site-09.png", savedAt: 8 },
    { id: "b6", title: "浏览器扩展弹窗转侧栏实现", domain: "github.com", site: "github", folder: "projects", tags: ["开发", "插件"], icon: "site-02.png", savedAt: 7 },
    { id: "b7", title: "收藏夹与站点聚合的区别", domain: "zhihu.com", site: "zhihu", folder: "product", tags: ["产品", "信息架构"], icon: "site-05.png", savedAt: 6 },
    { id: "b8", title: "适合稍后观看的设计纪录片", domain: "youtube.com", site: "youtube", folder: "later", tags: ["灵感", "视频"], icon: "site-06.png", savedAt: 5 },
    { id: "b9", title: "动效组件拆解与时间曲线", domain: "bilibili.com", site: "bilibili", folder: "components", tags: ["组件", "动效"], icon: "site-04.png", savedAt: 4 },
    { id: "b10", title: "短视频封面信息层级案例", domain: "douyin.com", site: "douyin", folder: "design", tags: ["视觉", "排版"], icon: "site-10.png", savedAt: 3 },
    { id: "b11", title: "产品原型的状态覆盖清单", domain: "notion.so", site: "notion", folder: "projects", tags: ["产品", "交互"], icon: "site-09.png", savedAt: 2 },
    { id: "b12", title: "Lucide 图标语义检索实践", domain: "github.com", site: "github", folder: "components", tags: ["组件", "开发"], icon: "site-02.png", savedAt: 1 }
  ];

  const browserWindows = [
    { id: "current", name: "当前窗口", current: true, tabs: [
      { id: "t1", title: "ZERO 新标签页桌面设计稿", domain: "figma.com", site: "figma", icon: "site-01.png", active: true, saved: false, pinned: true, group: "ZERO 项目" },
      { id: "t2", title: "ZERO 新标签页需求与决策", domain: "github.com", site: "github", icon: "site-02.png", saved: true, group: "ZERO 项目" },
      { id: "t3", title: "Chrome 侧栏开发接口说明", domain: "developer.chrome.com", site: "chrome", icon: "", saved: false, group: "ZERO 项目" },
      { id: "t4", title: "侧栏交互方案讨论", domain: "chatgpt.com", site: "chatgpt", icon: "site-16.png", saved: false, group: "ZERO 项目" },
      { id: "t5", title: "浏览器侧栏视觉参考", domain: "behance.net", site: "behance", icon: "site-08.png", saved: false, group: "设计灵感" },
      { id: "t6", title: "侧栏导航与信息层级", domain: "dribbble.com", site: "dribbble", icon: "site-03.png", saved: false, group: "设计灵感" },
      { id: "t7", title: "工作台布局灵感合集", domain: "pinterest.com", site: "pinterest", icon: "site-11.png", saved: true, group: "设计灵感" },
      { id: "t8", title: "标签筛选交互方案", domain: "zhihu.com", site: "zhihu", icon: "site-05.png", saved: true, group: "内容学习" },
      { id: "t9", title: "信息架构梳理方法", domain: "medium.com", site: "medium", icon: "site-12.png", saved: false, group: "内容学习" },
      { id: "t10", title: "侧栏体验评审记录", domain: "youtube.com", site: "youtube", icon: "site-06.png", saved: false, group: "内容学习" },
      { id: "t11", title: "新标签页视觉灵感", domain: "xiaohongshu.com", site: "xiaohongshu", icon: "site-07.png", saved: false },
      { id: "t12", title: "浏览器效率工具案例", domain: "producthunt.com", site: "producthunt", icon: "site-14.png", saved: false }
    ]},
    { id: "window-2", name: "窗口 2", tabs: [
      { id: "t13", title: "产品研究知识库", domain: "notion.so", site: "notion", icon: "site-09.png", saved: true, group: "产品研究" },
      { id: "t14", title: "AI 浏览器产品案例", domain: "producthunt.com", site: "producthunt", icon: "site-14.png", saved: false, group: "产品研究" },
      { id: "t15", title: "沉浸式网页体验精选", domain: "awwwards.com", site: "awwwards", icon: "site-13.png", saved: false, group: "产品研究" },
      { id: "t16", title: "ZERO 项目问题清单", domain: "github.com", site: "github", icon: "site-02.png", saved: false, group: "开发处理" },
      { id: "t17", title: "浏览器扩展接口排错", domain: "stackoverflow.com", site: "stackoverflow", icon: "site-17.png", saved: false, group: "开发处理" },
      { id: "t18", title: "Chrome 扩展开发文档", domain: "developer.chrome.com", site: "chrome", icon: "", saved: true, group: "开发处理" },
      { id: "t19", title: "浏览器交互动效拆解", domain: "bilibili.com", site: "bilibili", icon: "site-04.png", saved: false },
      { id: "t20", title: "浏览器产品动态追踪", domain: "x.com", site: "twitter", icon: "site-15.png", saved: false }
    ]},
    { id: "window-3", name: "窗口 3", tabs: [
      { id: "t21", title: "短视频内容发布后台", domain: "douyin.com", site: "douyin", icon: "site-10.png", saved: true, group: "内容发布" },
      { id: "t22", title: "图文内容创作后台", domain: "xiaohongshu.com", site: "xiaohongshu", icon: "site-07.png", saved: false, group: "内容发布" },
      { id: "t23", title: "视频内容发布后台", domain: "youtube.com", site: "youtube", icon: "site-06.png", saved: false, group: "内容发布" },
      { id: "t24", title: "音频内容发布后台", domain: "ximalaya.com", site: "ximalaya", icon: "site-ximalaya.png", saved: false, group: "内容发布" },
      { id: "t25", title: "视频剪辑工作流教程", domain: "adobe.com", site: "premiere", icon: "site-premiere.png", saved: true },
      { id: "t26", title: "新标签页", domain: "chrome://newtab", site: "restricted", icon: "", saved: false, restricted: true }
    ]},
    { id: "window-4", name: "窗口 4", tabs: [
      { id: "t27", title: "新标签页社区组件参考", domain: "figma.com", site: "figma", icon: "site-01.png", saved: false, group: "稍后处理" },
      { id: "t28", title: "网页体验案例收藏", domain: "awwwards.com", site: "awwwards", icon: "site-13.png", saved: false, group: "稍后处理" },
      { id: "t29", title: "设计系统灵感合集", domain: "pinterest.com", site: "pinterest", icon: "site-11.png", saved: false, group: "稍后处理" },
      { id: "t30", title: "产品方案阶段复盘", domain: "chatgpt.com", site: "chatgpt", icon: "site-16.png", saved: false },
      { id: "t31", title: "本周产品工作计划", domain: "notion.so", site: "notion", icon: "site-09.png", saved: true }
    ]}
  ];

  const tagUsage = ["视觉", "产品", "组件", "交互", "开发", "排版", "插件", "竞品", "灵感", "标签", "信息架构", "动效", "视频"];
  const tabGroupColors = ["#257554", "#a43d65", "#7e4ca5", "#365fa8", "#a64d2f", "#8b6a00", "#3f6f78"];
  const tabGroupColorAssignments = new Map();
  const state = {
    mode: params.get("tab") === "saved" ? "saved" : "open",
    currentSaved: params.get("current") === "saved",
    currentPage: { title: "ZERO 新标签页桌面设计稿", domain: "figma.com", site: "figma", icon: "site-01.png", restricted: params.get("current") === "restricted" },
    activeTab: "t1",
    expandedWindows: new Set(["current"]),
    collapsedTabGroups: new Set(),
    expandedFolders: new Set(["all", "design", "projects"]),
    activeOpenSite: "all",
    activeFolder: "all",
    activeSite: "all",
    activeTag: "all",
    sort: "time",
    openQuery: "",
    savedQuery: "",
    tagQuery: "",
    savedFolderRatio: 0.44,
    savedTotal: 286
  };

  const byId = id => document.getElementById(id);
  const escapeHTML = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const refreshIcons = () => window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });
  const countOpenTabs = () => browserWindows.reduce((sum, item) => sum + item.tabs.length, 0);
  const siteById = id => sites.find(site => site.id === id);
  const folderById = id => folders.find(folder => folder.id === id);
  const childrenOf = folderId => folders.filter(folder => folder.parent === folderId);
  const descendantFolderIds = folderId => {
    const ids = new Set([folderId]);
    const queue = [folderId];
    while (queue.length) {
      const current = queue.shift();
      childrenOf(current).forEach(folder => {
        if (!ids.has(folder.id)) {
          ids.add(folder.id);
          queue.push(folder.id);
        }
      });
    }
    return ids;
  };
  const folderPath = folderId => {
    const path = [];
    let current = folderById(folderId);
    while (current) {
      path.unshift(current);
      current = current.parent ? folderById(current.parent) : null;
    }
    return path;
  };
  const bookmarksInFolderTree = folderId => {
    const folderIds = descendantFolderIds(folderId);
    return bookmarks.filter(item => folderIds.has(item.folder));
  };
  const bookmarksInFolder = folderId => folderId === "all" ? bookmarks : bookmarks.filter(item => item.folder === folderId);
  const isSavedFilterActive = () => state.activeSite !== "all" || state.activeTag !== "all" || Boolean(state.savedQuery.trim());

  function showToast(copy) {
    const toast = byId("side-toast");
    toast.textContent = copy;
    toast.classList.add("is-show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-show"), 2200);
  }

  function setMode(mode, { focus = false } = {}) {
    state.mode = mode;
    document.querySelectorAll(".mode-tab").forEach(button => {
      const selected = button.dataset.mode === mode;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      if (selected && focus) button.focus();
    });
    document.querySelectorAll(".panel-view").forEach(view => {
      const selected = view.dataset.view === mode;
      view.hidden = !selected;
      view.classList.toggle("is-active", selected);
    });
    closeTransient();
  }

  function faviconMarkup(tab) {
    if (tab.icon) return `<img src="${asset(tab.icon)}" alt="">`;
    return `<span class="fallback-icon"><i data-lucide="${tab.restricted ? "shield-alert" : "globe-2"}"></i></span>`;
  }

  function openSiteItems() {
    const tabs = browserWindows.flatMap(group => group.tabs).filter(tab => !tab.restricted);
    const ids = [...new Set(tabs.map(tab => tab.site))];
    return [sites[0], ...ids.map(id => siteById(id)).filter(Boolean)];
  }

  function renderOpenSites() {
    const tabs = browserWindows.flatMap(group => group.tabs).filter(tab => !tab.restricted);
    byId("open-site-rail").innerHTML = openSiteItems().map(site => {
      const count = site.id === "all" ? tabs.length : tabs.filter(tab => tab.site === site.id).length;
      const selected = state.activeOpenSite === site.id;
      const icon = site.icon ? `<img src="${asset(site.icon)}" alt="">` : `<i data-lucide="${site.id === "all" ? "layout-grid" : "globe-2"}"></i>`;
      return `<button class="site-filter ${selected ? "is-active" : ""}" type="button" data-open-site="${site.id}" aria-label="${escapeHTML(site.name)}，${count} 个打开的标签页" aria-pressed="${selected}" ${selected ? "" : `data-tooltip="${escapeHTML(site.name)} · ${count} 个"`}>${icon}</button>`;
    }).join("");
    document.querySelectorAll("[data-open-site]").forEach(button => button.addEventListener("click", () => {
      state.activeOpenSite = button.dataset.openSite;
      renderOpenWindows();
    }));
  }

  function tabGroupKey(windowId, name) { return `${windowId}::${name}`; }

  function tabGroupColor(name) {
    if (!tabGroupColorAssignments.has(name)) {
      tabGroupColorAssignments.set(name, tabGroupColors[tabGroupColorAssignments.size % tabGroupColors.length]);
    }
    return tabGroupColorAssignments.get(name);
  }

  function groupNamesInWindow(group) {
    return [...new Set(group.tabs.map(tab => tab.group).filter(Boolean))];
  }

  function allTabGroupKeys() {
    return browserWindows.flatMap(group => groupNamesInWindow(group).map(name => tabGroupKey(group.id, name)));
  }

  function renderOpenTabRow(tab) {
    const savedLabel = tab.saved ? "已收藏，打开收藏信息" : tab.restricted ? "此页面不能收藏" : "收藏此标签页";
    const tabLabel = `切换到 ${tab.title}，${tab.domain}`;
    return `<div class="browser-tab-row ${tab.id === state.activeTab ? "is-active" : ""}" data-tab-id="${tab.id}">
      <button class="tab-main-action" type="button" data-activate-tab="${tab.id}" aria-label="${escapeHTML(tabLabel)}" data-tooltip="${escapeHTML(tab.title)}"><span class="favicon-slot">${faviconMarkup(tab)}</span><span class="tab-copy"><strong>${tab.pinned ? '<span class="pin-mark"><i data-lucide="pin"></i></span> ' : ""}${escapeHTML(tab.title)}</strong></span></button>
      <div class="tab-row-actions"><button class="row-icon-button group-tab-action" type="button" data-group-tab="${tab.id}" aria-label="整理“${escapeHTML(tab.title)}”的标签组" aria-haspopup="menu" aria-expanded="false" data-tooltip="整理标签组"><i data-lucide="group"></i></button><button class="row-icon-button save-tab-action ${tab.saved ? "is-saved" : ""}" type="button" data-save-tab="${tab.id}" aria-label="${savedLabel}" ${tab.restricted ? "disabled" : ""} data-tooltip="${savedLabel}"><i data-lucide="bookmark"></i></button><button class="row-icon-button close-tab-action" type="button" data-close-tab="${tab.id}" aria-label="关闭 ${escapeHTML(tab.title)}" data-tooltip="关闭标签页"><i data-lucide="x"></i></button></div>
    </div>`;
  }

  function renderWindowTabs(group, tabs, { forceExpanded = false } = {}) {
    const names = groupNamesInWindow(group).filter(name => tabs.some(tab => tab.group === name));
    const grouped = names.map(name => {
      const groupTabs = tabs.filter(tab => tab.group === name);
      const key = tabGroupKey(group.id, name);
      const collapsed = forceExpanded ? false : state.collapsedTabGroups.has(key);
      return `<section class="native-tab-group ${collapsed ? "is-collapsed" : ""}" style="--group-color:${tabGroupColor(name)}" data-tab-group-key="${escapeHTML(key)}"><button class="tab-group-heading" type="button" data-toggle-tab-group="${escapeHTML(key)}" aria-expanded="${!collapsed}"><i data-lucide="chevron-down"></i><span class="tab-group-dot" aria-hidden="true"></span><strong>${escapeHTML(name)}</strong><small>${groupTabs.length}</small></button><div class="tab-group-rows">${groupTabs.map(renderOpenTabRow).join("")}</div></section>`;
    }).join("");
    const ungrouped = tabs.filter(tab => !tab.group);
    const ungroupedMarkup = ungrouped.length ? `<div class="ungrouped-tabs">${names.length ? '<div class="ungrouped-label">未分组</div>' : ""}${ungrouped.map(renderOpenTabRow).join("")}</div>` : "";
    return grouped + ungroupedMarkup;
  }

  function updateOpenDisclosureControls({ filterActive = false } = {}) {
    const allWindowsExpanded = browserWindows.every(group => state.expandedWindows.has(group.id));
    const allGroupsExpanded = allTabGroupKeys().every(key => !state.collapsedTabGroups.has(key));
    const fullyExpanded = allWindowsExpanded && allGroupsExpanded;
    const button = byId("toggle-all-open");
    const label = fullyExpanded ? "全部收起" : "全部展开";
    button.disabled = filterActive;
    button.dataset.action = fullyExpanded ? "collapse" : "expand";
    button.setAttribute("aria-label", label);
    button.dataset.tooltip = filterActive ? "筛选期间保持展开" : label;
    button.innerHTML = `<i data-lucide="${fullyExpanded ? "list-collapse" : "list-tree"}"></i>`;
  }

  function renderOpenWindows() {
    if (document.body.dataset.uiState === "error") {
      byId("open-site-rail").innerHTML = "";
      updateOpenDisclosureControls({ filterActive: true });
      byId("window-list").innerHTML = '<div class="empty-state"><i data-lucide="circle-alert"></i><strong>无法读取打开的标签页</strong><span>请检查浏览器权限后重试。</span><button class="primary-command" type="button" data-retry>重试</button></div>';
      byId("window-list").querySelector("[data-retry]").addEventListener("click", () => { document.body.dataset.uiState = "default"; renderOpenWindows(); showToast("已重新读取标签页"); });
      refreshIcons();
      return;
    }
    if (document.body.dataset.uiState === "empty") {
      byId("open-site-rail").innerHTML = "";
      updateOpenDisclosureControls({ filterActive: true });
      byId("window-list").innerHTML = '<div class="empty-state"><i data-lucide="panel-top"></i><strong>没有可展示的普通标签页</strong><span>无痕窗口和浏览器内部受限页面不会混入这里。</span></div>';
      refreshIcons();
      return;
    }
    const query = state.openQuery.trim().toLowerCase();
    const siteFilterActive = state.activeOpenSite !== "all";
    const anyFilterActive = siteFilterActive || Boolean(query);
    const groups = browserWindows.map(group => ({
      ...group,
      tabs: group.tabs.filter(tab => {
        const siteMatch = !siteFilterActive || tab.site === state.activeOpenSite;
        const queryMatch = !query || `${tab.title} ${tab.domain}`.toLowerCase().includes(query);
        return siteMatch && queryMatch;
      })
    })).filter(group => group.tabs.length || !anyFilterActive);
    byId("open-count").textContent = String(countOpenTabs());
    byId("window-list").innerHTML = groups.map(group => {
      const collapsed = anyFilterActive ? false : !state.expandedWindows.has(group.id);
      const rows = renderWindowTabs(group, group.tabs, { forceExpanded: anyFilterActive });
      return `<section class="window-group ${collapsed ? "is-collapsed" : ""}" data-window-id="${group.id}"><div class="window-heading"><button class="window-toggle" type="button" data-toggle-window="${group.id}" aria-expanded="${!collapsed}" ${anyFilterActive ? 'aria-disabled="true" data-tooltip="筛选期间保持展开"' : ""}><i data-lucide="chevron-down"></i><strong>${escapeHTML(group.name)}</strong><small>· ${group.tabs.length} 个标签页</small></button>${group.current ? '<span class="window-badge">正在使用</span>' : ""}</div><div class="window-tabs">${rows || '<div class="empty-state"><span>这个窗口没有匹配的标签页</span></div>'}</div></section>`;
    }).join("") || '<div class="empty-state"><i data-lucide="search-x"></i><strong>没有匹配的标签页</strong><span>换一个标题、网址或站点试试。</span></div>';
    renderOpenSites();
    updateOpenDisclosureControls({ filterActive: anyFilterActive });
    bindOpenEvents();
    bindTooltips();
    refreshIcons();
  }

  function findTab(tabId) {
    for (const group of browserWindows) {
      const tab = group.tabs.find(item => item.id === tabId);
      if (tab) return { group, tab };
    }
    return null;
  }

  function focusTabAfterRender(tabId) {
    requestAnimationFrame(() => document.querySelector(`[data-activate-tab="${tabId}"]`)?.focus({ preventScroll: true }));
  }

  function placeTabGroupMenu(trigger) {
    const menu = byId("tab-group-menu");
    const triggerRect = trigger.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const railWidth = byId("open-site-rail").getBoundingClientRect().width;
    const left = Math.max(8, Math.min(triggerRect.right - menuRect.width, innerWidth - railWidth - menuRect.width - 6));
    const below = triggerRect.bottom + 4;
    const top = below + menuRect.height <= innerHeight - 8 ? below : Math.max(8, triggerRect.top - menuRect.height - 4);
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  function applyTabGroup(tabId, groupName) {
    const found = findTab(tabId);
    if (!found) return;
    const previous = found.tab.group;
    found.tab.group = groupName || undefined;
    if (groupName) state.collapsedTabGroups.delete(tabGroupKey(found.group.id, groupName));
    closeTransient({ restoreFocus: false });
    renderOpenWindows();
    focusTabAfterRender(tabId);
    if (!groupName) showToast(`已将“${found.tab.title}”移出标签组`);
    else if (previous === groupName) showToast(`“${found.tab.title}”已在“${groupName}”中`);
    else showToast(`已将“${found.tab.title}”加入“${groupName}”`);
  }

  function renderTabGroupMenu(tabId, trigger, { create = false } = {}) {
    const found = findTab(tabId);
    if (!found) return;
    const menu = byId("tab-group-menu");
    const groupNames = groupNamesInWindow(found.group);
    if (create) {
      menu.setAttribute("role", "dialog");
      menu.setAttribute("aria-label", "新建标签组");
      menu.innerHTML = `<form class="tab-group-create" id="tab-group-create-form"><label for="tab-group-name">新标签组名称</label><input id="tab-group-name" name="group-name" type="text" maxlength="24" autocomplete="off" placeholder="例如：待处理"><div class="tab-group-create-actions"><button type="button" id="cancel-create-group">取消</button><button class="create-group-confirm" type="submit">创建</button></div></form>`;
      byId("cancel-create-group").addEventListener("click", () => renderTabGroupMenu(tabId, trigger));
      byId("tab-group-create-form").addEventListener("submit", event => {
        event.preventDefault();
        const name = byId("tab-group-name").value.trim();
        if (!name) {
          byId("tab-group-name").focus();
          return;
        }
        applyTabGroup(tabId, name);
      });
      placeTabGroupMenu(trigger);
      byId("tab-group-name").focus({ preventScroll: true });
      return;
    }
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "整理标签页分组");
    const choices = groupNames.map((name, index) => `<button type="button" role="menuitemradio" aria-checked="${found.tab.group === name}" data-group-choice="${index}"><span class="group-menu-dot" style="--group-color:${tabGroupColor(name)}" aria-hidden="true"></span><span>${escapeHTML(name)}</span><i data-lucide="check"></i></button>`).join("");
    menu.innerHTML = `<div class="tab-group-menu-title">移动到标签组</div>${choices || '<div class="tab-group-menu-title">当前窗口还没有标签组</div>'}<div class="tab-group-menu-separator"></div><button type="button" role="menuitem" id="create-tab-group"><i data-lucide="folder-plus"></i><span>新建标签组</span><span></span></button>${found.tab.group ? '<button type="button" role="menuitem" id="remove-tab-group"><i data-lucide="ungroup"></i><span>移出当前组</span><span></span></button>' : ""}`;
    menu.querySelectorAll("[data-group-choice]").forEach(button => button.addEventListener("click", () => applyTabGroup(tabId, groupNames[Number(button.dataset.groupChoice)])));
    byId("create-tab-group").addEventListener("click", () => renderTabGroupMenu(tabId, trigger, { create: true }));
    byId("remove-tab-group")?.addEventListener("click", () => applyTabGroup(tabId, ""));
    refreshIcons();
    placeTabGroupMenu(trigger);
    menu.querySelector("button")?.focus({ preventScroll: true });
  }

  function openTabGroupMenu(tabId, trigger) {
    closeTransient({ restoreFocus: false });
    transientReturnFocus = trigger;
    trigger.setAttribute("aria-expanded", "true");
    byId("tab-group-menu").hidden = false;
    renderTabGroupMenu(tabId, trigger);
  }

  function setAllOpenDisclosure(expanded) {
    if (expanded) {
      browserWindows.forEach(group => state.expandedWindows.add(group.id));
      state.collapsedTabGroups.clear();
      showToast("已展开全部窗口和标签组");
    } else {
      state.expandedWindows.clear();
      state.collapsedTabGroups = new Set(allTabGroupKeys());
      showToast("已收起全部窗口和标签组");
    }
    renderOpenWindows();
  }

  function bindOpenEvents() {
    document.querySelectorAll("[data-toggle-window]").forEach(button => button.addEventListener("click", () => {
      if (state.activeOpenSite !== "all") {
        showToast("站点筛选期间，命中窗口保持展开");
        return;
      }
      const id = button.dataset.toggleWindow;
      if (state.expandedWindows.has(id)) state.expandedWindows.delete(id); else state.expandedWindows.add(id);
      renderOpenWindows();
    }));
    document.querySelectorAll("[data-toggle-tab-group]").forEach(button => button.addEventListener("click", () => {
      const key = button.dataset.toggleTabGroup;
      if (state.collapsedTabGroups.has(key)) state.collapsedTabGroups.delete(key); else state.collapsedTabGroups.add(key);
      renderOpenWindows();
    }));
    document.querySelectorAll("[data-group-tab]").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      openTabGroupMenu(button.dataset.groupTab, button);
    }));
    document.querySelectorAll("[data-activate-tab]").forEach(button => button.addEventListener("click", () => {
      const found = findTab(button.dataset.activateTab);
      if (!found) return;
      state.activeTab = found.tab.id;
      state.currentPage = { title: found.tab.title, domain: found.tab.domain, site: found.tab.site, icon: found.tab.icon, restricted: Boolean(found.tab.restricted) };
      setCurrentSaved(found.tab.saved, "设计资料", [], { notify: false, countMutation: false });
      renderOpenWindows();
      showToast(found.group.current ? `已切换到“${found.tab.title}”` : `已聚焦${found.group.name}并切换标签页`);
    }));
    document.querySelectorAll("[data-save-tab]").forEach(button => button.addEventListener("click", () => {
      const found = findTab(button.dataset.saveTab);
      if (!found || found.tab.restricted) return;
      if (found.tab.saved) {
        setMode("saved");
        state.activeFolder = "all";
        state.savedQuery = found.tab.domain;
        byId("saved-search").value = state.savedQuery;
        renderSaved();
        showToast("已在收藏内容中查找这个站点");
        return;
      }
      found.tab.saved = true;
      state.savedTotal += 1;
      renderOpenWindows();
      renderSavedCount();
      showToast(`已收藏“${found.tab.title}”`);
    }));
    document.querySelectorAll("[data-close-tab]").forEach(button => button.addEventListener("click", () => {
      const found = findTab(button.dataset.closeTab);
      if (!found) return;
      const index = found.group.tabs.findIndex(item => item.id === found.tab.id);
      found.group.tabs.splice(index, 1);
      if (state.activeTab === found.tab.id) {
        state.activeTab = found.group.tabs[0]?.id || browserWindows.flatMap(item => item.tabs)[0]?.id || "";
        const next = findTab(state.activeTab);
        if (next) {
          state.currentPage = { title: next.tab.title, domain: next.tab.domain, site: next.tab.site, icon: next.tab.icon, restricted: Boolean(next.tab.restricted) };
          setCurrentSaved(next.tab.saved, "设计资料", [], { notify: false, countMutation: false });
        }
      }
      renderOpenWindows();
      showToast(`已关闭“${found.tab.title}”`);
    }));
  }

  function navigateFolder(folderId, { focus = true } = {}) {
    state.activeFolder = folderId;
    const scope = bookmarksInFolder(folderId);
    if (state.activeSite !== "all" && !scope.some(item => item.site === state.activeSite)) state.activeSite = "all";
    if (state.activeTag !== "all" && !scope.some(item => item.tags.includes(state.activeTag))) state.activeTag = "all";
    renderSaved();
    if (focus) byId("folder-tree").querySelector(`[data-select-folder="${folderId}"]`)?.focus({ preventScroll: true });
  }

  function folderTreeMarkup(folder, depth = 1) {
    const children = childrenOf(folder.id);
    const expanded = state.expandedFolders.has(folder.id);
    const selected = state.activeFolder === folder.id;
    const count = bookmarksInFolderTree(folder.id).length;
    const disclosure = children.length
      ? `<button class="folder-disclosure" type="button" data-toggle-folder="${folder.id}" aria-label="${expanded ? "收起" : "展开"}${escapeHTML(folder.name)}"><i data-lucide="chevron-right"></i></button>`
      : '<span class="folder-disclosure-placeholder" aria-hidden="true"></span>';
    const childMarkup = children.length && expanded ? `<div role="group">${children.map(child => folderTreeMarkup(child, depth + 1)).join("")}</div>` : "";
    return `<div class="folder-tree-item ${expanded ? "is-expanded" : ""}" role="treeitem" aria-level="${depth}" aria-selected="${selected}" ${children.length ? `aria-expanded="${expanded}"` : ""} style="--folder-color:${folder.color};--folder-depth:${depth - 1}"><div class="folder-tree-row ${selected ? "is-active" : ""}">${disclosure}<span class="folder-tree-icon"><i data-lucide="${folder.icon}"></i></span><button class="folder-select" type="button" data-select-folder="${folder.id}"><span>${escapeHTML(folder.name)}</span></button><span class="folder-tree-count">${count}</span></div>${childMarkup}</div>`;
  }

  function updateFolderTreeToggle() {
    const parents = folders.filter(folder => childrenOf(folder.id).length);
    const allExpanded = parents.every(folder => state.expandedFolders.has(folder.id));
    const button = byId("toggle-folder-tree");
    const label = allExpanded ? "全部收起收藏夹" : "全部展开收藏夹";
    button.dataset.action = allExpanded ? "collapse" : "expand";
    button.setAttribute("aria-label", label);
    button.dataset.tooltip = allExpanded ? "全部收起" : "全部展开";
    button.innerHTML = `<i data-lucide="${allExpanded ? "list-collapse" : "list-tree"}"></i>`;
  }

  function renderFolderTree() {
    const tree = byId("folder-tree");
    const previousScroll = tree.scrollTop;
    tree.innerHTML = folderTreeMarkup(folders[0]);
    tree.scrollTop = previousScroll;
    byId("folder-tree-count").textContent = String(folders.length - 1);
    tree.querySelectorAll("[data-toggle-folder]").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      const id = button.dataset.toggleFolder;
      if (state.expandedFolders.has(id)) state.expandedFolders.delete(id); else state.expandedFolders.add(id);
      renderSaved();
      byId("folder-tree").querySelector(`[data-toggle-folder="${id}"]`)?.focus({ preventScroll: true });
    }));
    tree.querySelectorAll("[data-select-folder]").forEach(button => button.addEventListener("click", () => navigateFolder(button.dataset.selectFolder, { focus: false })));
    updateFolderTreeToggle();
  }

  function renderBookmarkToolbar() {
    const folder = folderById(state.activeFolder) || folders[0];
    const count = bookmarksInFolder(folder.id).length;
    byId("selected-folder-title").innerHTML = `<span class="selected-folder-icon" style="--folder-color:${folder.color}"><i data-lucide="${folder.icon}"></i></span><strong>${escapeHTML(folder.name)}</strong><small>${count}</small>`;
  }

  function filteredBookmarks() {
    const query = state.savedQuery.trim().toLowerCase();
    const result = bookmarksInFolder(state.activeFolder).filter(item => {
      const siteMatch = state.activeSite === "all" || item.site === state.activeSite;
      const tagMatch = state.activeTag === "all" || item.tags.includes(state.activeTag);
      const queryMatch = !query || `${item.title} ${item.domain} ${item.tags.join(" ")}`.toLowerCase().includes(query);
      return siteMatch && tagMatch && queryMatch;
    });
    return result.sort((left, right) => state.sort === "name" ? left.title.localeCompare(right.title, "zh-CN") : right.savedAt - left.savedAt);
  }

  function scopedTags() {
    const scoped = bookmarksInFolder(state.activeFolder).filter(item => state.activeSite === "all" || item.site === state.activeSite);
    return tagUsage.map(name => ({ name, count: scoped.filter(item => item.tags.includes(name)).length })).filter(item => item.count > 0);
  }

  function renderRecentTags() {
    const available = scopedTags().slice(0, 3);
    byId("recent-tags").innerHTML = available.map(tag => `<button class="${state.activeTag === tag.name ? "is-active" : ""}" type="button" data-recent-tag="${escapeHTML(tag.name)}" aria-pressed="${state.activeTag === tag.name}" title="${escapeHTML(tag.name)}">${escapeHTML(tag.name)}</button>`).join("");
    document.querySelectorAll("[data-recent-tag]").forEach(button => button.addEventListener("click", () => {
      state.activeTag = state.activeTag === button.dataset.recentTag ? "all" : button.dataset.recentTag;
      renderSaved();
    }));
  }

  function renderSites() {
    const scopeItems = bookmarksInFolder(state.activeFolder);
    const available = sites.filter(site => site.id === "all" || scopeItems.some(item => item.site === site.id));
    byId("site-rail").innerHTML = available.map(site => {
      const count = site.id === "all" ? scopeItems.length : scopeItems.filter(item => item.site === site.id).length;
      const selected = state.activeSite === site.id;
      return `<button class="site-filter ${selected ? "is-active" : ""}" type="button" data-saved-site="${site.id}" aria-label="${escapeHTML(site.name)}，${count} 条收藏" aria-pressed="${selected}" ${selected ? "" : `data-tooltip="${escapeHTML(site.name)} · ${count} 条"`}>${site.icon ? `<img src="${asset(site.icon)}" alt="">` : '<i data-lucide="layout-grid"></i>'}</button>`;
    }).join("");
    document.querySelectorAll("[data-saved-site]").forEach(button => button.addEventListener("click", () => {
      state.activeSite = button.dataset.savedSite;
      if (state.activeTag !== "all" && !scopedTags().some(tag => tag.name === state.activeTag)) state.activeTag = "all";
      renderSaved();
    }));
  }

  function bookmarkMarkup(item, { showSource = false } = {}) {
    const sourcePath = folderPath(item.folder).filter(folder => folder.id !== "all").map(folder => folder.name).join(" / ");
    const source = showSource && sourcePath ? ` · ${sourcePath}` : "";
    return `<article class="bookmark-row" data-bookmark-id="${item.id}"><button class="bookmark-main" type="button" data-open-bookmark="${item.id}" aria-label="打开${escapeHTML(item.title)}，${escapeHTML(item.domain)}"><span class="favicon-slot"><img src="${asset(item.icon)}" alt=""></span><span class="bookmark-copy"><strong>${escapeHTML(item.title)}</strong><small class="${showSource ? "bookmark-source" : ""}">${escapeHTML(item.domain + source)}</small><span class="bookmark-tags">${item.tags.slice(0, 2).map(tag => `<em>${escapeHTML(tag)}</em>`).join("")}</span></span></button><button class="row-icon-button bookmark-more" type="button" data-bookmark-menu="${item.id}" aria-label="${escapeHTML(item.title)}的更多操作" data-tooltip="更多操作"><i data-lucide="ellipsis"></i></button></article>`;
  }

  function renderBookmarks() {
    if (document.body.dataset.uiState === "error") {
      byId("result-count").textContent = "读取失败";
      byId("bookmark-list").innerHTML = '<div class="empty-state"><i data-lucide="circle-alert"></i><strong>收藏内容暂时无法读取</strong><span>已有筛选状态会保留，可以直接重试。</span><button class="primary-command" type="button" data-retry>重试</button></div>';
      byId("bookmark-list").querySelector("[data-retry]").addEventListener("click", () => { document.body.dataset.uiState = "default"; renderSaved(); showToast("已恢复收藏内容"); });
      return;
    }
    if (document.body.dataset.uiState === "empty") {
      byId("result-count").textContent = "0 条";
      byId("bookmark-list").innerHTML = '<div class="empty-state"><i data-lucide="bookmark-plus"></i><strong>还没有收藏内容</strong><span>可以回到“当前打开”，收藏正在使用的网页。</span></div>';
      return;
    }
    const resultsMode = isSavedFilterActive();
    const items = filteredBookmarks();
    byId("result-count").textContent = `${items.length} 条`;
    const content = items.map(item => bookmarkMarkup(item, { showSource: state.activeFolder === "all" })).join("");
    byId("bookmark-list").innerHTML = content || (resultsMode
      ? '<div class="empty-state"><i data-lucide="bookmark-x"></i><strong>没有匹配的收藏内容</strong><span>可以清除部分筛选条件，或返回上一级收藏夹。</span></div>'
      : '<div class="empty-state"><i data-lucide="folder-open"></i><strong>这个文件夹还是空的</strong><span>可以选择其他收藏夹，或从“当前打开”收藏网页到这里。</span></div>');
    document.querySelectorAll("[data-open-bookmark]").forEach(button => button.addEventListener("click", () => showToast("原型：在当前标签页打开收藏内容")));
    document.querySelectorAll("[data-bookmark-menu]").forEach(button => button.addEventListener("click", () => showToast("可用操作：打开、复制链接、编辑分类、移动、取消收藏")));
  }

  function renderFilterSummary() {
    const labels = [];
    if (state.activeSite !== "all") labels.push(siteById(state.activeSite)?.name);
    if (state.activeTag !== "all") labels.push(`#${state.activeTag}`);
    if (state.savedQuery) labels.push(`“${state.savedQuery}”`);
    const summary = byId("active-filter-summary");
    summary.hidden = labels.length === 0;
    const scopeName = folderById(state.activeFolder)?.name || "全部收藏";
    summary.innerHTML = labels.length ? `${escapeHTML(scopeName)}内：${labels.map(escapeHTML).join(" · ")}<button type="button" id="clear-filters" aria-label="清除站点、标签和搜索筛选"><i data-lucide="x"></i></button>` : "";
    byId("clear-filters")?.addEventListener("click", () => {
      state.activeSite = "all";
      state.activeTag = "all";
      state.savedQuery = "";
      byId("saved-search").value = "";
      renderSaved();
    });
  }

  function renderSaved() {
    renderFolderTree();
    renderBookmarkToolbar();
    if (document.body.dataset.uiState === "empty") {
      byId("site-rail").innerHTML = "";
      byId("recent-tags").innerHTML = "";
      byId("active-filter-summary").hidden = true;
    } else {
      renderSites();
      renderRecentTags();
      renderFilterSummary();
    }
    renderBookmarks();
    renderSavedCount();
    requestAnimationFrame(syncSavedSplit);
    bindTooltips();
    refreshIcons();
  }

  function savedSplitBounds() {
    const workspace = byId("saved-workspace");
    const height = workspace.clientHeight;
    const splitterHeight = 8;
    const minFolder = Math.min(112, Math.max(0, height - splitterHeight));
    const maxFolder = Math.max(minFolder, height - splitterHeight - 150);
    return { height, splitterHeight, minFolder, maxFolder };
  }

  function applySavedSplit(folderPaneHeight) {
    const workspace = byId("saved-workspace");
    const splitter = byId("saved-splitter");
    const bounds = savedSplitBounds();
    if (!bounds.height) return;
    const next = Math.round(Math.min(bounds.maxFolder, Math.max(bounds.minFolder, folderPaneHeight)));
    workspace.style.setProperty("--folder-pane-height", `${next}px`);
    state.savedFolderRatio = next / Math.max(1, bounds.height - bounds.splitterHeight);
    splitter.setAttribute("aria-valuemin", String(Math.round(bounds.minFolder)));
    splitter.setAttribute("aria-valuemax", String(Math.round(bounds.maxFolder)));
    splitter.setAttribute("aria-valuenow", String(next));
    splitter.setAttribute("aria-valuetext", `收藏夹区域高度 ${next} 像素`);
  }

  function syncSavedSplit() {
    const bounds = savedSplitBounds();
    if (!bounds.height) return;
    applySavedSplit((bounds.height - bounds.splitterHeight) * state.savedFolderRatio);
  }

  function renderSavedCount() { byId("saved-count").textContent = String(state.savedTotal); }

  function renderTagPanel() {
    const query = state.tagQuery.trim().toLowerCase();
    const tags = scopedTags().filter(tag => !query || tag.name.toLowerCase().includes(query));
    byId("tag-filter-list").innerHTML = `<button class="tag-filter-option ${state.activeTag === "all" ? "is-active" : ""}" type="button" data-filter-tag="all" aria-pressed="${state.activeTag === "all"}"><span>全部标签</span><small>${filteredBookmarks().length}</small></button>${tags.map(tag => `<button class="tag-filter-option ${state.activeTag === tag.name ? "is-active" : ""}" type="button" data-filter-tag="${escapeHTML(tag.name)}" aria-pressed="${state.activeTag === tag.name}"><span>${escapeHTML(tag.name)}</span><small>${tag.count}</small></button>`).join("")}`;
    document.querySelectorAll("[data-filter-tag]").forEach(button => button.addEventListener("click", () => {
      state.activeTag = button.dataset.filterTag;
      closeTransient({ restoreFocus: false });
      renderSaved();
    }));
  }

  let transientReturnFocus = null;
  function openTransient(panel, trigger, { backdrop = false, initialFocus = null } = {}) {
    closeTransient({ restoreFocus: false });
    transientReturnFocus = trigger;
    panel.hidden = false;
    trigger?.setAttribute("aria-expanded", "true");
    byId("overlay-backdrop").hidden = !backdrop;
    const focusTarget = initialFocus?.() || panel.querySelector("input, select, button");
    focusTarget?.focus({ preventScroll: true });
  }

  function closeTransient({ restoreFocus = true } = {}) {
    ["tag-filter-panel", "sort-menu", "tab-group-menu", "save-options-panel", "side-settings-panel"].forEach(id => { byId(id).hidden = true; });
    byId("overlay-backdrop").hidden = true;
    ["tag-filter-trigger", "sort-trigger", "save-options", "panel-settings"].forEach(id => byId(id)?.setAttribute("aria-expanded", "false"));
    transientReturnFocus?.setAttribute?.("aria-expanded", "false");
    if (restoreFocus && transientReturnFocus?.isConnected) transientReturnFocus.focus({ preventScroll: true });
    transientReturnFocus = null;
  }

  function setCurrentSaved(saved, folder = "设计资料", tags = ["视觉"], { notify = true, countMutation = true } = {}) {
    const wasSaved = state.currentSaved;
    state.currentSaved = saved;
    const actions = byId("current-actions");
    const meta = byId("current-page-meta");
    const title = byId("current-page").querySelector(".current-copy strong");
    const favicon = byId("current-page").querySelector(".current-favicon");
    title.textContent = state.currentPage.title;
    favicon.src = state.currentPage.icon ? asset(state.currentPage.icon) : "assets/figma/tabbar/ai-assistant.svg";
    favicon.alt = state.currentPage.title;
    if (state.currentPage.restricted) {
      state.currentSaved = false;
      meta.textContent = `${state.currentPage.domain} · 此页面不能收藏`;
      actions.className = "current-actions";
      actions.innerHTML = '<button class="save-current-button" type="button" disabled><i data-lucide="shield-alert"></i><span>不可收藏</span></button>';
      renderSavedCount();
      refreshIcons();
      return;
    }
    if (saved) {
      meta.textContent = `${state.currentPage.domain} · 已收藏到${folder}`;
      actions.className = "current-actions is-saved";
      actions.innerHTML = `<span class="saved-status"><i data-lucide="circle-check"></i>已收藏</span><button class="row-icon-button current-site-button" id="view-current-site" type="button" aria-label="查看当前站点" data-tooltip="查看当前站点"><i data-lucide="locate-fixed"></i></button><button class="current-edit-button" id="edit-current" type="button">编辑</button>`;
      byId("view-current-site").addEventListener("click", () => {
        state.activeFolder = "all";
        state.activeSite = sites.some(site => site.id === state.currentPage.site) ? state.currentPage.site : "all";
        setMode("saved");
        renderSaved();
        showToast(state.activeSite === "all" ? "当前站点还没有已收藏内容" : "已筛选当前站点");
      });
      byId("edit-current").addEventListener("click", () => openTransient(byId("save-options-panel"), byId("edit-current"), { backdrop: true }));
      if (!wasSaved && countMutation) state.savedTotal += 1;
      if (notify) showToast(`已收藏到“${folder}”${tags.length ? ` · ${tags.join("、")}` : ""}`);
    } else {
      meta.textContent = `${state.currentPage.domain} · 当前网页未收藏`;
      actions.className = "current-actions";
      actions.innerHTML = '<button class="save-current-button" id="save-current" type="button"><i data-lucide="bookmark-plus"></i><span>收藏当前页</span></button><button class="save-options-button" id="save-options" type="button" aria-label="保存前选择收藏夹和标签" aria-haspopup="dialog" aria-expanded="false" data-tooltip="选择收藏位置"><i data-lucide="chevron-down"></i></button>';
      byId("save-current").addEventListener("click", () => setCurrentSaved(true));
      byId("save-options").addEventListener("click", event => openTransient(byId("save-options-panel"), event.currentTarget, { backdrop: true }));
    }
    const active = findTab(state.activeTab);
    if (active && countMutation) active.tab.saved = saved;
    renderSavedCount();
    renderOpenWindows();
    bindTooltips();
    refreshIcons();
  }

  function bindTooltips() {
    document.querySelectorAll("[data-tooltip]").forEach(target => {
      if (target.dataset.tooltipBound === "true") return;
      target.dataset.tooltipBound = "true";
      const show = () => {
        if (target.getAttribute("aria-expanded") === "true") return;
        const tooltip = byId("side-tooltip");
        tooltip.textContent = target.dataset.tooltip;
        tooltip.hidden = false;
        const rect = target.getBoundingClientRect();
        const tip = tooltip.getBoundingClientRect();
        const left = Math.max(8, Math.min(rect.left + rect.width / 2 - tip.width / 2, innerWidth - tip.width - 8));
        const top = rect.top - tip.height - 7 >= 8 ? rect.top - tip.height - 7 : Math.min(innerHeight - tip.height - 8, rect.bottom + 7);
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      };
      const hide = () => { byId("side-tooltip").hidden = true; };
      target.addEventListener("mouseenter", show);
      target.addEventListener("mouseleave", hide);
      target.addEventListener("focus", show);
      target.addEventListener("blur", hide);
      target.addEventListener("click", hide);
    });
  }

  document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
  byId("toggle-all-open").addEventListener("click", event => setAllOpenDisclosure(event.currentTarget.dataset.action === "expand"));
  byId("toggle-folder-tree").addEventListener("click", event => {
    const button = event.currentTarget;
    if (button.dataset.action === "collapse") state.expandedFolders.clear();
    else folders.filter(folder => childrenOf(folder.id).length).forEach(folder => state.expandedFolders.add(folder.id));
    renderSaved();
    requestAnimationFrame(() => byId("toggle-folder-tree").focus({ preventScroll: true }));
  });

  const savedSplitter = byId("saved-splitter");
  let splitDrag = null;
  savedSplitter.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    event.preventDefault();
    splitDrag = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startHeight: byId("folder-tree").closest(".folder-pane").getBoundingClientRect().height
    };
    savedSplitter.setPointerCapture(event.pointerId);
    savedSplitter.classList.add("is-dragging");
  });
  savedSplitter.addEventListener("pointermove", event => {
    if (!splitDrag || splitDrag.pointerId !== event.pointerId) return;
    applySavedSplit(splitDrag.startHeight + event.clientY - splitDrag.startY);
  });
  const clearSplitDrag = () => {
    if (!splitDrag) return;
    const pointerId = splitDrag.pointerId;
    if (savedSplitter.hasPointerCapture(pointerId)) savedSplitter.releasePointerCapture(pointerId);
    splitDrag = null;
    savedSplitter.classList.remove("is-dragging");
  };
  const finishSplitDrag = event => {
    if (!splitDrag || splitDrag.pointerId !== event.pointerId) return;
    clearSplitDrag();
  };
  savedSplitter.addEventListener("pointerup", finishSplitDrag);
  savedSplitter.addEventListener("pointercancel", finishSplitDrag);
  savedSplitter.addEventListener("lostpointercapture", () => {
    splitDrag = null;
    savedSplitter.classList.remove("is-dragging");
  });
  window.addEventListener("mousemove", event => {
    if (!splitDrag) return;
    applySavedSplit(splitDrag.startHeight + event.clientY - splitDrag.startY);
  });
  window.addEventListener("mouseup", clearSplitDrag);
  window.addEventListener("blur", clearSplitDrag);
  savedSplitter.addEventListener("keydown", event => {
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const bounds = savedSplitBounds();
    const current = Number(savedSplitter.getAttribute("aria-valuenow")) || bounds.minFolder;
    if (event.key === "Home") applySavedSplit(bounds.minFolder);
    else if (event.key === "End") applySavedSplit(bounds.maxFolder);
    else applySavedSplit(current + (event.key === "ArrowDown" ? 16 : -16));
  });
  byId("tab-open").parentElement.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setMode(state.mode === "open" ? "saved" : "open", { focus: true });
  });
  byId("open-search").addEventListener("input", event => { state.openQuery = event.target.value; event.target.parentElement.querySelector(".clear-search").hidden = !state.openQuery; renderOpenWindows(); });
  byId("saved-search").addEventListener("input", event => { state.savedQuery = event.target.value; event.target.parentElement.querySelector(".clear-search").hidden = !state.savedQuery; renderSaved(); });
  document.querySelectorAll("[data-clear]").forEach(button => button.addEventListener("click", () => {
    const input = byId(button.dataset.clear === "open" ? "open-search" : "saved-search");
    input.value = "";
    if (button.dataset.clear === "open") { state.openQuery = ""; renderOpenWindows(); } else { state.savedQuery = ""; renderSaved(); }
    button.hidden = true;
    input.focus();
  }));
  byId("tag-filter-trigger").addEventListener("click", event => { renderTagPanel(); openTransient(byId("tag-filter-panel"), event.currentTarget); });
  byId("close-tag-panel").addEventListener("click", () => closeTransient());
  byId("tag-search").addEventListener("input", event => { state.tagQuery = event.target.value; renderTagPanel(); });
  function applySort(button) {
    state.sort = button.dataset.sort;
    document.querySelectorAll("[data-sort]").forEach(item => {
      const selected = item.dataset.sort === state.sort;
      item.setAttribute("aria-checked", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    byId("sort-trigger").setAttribute("aria-label", `排序：${state.sort === "time" ? "最近保存" : "名称"}`);
    closeTransient();
    renderSaved();
  }
  byId("sort-trigger").addEventListener("click", event => openTransient(byId("sort-menu"), event.currentTarget, {
    initialFocus: () => byId("sort-menu").querySelector('[aria-checked="true"]')
  }));
  document.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => applySort(button)));
  byId("sort-menu").addEventListener("keydown", event => {
    const items = Array.from(byId("sort-menu").querySelectorAll('[role="menuitemradio"]'));
    const current = Math.max(0, items.indexOf(document.activeElement));
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = items[(current + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length];
      items.forEach(item => { item.tabIndex = item === next ? 0 : -1; });
      next.focus();
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = items[event.key === "Home" ? 0 : items.length - 1];
      items.forEach(item => { item.tabIndex = item === next ? 0 : -1; });
      next.focus();
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      applySort(items[current]);
    }
  });
  byId("tab-group-menu").addEventListener("keydown", event => {
    if (event.target.matches("input")) return;
    const items = Array.from(byId("tab-group-menu").querySelectorAll('[role="menuitem"], [role="menuitemradio"]')).filter(item => !item.disabled);
    const current = Math.max(0, items.indexOf(document.activeElement));
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && items.length) {
      event.preventDefault();
      items[(current + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length].focus();
    }
    if ((event.key === "Home" || event.key === "End") && items.length) {
      event.preventDefault();
      items[event.key === "Home" ? 0 : items.length - 1].focus();
    }
  });
  byId("tab-group-menu").addEventListener("click", event => event.stopPropagation());
  byId("save-current").addEventListener("click", () => setCurrentSaved(true));
  byId("save-options").addEventListener("click", event => openTransient(byId("save-options-panel"), event.currentTarget, { backdrop: true }));
  byId("close-save-options").addEventListener("click", () => closeTransient());
  byId("confirm-save-options").addEventListener("click", () => {
    const folder = byId("save-folder").value;
    const tags = Array.from(document.querySelectorAll(".save-tag-options input:checked")).map(input => input.value);
    closeTransient({ restoreFocus: false });
    setCurrentSaved(true, folder, tags);
  });
  byId("overlay-backdrop").addEventListener("click", () => closeTransient());
  byId("panel-settings").addEventListener("click", event => openTransient(byId("side-settings-panel"), event.currentTarget, { backdrop: true }));
  byId("close-side-settings").addEventListener("click", () => closeTransient());
  document.querySelectorAll('input[name="default-entry"]').forEach(input => input.addEventListener("change", () => showToast(input.value === "popup" ? "点击扩展图标时将打开快速收藏" : "点击扩展图标时将打开侧栏")));
  byId("close-panel").addEventListener("click", () => {
    if (window.parent !== window) window.parent.postMessage({ type: "zero-close-side-panel" }, location.origin);
    else showToast("真实扩展中这里会关闭 Chrome Side Panel");
  });
  document.addEventListener("keydown", event => {
    const modal = [byId("save-options-panel"), byId("side-settings-panel")].find(panel => !panel.hidden);
    if (event.key === "Tab" && modal) {
      const focusable = Array.from(modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled])')).filter(element => element.getClientRects().length);
      if (focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    if (event.key === "Escape") {
      if (!["tag-filter-panel", "sort-menu", "tab-group-menu", "save-options-panel", "side-settings-panel"].every(id => byId(id).hidden)) closeTransient();
      else if (window.parent !== window) window.parent.postMessage({ type: "zero-close-side-panel" }, location.origin);
    }
  });
  document.addEventListener("click", event => {
    if (!event.target.closest("#sort-menu, #sort-trigger, #tab-group-menu, [data-group-tab], #tag-filter-panel, #tag-filter-trigger, #save-options-panel, #save-options, #side-settings-panel, #panel-settings") && byId("overlay-backdrop").hidden) closeTransient({ restoreFocus: false });
  });
  window.addEventListener("resize", syncSavedSplit);

  if (params.get("ui-state")) document.body.dataset.uiState = params.get("ui-state");
  if (state.currentSaved) {
    const initial = findTab(state.activeTab);
    if (initial) initial.tab.saved = true;
  }
  setCurrentSaved(state.currentSaved, "设计资料", ["视觉"], { notify: false, countMutation: false });
  setMode(state.mode);
  renderOpenWindows();
  renderSaved();
  bindTooltips();
  refreshIcons();
})();

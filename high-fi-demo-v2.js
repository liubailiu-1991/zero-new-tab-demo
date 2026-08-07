(() => {
  const params = new URLSearchParams(location.search);
  const embedMode = params.get("embed") === "1";
  const initialModule = params.get("module") || "";
  const initialElement = params.get("element") || "";
  const demoScenario = params.get("scenario") || "default";
  const requestedUiState = (params.get("ui-state") || "").trim();
  const normalizedUiState = requestedUiState.toUpperCase();
  const popupStateIds = new Set([
    "S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10", "S11", "S12",
    "F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08"
  ]);
  const fixtureState = popupStateIds.has(normalizedUiState) ? normalizedUiState : "";
  const popupHostMode = params.get("host-context") === "popup";
  const fixtureMode = Boolean(requestedUiState || popupHostMode);
  const requestedScale = Math.max(0, Math.min(200, Number(params.get("scale") || 0)));
  const scaleSiteCount = requestedScale >= 20 ? requestedScale : 20;
  const requestedDockSize = ["小", "中", "大"].includes(params.get("dock-size")) ? params.get("dock-size") : "";
  const requestedFolderSize = ["小", "中", "大"].includes(params.get("folder-size")) ? params.get("folder-size") : "";
  const requestedDockTitles = params.get("dock-titles");
  const requestedFolderOverflow = params.get("folder-overflow") === "1";
  if (embedMode) document.body.classList.add("is-embed");
  if (popupHostMode) document.body.classList.add("is-popup-host");
  if (params.get("text-scale") === "2") document.body.classList.add("text-scale-200");
  document.body.dataset.scenario = demoScenario;
  document.body.dataset.scale = String(scaleSiteCount);
  document.body.dataset.uiState = requestedUiState || "default";

  const stateKey = `zero-live-prototype-state-v4:${demoScenario}:${scaleSiteCount}`;
  const previousStateKey = "zero-live-prototype-state-v3";
  const legacyStateKey = "zero-live-prototype-state-v2";
  const scene = document.getElementById("scene");
  const extensionPanel = document.getElementById("extension-panel");
  const pluginEntry = document.getElementById("plugin-entry");
  const popupFooter = document.getElementById("popup-footer");
  const popupSiteIcon = document.getElementById("popup-site-icon");
  const popupSystemState = document.getElementById("popup-system-state");
  const popupFeedback = document.getElementById("popup-feedback");
  const popupFeedbackCopy = document.getElementById("popup-feedback-copy");
  const folderFeedback = document.getElementById("folder-feedback");
  const folderFeedbackCopy = document.getElementById("folder-feedback-copy");
  const selectedOverflow = document.getElementById("selected-overflow");
  const selectedOverflowPanel = document.getElementById("selected-overflow-panel");
  const collectionPanel = document.getElementById("collection-panel");
  const folderCollectionPanel = document.getElementById("folder-collection-panel");
  const contextMenu = document.getElementById("context-menu");
  const settingsPopover = document.getElementById("settings-popover");
  const folderMoreButton = document.getElementById("folder-more-button");
  const folderOverflowPanel = document.getElementById("folder-overflow-panel");
  const searchMenu = document.getElementById("search-menu");
  const searchEngineMenu = document.getElementById("search-engine-menu");
  const searchEngineButton = document.getElementById("search-engine-button");
  const mainSearch = document.getElementById("main-search");
  const confirmBackdrop = document.getElementById("confirm-backdrop");
  const toast = document.getElementById("toast");
  const toastCopy = document.getElementById("toast-copy");
  const toastAction = document.getElementById("toast-action");
  const uiTooltip = document.getElementById("ui-tooltip-v2");
  const sidePanelPreview = document.getElementById("side-panel-preview");
  const sidePanelFrame = document.getElementById("side-panel-frame");

  const BASE_SITE_SEED = [
    { id: "behance", name: "Behance", domain: "behance.net", icon: "site-08.png", baseCount: 12 },
    { id: "zhihu", name: "知乎", domain: "zhihu.com", icon: "site-05.png", baseCount: 24 },
    { id: "github", name: "GitHub", domain: "github.com", icon: "site-02.png", baseCount: 31 },
    { id: "douyin", name: "抖音", domain: "douyin.com", icon: "site-10.png", baseCount: 18 },
    { id: "bilibili", name: "Bilibili", domain: "bilibili.com", icon: "site-04.png", baseCount: 9 },
    { id: "xiaohongshu", name: "小红书", domain: "xiaohongshu.com", icon: "site-07.png", baseCount: 16 },
    { id: "figma", name: "Figma", domain: "figma.com", icon: "site-01.png", baseCount: 27 },
    { id: "dribbble", name: "Dribbble", domain: "dribbble.com", icon: "site-03.png", baseCount: 11 },
    { id: "youtube", name: "YouTube", domain: "youtube.com", icon: "site-06.png", baseCount: 14 },
    { id: "notion", name: "Notion", domain: "notion.so", icon: "site-09.png", baseCount: 7 },
    { id: "pinterest", name: "Pinterest", domain: "pinterest.com", icon: "site-11.png", baseCount: 10 },
    { id: "medium", name: "Medium", domain: "medium.com", icon: "site-12.png", baseCount: 6, hidden: true },
    { id: "awwwards", name: "Awwwards", domain: "awwwards.com", icon: "site-13.png", baseCount: 8 },
    { id: "producthunt", name: "Product Hunt", domain: "producthunt.com", icon: "site-14.png", baseCount: 13 },
    { id: "twitter", name: "X / Twitter", domain: "x.com", icon: "site-15.png", baseCount: 20 },
    { id: "chatgpt", name: "ChatGPT", domain: "chatgpt.com", icon: "site-16.png", baseCount: 19 },
    { id: "ximalaya", name: "喜马拉雅", domain: "ximalaya.com", icon: "site-ximalaya.png", baseCount: 5, hidden: true },
    { id: "premiere", name: "Premiere", domain: "adobe.com", icon: "site-premiere.png", baseCount: 4 },
    { id: "whale", name: "Whale", domain: "whale.example", icon: "site-whale.png", baseCount: 3, hidden: true }
  ];

  const scaleIcons = Array.from({ length: 17 }, (_, index) => `site-${String(index + 1).padStart(2, "0")}.png`);
  const scaleSites = Array.from({ length: Math.max(0, scaleSiteCount - BASE_SITE_SEED.length) }, (_, index) => {
    const number = BASE_SITE_SEED.length + index + 1;
    return {
      id: `source-${number}`,
      name: `资料站点 ${String(number).padStart(3, "0")}`,
      domain: `source-${number}.example`,
      icon: scaleIcons[index % scaleIcons.length],
      baseCount: 3 + index % 8
    };
  });

  const BASE_SITES = [...BASE_SITE_SEED, ...scaleSites].map((site, index) => ({
    ...site,
    hidden: Boolean(site.hidden),
    deleted: false,
    deletedAt: null,
    hiddenBeforeDelete: false,
    originalIndex: index
  }));

  const bottomFolders = [
    ["未分类", "rgba(60,77,128,.5)"], ["图标设计skill", "rgba(217,30,58,.5)"], ["ui界面设计skill", "rgba(2,156,74,.5)"],
    ["logo设计skill", "rgba(85,29,176,.5)"], ["obsidian项目", "rgba(32,108,207,.5)"], ["skill推荐", "rgba(207,175,15,.5)"],
    ["分区壁纸", "rgba(204,81,32,.5)"], ["nas", "rgba(60,77,128,.5)"], ["设计参考", "rgba(203,30,131,.5)"],
    ["团队周报", "rgba(0,60,171,.5)"], ["网盘项目", "rgba(126,183,18,.5)"], ["育儿教育", "rgba(204,146,19,.5)"], ["纪录片", "rgba(217,30,58,.5)"]
  ];

  const tools = [
    ["refresh-cw", "刷新"], ["calendar-days", "日历"], ["alarm-clock", "闹钟"], ["languages", "翻译"],
    ["sun", "主题"], ["plus", "添加工具"], ["settings", "设置"]
  ];

  const searchEngines = [
    { id: "360", label: "360 搜索", mark: "360" },
    { id: "bing", label: "Bing", mark: "B" },
    { id: "google", label: "Google", mark: "G" }
  ];

  const popupTags = ["设计干货", "UI 排版小技巧", "新手设计师避坑", "配色思路", "平面设计", "AI 绘图设计", "封面设计", "短视频封面设计干货", "品牌视觉设计", "设计审美提升", "视觉层次设计", "图文排版设计", "插画设计", "LOGO 设计", "设计师日常", "版式设计"];
  const foldersData = [["R 人物-人", 2], ["J 建筑-房子", 3], ["D 动物", 10], ["F 风格", 13], ["H 绘本", 1], ["X 小红书", 36], ["租房", 3], ["蛇房营南里", 3, "", "租房"]];
  const titleTemplates = [
    "产品需求讨论工作台与交互地图", "ZERO 浏览器新标签页设计记录", "收藏夹与标签的组织方式", "浏览器插件 Popup 视觉参考",
    "Lucide 图标语义检索与筛选", "Figma 组件布局和响应式标注", "产品原型的高保真校准方法", "需求变更与决策记录",
    "新标签页壁纸与通透材质", "浏览器工具区交互参考", "域名内容聚合与标签筛选", "稍后继续阅读的设计案例",
    "团队协作项目资料", "常用设计资源与素材库", "网页收藏结构调研", "交互状态与异常场景"
  ];
  const contentTags = ["视觉", "产品", "交互", "开发", "灵感", "布局", "插件", "效率", "收藏", "排版", "工具", "动效", "组件", "竞品"];

  const readStored = () => {
    try {
      const current = JSON.parse(localStorage.getItem(stateKey) || "null");
      if (current) return current;
      if (demoScenario === "default" && scaleSiteCount === 20) {
        const previous = JSON.parse(localStorage.getItem(previousStateKey) || "null");
        if (previous) return previous;
        return JSON.parse(sessionStorage.getItem(legacyStateKey) || "{}");
      }
      return {};
    } catch {
      return {};
    }
  };

  if (params.get("reset") === "1") localStorage.removeItem(stateKey);
  const storedState = readStored();
  const stateBySite = new Map(Array.isArray(storedState.sites) ? storedState.sites.map(site => [site.id, site]) : []);
  const orderedIds = Array.isArray(storedState.dockOrder) ? storedState.dockOrder : BASE_SITES.map(site => site.id);
  let sites = BASE_SITES.map(site => ({ ...site, ...(stateBySite.get(site.id) || {}) }));
  sites.sort((left, right) => {
    const leftIndex = orderedIds.indexOf(left.id);
    const rightIndex = orderedIds.indexOf(right.id);
    return (leftIndex < 0 ? left.originalIndex : leftIndex) - (rightIndex < 0 ? right.originalIndex : rightIndex);
  });

  let selectedTags = new Set(Array.isArray(storedState.selectedTags) ? storedState.selectedTags : []);
  let activeFolder = storedState.activeFolder || "未分类";
  let bookmarkSaved = Boolean(storedState.bookmarkSaved);
  let showDockTitles = requestedDockTitles === "1" ? true : requestedDockTitles === "0" ? false : Boolean(storedState.showDockTitles);
  let dockSize = requestedDockSize || (["小", "中", "大"].includes(storedState.dockSize) ? storedState.dockSize : "中");
  let folderSize = requestedFolderSize || (["小", "中", "大"].includes(storedState.folderSize) ? storedState.folderSize : (["小", "中", "大"].includes(storedState.dockSize) ? storedState.dockSize : "中"));
  let deletedBookmarkIds = new Set(Array.isArray(storedState.deletedBookmarkIds) ? storedState.deletedBookmarkIds : []);
  let bookmarkTagOverrides = storedState.bookmarkTagOverrides && typeof storedState.bookmarkTagOverrides === "object" ? storedState.bookmarkTagOverrides : {};
  let bookmarkFolders = storedState.bookmarkFolders && typeof storedState.bookmarkFolders === "object" ? storedState.bookmarkFolders : {};
  let tagUsage = storedState.tagUsage && typeof storedState.tagUsage === "object" ? storedState.tagUsage : {};
  let searchEngineId = searchEngines.some(engine => engine.id === storedState.searchEngineId) ? storedState.searchEngineId : "360";
  let searchScope = storedState.searchScope === "saved" ? "saved" : "all";
  let searchActiveIndex = -1;
  let searchResultActions = [];

  let activeFacet = "全部";
  let facetQuery = "";
  let activeCollectionSiteId = "zhihu";
  let activeCollectionSort = "time";
  let lastCollectionAnchorRect = null;
  let lastFolderCollectionAnchorRect = null;
  let activeFolderPanelName = "未分类";
  let activeFolderPanelSite = "all";
  let activeFolderPanelTag = "全部";
  let folderFacetQuery = "";
  let activeFolderPanelChild = "";
  let activeFolderPanelSort = "time";
  let folderPickerSelection = activeFolder;
  let settingsPage = "home";
  let managementTab = "visible";
  let managementQuery = "";
  let draggedSiteId = null;
  let editingBookmarkId = null;
  let toastCallback = null;
  let dialogReturnFocus = null;
  let lastContextTrigger = null;
  let settingsReturnFocus = null;
  let popupReturnFocus = null;
  let collectionReturnFocus = null;
  let folderCollectionReturnFocus = null;
  let folderOverflowReturnFocus = null;
  let overflowFolderNames = [];
  let popupTagFixture = null;
  let folderFixture = null;
  let activeFailureState = "";
  let pendingFolderName = "";
  let lastFailedTag = "";
  const expandedFolderNodes = new Set(["租房"]);

  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const asset = name => `assets/figma/${name}`;
  const byId = id => sites.find(site => site.id === id);
  const activeSites = () => sites.filter(site => !site.deleted && siteCount(site) > 0);
  const visibleSites = () => activeSites().filter(site => !site.hidden);
  const hiddenSites = () => activeSites().filter(site => site.hidden);
  const trashSites = () => sites.filter(site => site.deleted);
  const refreshIcons = () => {
    if (window.lucide) window.lucide.createIcons();
    prepareSurfaceTooltips();
  };

  const tooltipControlSelector = [
    ".chrome-icon", ".tab-action", ".tab-compact", ".toolbar-button", ".window-button",
    ".search-action", ".icon-button", ".item-more", ".folder-bookmark-menu",
    ".tool-button", ".folder-more-button", ".folder-site-filter", ".collapse-button", ".expand-button", ".dock-site", ".expanded-site"
  ].join(",");

  function prepareSurfaceTooltips(root = document) {
    root.querySelectorAll(tooltipControlSelector).forEach(element => {
      const copy = element.dataset.surfaceTooltip || element.getAttribute("aria-label") || element.getAttribute("title");
      if (!copy) return;
      element.dataset.surfaceTooltip = copy;
      if (!element.getAttribute("aria-label") && element.matches("button, [role='button']")) element.setAttribute("aria-label", copy);
      element.removeAttribute("title");
      if (element.dataset.surfaceTooltipBound === "true") return;
      element.dataset.surfaceTooltipBound = "true";
      element.addEventListener("mouseenter", () => showSurfaceTooltip(element));
      element.addEventListener("mouseleave", hideSurfaceTooltip);
      element.addEventListener("focus", () => showSurfaceTooltip(element));
      element.addEventListener("blur", hideSurfaceTooltip);
    });
  }

  function showSurfaceTooltip(target) {
    const copy = target.dataset.surfaceTooltip;
    if (!copy) return;
    if (target.getAttribute("aria-expanded") === "true") {
      hideSurfaceTooltip();
      return;
    }
    const dockSiteId = target.dataset.dockSite || target.dataset.expandedSite;
    if (dockSiteId && collectionPanel.classList.contains("is-open") && activeCollectionSiteId === dockSiteId) {
      hideSurfaceTooltip();
      return;
    }
    const detail = target.dataset.surfaceTooltipDetail || "";
    uiTooltip.replaceChildren();
    if (detail) {
      const title = document.createElement("strong");
      const meta = document.createElement("span");
      title.textContent = copy;
      meta.textContent = detail;
      uiTooltip.append(title, meta);
    } else {
      uiTooltip.textContent = copy;
    }
    uiTooltip.hidden = false;
    const targetRect = target.getBoundingClientRect();
    const tooltipRect = uiTooltip.getBoundingClientRect();
    const left = Math.max(8, Math.min(targetRect.left + targetRect.width / 2 - tooltipRect.width / 2, window.innerWidth - tooltipRect.width - 8));
    const preferredTop = targetRect.bottom + 8;
    const top = preferredTop + tooltipRect.height <= window.innerHeight - 8 ? preferredTop : Math.max(8, targetRect.top - tooltipRect.height - 8);
    uiTooltip.style.left = `${left}px`;
    uiTooltip.style.top = `${top}px`;
  }

  function hideSurfaceTooltip() { uiTooltip.hidden = true; }

  function focusableElements(container) {
    return Array.from(container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      .filter(element => !element.hidden && element.getAttribute("aria-hidden") !== "true" && element.getClientRects().length > 0);
  }

  function trapFocus(event, container) {
    if (event.key !== "Tab") return;
    const focusable = focusableElements(container);
    if (!focusable.length) return;
    event.preventDefault();
    const currentIndex = focusable.indexOf(document.activeElement);
    const fallbackIndex = event.shiftKey ? 0 : -1;
    const nextIndex = (Math.max(currentIndex, fallbackIndex) + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
    focusable[nextIndex].focus();
  }

  function menuItems(menu) {
    return Array.from(menu.querySelectorAll('[role="menuitem"], [role="menuitemradio"]')).filter(item => !item.disabled && item.getClientRects().length > 0);
  }

  function handleMenuNavigation(event, menu, returnTarget, closeMenu) {
    const items = menuItems(menu);
    if (!items.length) return;
    const currentIndex = Math.max(0, items.indexOf(document.activeElement));
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const offset = event.key === "ArrowDown" ? 1 : -1;
      items[(currentIndex + offset + items.length) % items.length].focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      items[event.key === "Home" ? 0 : items.length - 1].focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
      returnTarget?.focus({ preventScroll: true });
    }
  }

  function notifyParent(module, element = null) {
    if (window.parent !== window) window.parent.postMessage({ type: "zero-prototype-select", module, element }, location.origin);
  }

  function persistState() {
    if (fixtureMode) return;
    localStorage.setItem(stateKey, JSON.stringify({
      version: 4,
      bookmarkSaved,
      activeFolder,
      selectedTags: Array.from(selectedTags),
      showDockTitles,
      dockSize,
      folderSize,
      dockOrder: sites.map(site => site.id),
      sites: sites.map(({ id, hidden, deleted, deletedAt, hiddenBeforeDelete }) => ({ id, hidden, deleted, deletedAt, hiddenBeforeDelete })),
      deletedBookmarkIds: Array.from(deletedBookmarkIds),
      bookmarkTagOverrides,
      bookmarkFolders,
      tagUsage,
      searchEngineId,
      searchScope
    }));
  }

  function baseItems(site) {
    if (demoScenario === "empty") return [];
    return Array.from({ length: site.baseCount }, (_, index) => {
      const id = `${site.id}-${index}`;
      const firstTag = contentTags[(site.originalIndex + index) % contentTags.length];
      const secondTag = contentTags[(site.originalIndex * 3 + index * 2 + 5) % contentTags.length];
      const tags = bookmarkTagOverrides[id] || (firstTag === secondTag ? [firstTag] : [firstTag, secondTag]);
      return {
        id,
        title: `${site.name} · ${titleTemplates[(site.originalIndex + index) % titleTemplates.length]}`,
        url: `https://${site.domain}/saved/${index + 1}`,
        tags,
        folder: bookmarkFolders[id] || bottomFolders[(site.originalIndex + index) % bottomFolders.length][0],
        savedAt: Date.now() - ((site.originalIndex * 41 + index + 1) * 3600 * 1000)
      };
    });
  }

  function collectionItems(site) {
    const items = baseItems(site).filter(item => !deletedBookmarkIds.has(item.id));
    if (site.id === "zhihu" && bookmarkSaved) {
      items.push({
        id: "zhihu-popup-current",
        title: "Chrome 收藏夹层级与溢出规则",
        url: "https://www.zhihu.com/question/zero-new-tab",
        tags: bookmarkTagOverrides["zhihu-popup-current"] || Array.from(selectedTags),
        folder: bookmarkFolders["zhihu-popup-current"] || activeFolder,
        savedAt: Date.now() + 1000
      });
    }
    return items.sort((left, right) => right.savedAt - left.savedAt);
  }

  function siteCount(site) {
    return collectionItems(site).length;
  }

  function showToast(message, actionLabel = "", callback = null) {
    toastCopy.textContent = message;
    toastAction.textContent = actionLabel;
    toastAction.hidden = !actionLabel;
    toastCallback = callback;
    toast.classList.add("is-show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.classList.remove("is-show");
      toastCallback = null;
    }, actionLabel ? 8000 : 1900);
  }

  function mountDialog(markup, initialFocusSelector = "[data-dialog-cancel]", returnTarget = null) {
    if (confirmBackdrop.hidden) {
      dialogReturnFocus = returnTarget || (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    }
    confirmBackdrop.innerHTML = markup;
    confirmBackdrop.hidden = false;
    requestAnimationFrame(() => {
      const target = confirmBackdrop.querySelector(initialFocusSelector) || focusableElements(confirmBackdrop)[0];
      target?.focus({ preventScroll: true });
    });
  }

  function closeDialog({ restoreFocus = true } = {}) {
    confirmBackdrop.hidden = true;
    confirmBackdrop.innerHTML = "";
    if (restoreFocus && dialogReturnFocus?.isConnected) dialogReturnFocus.focus({ preventScroll: true });
    dialogReturnFocus = null;
  }

  function closeSettings({ restoreFocus = true } = {}) {
    settingsPopover.classList.remove("is-open");
    settingsPopover.setAttribute("aria-hidden", "true");
    const settingsButton = document.querySelector('[data-tool-index="6"]');
    settingsButton?.classList.remove("is-active");
    settingsButton?.setAttribute("aria-expanded", "false");
    if (restoreFocus && settingsReturnFocus?.isConnected) settingsReturnFocus.focus({ preventScroll: true });
    settingsReturnFocus = null;
  }

  function closePopup({ restoreFocus = true } = {}) {
    extensionPanel.classList.remove("is-open", "is-folder-mode", "is-initial-error");
    extensionPanel.setAttribute("aria-hidden", "true");
    pluginEntry.classList.remove("is-active");
    pluginEntry.setAttribute("aria-expanded", "false");
    document.getElementById("open-folder-picker").setAttribute("aria-expanded", "false");
    resetPopupSurface();
    setRenderedUiState("default");
    if (restoreFocus && !popupHostMode && popupReturnFocus?.isConnected) popupReturnFocus.focus({ preventScroll: true });
    popupReturnFocus = null;
  }

  function openSidePanelPreview() {
    closePopup({ restoreFocus: false });
    if (popupHostMode) {
      window.open("side-panel-demo.html?tab=open&current=saved", "_blank", "noopener");
      return;
    }
    closeTransient();
    sidePanelFrame.src = "side-panel-demo.html?tab=open&current=saved";
    sidePanelPreview.hidden = false;
    scene.classList.add("has-side-panel");
    notifyParent("side-panel", "current-open");
  }

  function closeSidePanelPreview() {
    if (sidePanelPreview.hidden) return;
    sidePanelPreview.hidden = true;
    scene.classList.remove("has-side-panel");
    pluginEntry.focus({ preventScroll: true });
  }

  function closeCollection({ restoreFocus = true } = {}) {
    collectionPanel.classList.remove("is-open");
    collectionPanel.setAttribute("aria-hidden", "true");
    document.querySelectorAll("[data-dock-site], [data-expanded-site]").forEach(button => button.setAttribute("aria-expanded", "false"));
    closeContextMenu();
    if (restoreFocus && collectionReturnFocus?.isConnected) collectionReturnFocus.focus({ preventScroll: true });
    collectionReturnFocus = null;
  }

  function closeFolderCollection({ restoreFocus = true } = {}) {
    folderCollectionPanel.classList.remove("is-open");
    folderCollectionPanel.setAttribute("aria-hidden", "true");
    document.querySelectorAll(".folder-chip").forEach(button => {
      button.classList.remove("is-active");
      button.setAttribute("aria-expanded", "false");
    });
    folderMoreButton.classList.remove("is-folder-active");
    if (restoreFocus && folderCollectionReturnFocus?.isConnected) folderCollectionReturnFocus.focus({ preventScroll: true });
    folderCollectionReturnFocus = null;
  }

  function openSettings(trigger = null, { focus = true } = {}) {
    settingsReturnFocus = trigger || (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    settingsPage = "home";
    renderSettings();
    settingsPopover.classList.add("is-open");
    settingsPopover.setAttribute("aria-hidden", "false");
    trigger?.classList.add("is-active");
    trigger?.setAttribute("aria-expanded", "true");
    if (focus) requestAnimationFrame(() => settingsPopover.querySelector("[data-close-settings], button, input")?.focus({ preventScroll: true }));
  }

  function closeTransient() {
    closeFolderOverflow({ restoreFocus: false });
    closePopup({ restoreFocus: false });
    closeCollection({ restoreFocus: false });
    closeFolderCollection({ restoreFocus: false });
    closeContextMenu();
    closeSettings({ restoreFocus: false });
    searchMenu.classList.remove("is-open");
    searchEngineMenu.classList.remove("is-open");
    searchEngineButton.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".tool-button.is-active").forEach(button => button.classList.remove("is-active"));
    editingBookmarkId = null;
  }

  function setDockExpanded(expanded) {
    scene.classList.toggle("is-expanded", expanded);
    document.getElementById("expand-dock")?.setAttribute("aria-expanded", String(expanded));
  }

  function applyDockAppearance() {
    const dockSizes = {
      "小": { icon: 40, slot: 64, dock: 72, radius: 8 },
      "中": { icon: 56, slot: 80, dock: 88, radius: 10 },
      "大": { icon: 72, slot: 96, dock: 104, radius: 12 }
    };
    const folderSizes = {
      "小": { bar: 32, chip: 24, icon: 14, font: 12, more: 24 },
      "中": { bar: 36, chip: 28, icon: 16, font: 13, more: 28 },
      "大": { bar: 40, chip: 32, icon: 18, font: 14, more: 32 }
    };
    const size = dockSizes[dockSize];
    const folder = folderSizes[folderSize];
    const labelHeight = showDockTitles ? 21 : 0;
    document.documentElement.style.setProperty("--dock-site-icon", `${size.icon}px`);
    document.documentElement.style.setProperty("--dock-site-slot", `${size.slot}px`);
    document.documentElement.style.setProperty("--dock-site-radius", `${size.radius}px`);
    document.documentElement.style.setProperty("--dock-expand-w", `${size.slot}px`);
    document.documentElement.style.setProperty("--dock-site-label-h", `${labelHeight}px`);
    document.documentElement.style.setProperty("--dock-default-h", `${size.dock + labelHeight}px`);
    document.documentElement.style.setProperty("--folder-h", `${folder.bar}px`);
    document.documentElement.style.setProperty("--folder-chip-h", `${folder.chip}px`);
    document.documentElement.style.setProperty("--folder-chip-icon", `${folder.icon}px`);
    document.documentElement.style.setProperty("--folder-chip-font", `${folder.font}px`);
    document.documentElement.style.setProperty("--folder-tool-icon", `${folder.icon}px`);
    document.documentElement.style.setProperty("--folder-more-w", `${folder.more}px`);
    scene.classList.toggle("show-dock-titles", showDockTitles);
  }

  function currentSearchEngine() {
    return searchEngines.find(engine => engine.id === searchEngineId) || searchEngines[0];
  }

  function updateSearchControls() {
    const engine = currentSearchEngine();
    document.getElementById("search-engine-mark").textContent = engine.label;
    searchEngineButton.title = engine.label;
    searchEngineButton.setAttribute("aria-label", `当前使用${engine.label}，点击切换`);
    const scopeButton = document.querySelector('[data-search-action="scope"]');
    scopeButton.classList.toggle("is-active", searchScope === "saved");
    scopeButton.setAttribute("aria-pressed", String(searchScope === "saved"));
    scopeButton.title = searchScope === "saved" ? "当前仅搜索已保存内容" : "筛选为仅搜索已保存内容";
  }

  function renderSearchEngineMenu() {
    searchEngineMenu.innerHTML = searchEngines.map(engine => `
      <button class="search-engine-option ${engine.id === searchEngineId ? "is-active" : ""}" type="button" role="menuitemradio" aria-checked="${engine.id === searchEngineId}" data-search-engine="${engine.id}">
        <span class="engine-option-mark">${escapeHTML(engine.mark)}</span><span>${escapeHTML(engine.label)}</span>${engine.id === searchEngineId ? '<i data-lucide="check"></i>' : ""}
      </button>`).join("");
    searchEngineMenu.querySelectorAll("[data-search-engine]").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      searchEngineId = button.dataset.searchEngine;
      persistState();
      updateSearchControls();
      renderSearchEngineMenu();
      renderSearchMenu();
      searchEngineMenu.classList.remove("is-open");
      searchEngineButton.setAttribute("aria-expanded", "false");
      mainSearch.focus();
    }));
    refreshIcons();
  }

  function allSearchRecords() {
    return sites.filter(site => !site.deleted).flatMap(site => collectionItems(site).map(item => ({ item, site })));
  }

  function normalizeSearchValue(value) {
    return String(value || "").trim().toLowerCase();
  }

  function normalizedUrlCandidate(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed || /\s/.test(trimmed)) return null;
    if (!/^(https?:\/\/|localhost(?::\d+)?(?:\/|$)|(?:[a-z0-9-]+\.)+[a-z]{2,}(?::\d+)?(?:\/|$))/i.test(trimmed)) return null;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  function searchRecordScore(record, query) {
    const title = normalizeSearchValue(record.item.title);
    const url = normalizeSearchValue(record.item.url);
    const site = normalizeSearchValue(`${record.site.name} ${record.site.domain}`);
    const tags = record.item.tags.map(normalizeSearchValue);
    const folder = normalizeSearchValue(record.item.folder);
    if (title.startsWith(query)) return 0;
    if (title.includes(query)) return 1;
    if (site.startsWith(query)) return 2;
    if (site.includes(query)) return 3;
    if (tags.some(tag => tag === query)) return 4;
    if (tags.some(tag => tag.includes(query))) return 5;
    if (folder.includes(query)) return 6;
    if (url.includes(query)) return 7;
    return Number.POSITIVE_INFINITY;
  }

  function matchingSavedRecords(query) {
    const normalized = normalizeSearchValue(query);
    if (!normalized) return [];
    return allSearchRecords()
      .map(record => ({ ...record, score: searchRecordScore(record, normalized) }))
      .filter(record => Number.isFinite(record.score))
      .sort((left, right) => left.score - right.score || right.item.savedAt - left.item.savedAt)
      .slice(0, 6);
  }

  function recentSavedRecords() {
    return allSearchRecords().sort((left, right) => right.item.savedAt - left.item.savedAt).slice(0, 5);
  }

  function registerSearchAction(action, markup) {
    const index = searchResultActions.push(action) - 1;
    return markup.replaceAll("__INDEX__", String(index)).replaceAll("__ACTIVE__", index === searchActiveIndex ? "is-active" : "");
  }

  function savedSearchMarkup(record) {
    const meta = [record.site.name, record.item.folder, ...record.item.tags.slice(0, 2)].filter(Boolean).join(" · ");
    return registerSearchAction({ type: "bookmark", ...record }, `
      <button class="search-result __ACTIVE__" id="search-result-__INDEX__" type="button" role="option" aria-selected="false" data-search-result="__INDEX__">
        <img src="${asset(record.site.icon)}" alt=""><span class="search-result-copy"><strong>${escapeHTML(record.item.title)}</strong><span>${escapeHTML(meta)}</span></span><i data-lucide="arrow-up-right"></i>
      </button>`);
  }

  function commandSearchMarkup(action, icon, title, meta) {
    return registerSearchAction(action, `
      <button class="search-result search-command __ACTIVE__" id="search-result-__INDEX__" type="button" role="option" aria-selected="false" data-search-result="__INDEX__">
        <span class="search-command-icon"><i data-lucide="${icon}"></i></span><span class="search-result-copy"><strong>${escapeHTML(title)}</strong><span>${escapeHTML(meta)}</span></span><i data-lucide="corner-down-left"></i>
      </button>`);
  }

  function renderSearchMenu() {
    const query = mainSearch.value.trim();
    const url = normalizedUrlCandidate(query);
    const saved = query ? matchingSavedRecords(query) : recentSavedRecords();
    searchResultActions = [];
    searchActiveIndex = -1;
    const sections = [];

    if (query && url && searchScope === "all") {
      sections.push(commandSearchMarkup({ type: "url", url }, "link", `打开 ${url}`, "网址导航"));
    }

    if (saved.length) {
      sections.push(`<div class="search-section-title">${query ? "已保存内容" : "最近保存"}</div>${saved.map(savedSearchMarkup).join("")}`);
    } else if (searchScope === "saved" || !query) {
      sections.push(`<div class="search-empty-state"><i data-lucide="bookmark"></i><strong>${query ? "没有匹配的已保存内容" : "暂无已保存内容"}</strong></div>`);
    }

    if (query && searchScope === "all") {
      const engine = currentSearchEngine();
      sections.push(commandSearchMarkup({ type: "web", query }, "globe-2", `使用${engine.label}搜索“${query}”`, "网页搜索"));
    }

    searchMenu.innerHTML = sections.join("");
    searchMenu.querySelectorAll("[data-search-result]").forEach(button => button.addEventListener("click", () => executeSearchAction(Number(button.dataset.searchResult))));
    mainSearch.setAttribute("aria-activedescendant", "");
    refreshIcons();
  }

  function setSearchActiveIndex(index) {
    if (!searchResultActions.length) return;
    searchActiveIndex = (index + searchResultActions.length) % searchResultActions.length;
    searchMenu.querySelectorAll("[data-search-result]").forEach(button => {
      const active = Number(button.dataset.searchResult) === searchActiveIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    mainSearch.setAttribute("aria-activedescendant", `search-result-${searchActiveIndex}`);
  }

  function executeSearchAction(index) {
    const action = searchResultActions[index];
    if (!action) return;
    searchMenu.classList.remove("is-open");
    searchEngineMenu.classList.remove("is-open");
    if (action.type === "bookmark") {
      openCollection(action.site.id);
      showToast(`打开已保存内容“${action.item.title}”`);
    }
    if (action.type === "url") showToast(`打开网址 ${action.url}`);
    if (action.type === "web") showToast(`使用${currentSearchEngine().label}搜索“${action.query}”`);
  }

  function openSearchInterface() {
    if (!searchMenu.classList.contains("is-open")) closeTransient();
    renderSearchMenu();
    searchMenu.classList.add("is-open");
    notifyParent("search-box");
  }

  function submitSearch() {
    const query = mainSearch.value.trim();
    if (searchActiveIndex >= 0) {
      executeSearchAction(searchActiveIndex);
      return;
    }
    if (!query) {
      openSearchInterface();
      return;
    }
    const url = normalizedUrlCandidate(query);
    if (url && searchScope === "all") {
      searchResultActions = [{ type: "url", url }];
      executeSearchAction(0);
      return;
    }
    if (searchScope === "saved") {
      const first = matchingSavedRecords(query)[0];
      if (first) {
        searchResultActions = [{ type: "bookmark", ...first }];
        executeSearchAction(0);
      } else {
        showToast("没有匹配的已保存内容");
      }
      return;
    }
    searchResultActions = [{ type: "web", query }];
    executeSearchAction(0);
  }

  function renderDock() {
    applyDockAppearance();
    const visible = visibleSites();
    scene.classList.toggle("has-bookmarks", activeSites().length > 0);
    document.getElementById("dock-row").innerHTML = visible.map(site => `
      <button class="dock-site" type="button" draggable="true" data-dock-site="${site.id}" aria-label="打开${escapeHTML(site.name)}内容集合" aria-haspopup="dialog" aria-expanded="false" aria-controls="collection-panel" data-surface-tooltip="${escapeHTML(site.name)}" data-surface-tooltip-detail="${escapeHTML(site.domain)} · 已保存 ${siteCount(site)} 条">
        <img src="${asset(site.icon)}" alt=""><span class="dock-site-label">${escapeHTML(site.name)}</span>
      </button>`).join("");

    document.getElementById("expanded-grid").innerHTML = visible.map(site => `
      <button class="expanded-site" type="button" draggable="true" data-expanded-site="${site.id}" aria-label="打开${escapeHTML(site.name)}内容集合" aria-haspopup="dialog" aria-expanded="false" aria-controls="collection-panel" data-surface-tooltip="${escapeHTML(site.name)}" data-surface-tooltip-detail="${escapeHTML(site.domain)} · 已保存 ${siteCount(site)} 条">
        <img src="${asset(site.icon)}" alt=""><span>${escapeHTML(site.name)}</span>
      </button>`).join("");

    document.querySelectorAll("[data-dock-site], [data-expanded-site]").forEach(button => {
      button.addEventListener("click", event => {
        const rect = event.currentTarget.getBoundingClientRect();
        openCollection(event.currentTarget.dataset.dockSite || event.currentTarget.dataset.expandedSite, rect, event.currentTarget);
        notifyParent("collection-panel");
      });
      button.addEventListener("contextmenu", event => {
        event.preventDefault();
        event.stopPropagation();
        openSiteContextMenu(event.currentTarget.dataset.dockSite || event.currentTarget.dataset.expandedSite, "dock", event.clientX, event.clientY, event.currentTarget);
      });
    });

    bindSiteDrag(document.querySelectorAll("[data-dock-site], [data-expanded-site]"));
    requestAnimationFrame(syncDockCapacity);
    refreshIcons();
  }

  function syncDockCapacity() {
    const row = document.getElementById("dock-row");
    const slot = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--dock-site-slot")) || 80;
    const controlSlot = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--dock-expand-w")) || slot;
    const buttons = Array.from(row.querySelectorAll(".dock-site"));
    const fullCapacity = Math.max(1, Math.floor(row.clientWidth / slot));
    const hasOverflow = buttons.length > fullCapacity;
    const safeWidth = hasOverflow ? Math.max(slot, row.clientWidth - controlSlot * 2) : row.clientWidth;
    const capacity = Math.max(1, Math.floor(safeWidth / slot));
    buttons.forEach((button, index) => { button.hidden = index >= capacity; });
    const overflow = Math.max(0, buttons.length - capacity);
    const expand = document.getElementById("expand-dock");
    document.getElementById("default-dock").classList.toggle("has-overflow", hasOverflow);
    expand.hidden = !hasOverflow;
    expand.setAttribute("aria-label", overflow ? `展开全部站点，另有 ${overflow} 个站点未显示` : `展开全部 ${buttons.length} 个站点`);
    expand.dataset.surfaceTooltip = overflow ? `另有 ${overflow} 个站点，展开查看全部` : "展开全部站点";
  }

  function bindSiteDrag(nodes) {
    nodes.forEach(node => {
      if (node.getAttribute("draggable") !== "true") return;
      const id = node.dataset.dockSite || node.dataset.expandedSite || node.dataset.managementSite;
      node.addEventListener("dragstart", event => {
        draggedSiteId = id;
        node.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
      });
      node.addEventListener("dragend", () => {
        draggedSiteId = null;
        node.classList.remove("is-dragging");
      });
      node.addEventListener("dragover", event => event.preventDefault());
      node.addEventListener("drop", event => {
        event.preventDefault();
        if (draggedSiteId && draggedSiteId !== id) reorderBefore(draggedSiteId, id);
      });
    });
  }

  function reorderBefore(sourceId, targetId) {
    const sourceIndex = sites.findIndex(site => site.id === sourceId);
    const targetIndex = sites.findIndex(site => site.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;
    const [moved] = sites.splice(sourceIndex, 1);
    sites.splice(sites.findIndex(site => site.id === targetId), 0, moved);
    persistState();
    renderAll();
  }

  function moveSite(id, direction) {
    const index = sites.findIndex(site => site.id === id);
    if (index < 0) return;
    const [site] = sites.splice(index, 1);
    if (direction === "first") sites.unshift(site); else sites.push(site);
    closeContextMenu();
    persistState();
    renderAll();
    showToast(direction === "first" ? `已将 ${site.name} 移到最前` : `已将 ${site.name} 移到最后`);
  }

  function hideSite(id) {
    const site = byId(id);
    if (!site) return;
    site.hidden = true;
    closeContextMenu();
    persistState();
    renderAll();
    showToast(`已从 Dock 隐藏 ${site.name}`);
  }

  function resetOrder() {
    sites.sort((left, right) => left.originalIndex - right.originalIndex);
    persistState();
    renderAll();
    showToast("已恢复默认排序，隐藏和回收站状态未改变");
  }

  function sortBookmarkItems(items, sortMode) {
    return [...items].sort((left, right) => sortMode === "name"
      ? left.title.localeCompare(right.title, "zh-CN")
      : right.savedAt - left.savedAt);
  }

  function bookmarkRowMarkup(item, site, surface) {
    const isDomain = surface === "domain";
    const rowAttribute = isDomain ? `data-bookmark-row="${escapeHTML(item.id)}"` : `data-folder-bookmark-open="${escapeHTML(item.id)}"`;
    const menuAttribute = isDomain ? `data-item-menu="${escapeHTML(item.id)}"` : `data-folder-bookmark-menu="${escapeHTML(item.id)}"`;
    const rowClass = isDomain ? "site-row" : "folder-bookmark-row";
    const menuClass = isDomain ? "item-more" : "folder-bookmark-menu";
    return `
      <div class="${rowClass} bookmark-row" role="button" tabindex="0" ${rowAttribute} title="${escapeHTML(item.url)}">
        <img class="bookmark-row-icon" src="${asset(site.icon)}" alt="">
        <div class="bookmark-row-copy"><div class="bookmark-row-title">${escapeHTML(item.title)}</div><div class="bookmark-row-meta">${escapeHTML(item.url)}</div></div>
        <div class="bookmark-row-tags">${item.tags.slice(0, 2).map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
        <button class="${menuClass} bookmark-row-menu" type="button" ${menuAttribute} aria-label="${escapeHTML(item.title)}更多操作"><i data-lucide="ellipsis"></i></button>
      </div>`;
  }

  function bookmarkFacetStats(items) {
    const counts = new Map();
    items.forEach(item => item.tags.forEach(tag => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return Array.from(counts, ([tag, count]) => ({ tag, count, usedAt: Number(tagUsage[tag] || 0) }));
  }

  function facetButtonMarkup(item, activeTag, dataName) {
    return `<button class="facet ${activeTag === item.tag ? "is-active" : ""}" type="button" data-${dataName}="${escapeHTML(item.tag)}" aria-pressed="${activeTag === item.tag}"><span>${escapeHTML(item.tag)}</span><span class="facet-count">${item.count}</span></button>`;
  }

  function facetPanelMarkup({ stats, activeTag, query, total, dataName, searchInputId }) {
    const normalizedQuery = query.trim().toLowerCase();
    const common = [...stats]
      .sort((left, right) => right.usedAt - left.usedAt || right.count - left.count || left.tag.localeCompare(right.tag, "zh-CN"))
      .slice(0, 6);
    const filteredStats = stats.filter(item => !normalizedQuery || item.tag.toLowerCase().includes(normalizedQuery));
    const commonIds = new Set(common.map(item => item.tag));
    const others = (normalizedQuery ? filteredStats : filteredStats.filter(item => !commonIds.has(item.tag)))
      .sort((left, right) => right.count - left.count || left.tag.localeCompare(right.tag, "zh-CN"));
    const commonMarkup = !normalizedQuery && common.length ? `
      <div class="facet-section-title">常用标签</div>
      <div class="facet-common">${common.map(item => facetButtonMarkup(item, activeTag, dataName)).join("")}</div>` : "";
    const listMarkup = others.length
      ? `<div class="facet-section-title">${normalizedQuery ? "搜索结果" : "其他标签"}</div><div class="facet-list">${others.map(item => facetButtonMarkup(item, activeTag, dataName)).join("")}</div>`
      : normalizedQuery ? `<div class="management-empty">没有匹配的标签</div>` : "";
    return `
      ${stats.length > 8 ? `<label class="facet-search"><i data-lucide="search"></i><input id="${searchInputId}" value="${escapeHTML(query)}" placeholder="搜索标签" autocomplete="off"></label>` : ""}
      <div class="facet-scroll">
        <button class="facet ${activeTag === "全部" ? "is-active" : ""}" type="button" data-${dataName}="全部" aria-pressed="${activeTag === "全部"}"><span>全部</span><span class="facet-count">${total}</span></button>
        ${commonMarkup}${listMarkup}
      </div>`;
  }

  function renderCollection() {
    const site = byId(activeCollectionSiteId) || visibleSites()[0];
    if (!site) return;
    activeCollectionSiteId = site.id;
    const allItems = collectionItems(site);
    const availableTags = Array.from(new Set(allItems.flatMap(item => item.tags))).filter(Boolean);
    if (activeFacet !== "全部" && !availableTags.includes(activeFacet)) activeFacet = "全部";
    const filteredItems = activeFacet === "全部" ? allItems : allItems.filter(item => item.tags.includes(activeFacet));
    const visibleItems = sortBookmarkItems(filteredItems, activeCollectionSort);

    document.getElementById("collection-logo").src = asset(site.icon);
    document.getElementById("collection-logo").alt = site.name;
    document.getElementById("collection-name").textContent = site.name;
    document.getElementById("collection-meta").textContent = activeFacet === "全部"
      ? `${site.domain} · ${allItems.length} 条保存内容`
      : `${site.domain} · ${visibleItems.length}/${allItems.length} 条`;

    document.getElementById("site-list").innerHTML = visibleItems.length ? visibleItems.map(item => bookmarkRowMarkup(item, site, "domain")).join("") : `
      <div class="collection-empty"><div>当前筛选下没有 Bookmark。<br><button type="button" data-clear-facet>查看全部内容</button></div></div>`;

    document.querySelectorAll("[data-collection-sort]").forEach(button => {
      const active = button.dataset.collectionSort === activeCollectionSort;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.getElementById("facets").innerHTML = facetPanelMarkup({
      stats: bookmarkFacetStats(allItems),
      activeTag: activeFacet,
      query: facetQuery,
      total: allItems.length,
      dataName: "facet",
      searchInputId: "facet-search-input"
    });

    document.querySelectorAll("[data-bookmark-row]").forEach(row => {
      const open = () => {
        const item = allItems.find(candidate => candidate.id === row.dataset.bookmarkRow);
        if (item) showToast(`在当前标签页打开“${item.title}”`);
      };
      row.addEventListener("click", event => {
        if (event.target.closest("[data-item-menu]")) return;
        open();
      });
      row.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") open(); });
      row.addEventListener("contextmenu", event => {
        event.preventDefault();
        const item = allItems.find(candidate => candidate.id === row.dataset.bookmarkRow);
        openBookmarkContextMenu(item, site, event.clientX, event.clientY, row);
      });
    });
    document.querySelectorAll("[data-item-menu]").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      const item = allItems.find(candidate => candidate.id === button.dataset.itemMenu);
      const rect = button.getBoundingClientRect();
      openBookmarkContextMenu(item, site, rect.right - 224, rect.bottom + 4, event.currentTarget);
    }));
    document.querySelectorAll("[data-facet]").forEach(button => button.addEventListener("click", () => {
      const requested = button.dataset.facet;
      activeFacet = requested === activeFacet && requested !== "全部" ? "全部" : requested;
      if (activeFacet !== "全部") tagUsage[activeFacet] = Date.now();
      persistState();
      renderCollection();
      notifyParent("tag-filter");
    }));
    const facetSearch = document.getElementById("facet-search-input");
    if (facetSearch) facetSearch.addEventListener("input", event => {
      const caret = event.target.selectionStart;
      facetQuery = event.target.value;
      renderCollection();
      const next = document.getElementById("facet-search-input");
      if (next) { next.focus(); next.setSelectionRange(caret, caret); }
    });
    const clearFacet = document.querySelector("[data-clear-facet]");
    if (clearFacet) clearFacet.addEventListener("click", () => { activeFacet = "全部"; renderCollection(); });
    refreshIcons();
  }

  function openCollection(siteId, anchorRect = null, trigger = null) {
    const site = byId(siteId);
    if (!site || site.deleted) return;
    const returnTarget = trigger || (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    lastCollectionAnchorRect = anchorRect || lastCollectionAnchorRect;
    closeTransient();
    collectionReturnFocus = returnTarget;
    setDockExpanded(false);
    activeCollectionSiteId = siteId;
    activeFacet = "全部";
    facetQuery = "";
    renderCollection();
    collectionPanel.classList.add("is-open");
    collectionPanel.setAttribute("aria-hidden", "false");
    hideSurfaceTooltip();
    document.querySelectorAll("[data-dock-site], [data-expanded-site]").forEach(button => {
      button.setAttribute("aria-expanded", String((button.dataset.dockSite || button.dataset.expandedSite) === siteId));
    });
    requestAnimationFrame(positionCollection);
  }

  function positionCollection() {
    if (!collectionPanel.classList.contains("is-open")) return;
    const liveAnchor = document.querySelector(`[data-dock-site="${activeCollectionSiteId}"]:not([hidden])`);
    const anchor = liveAnchor ? liveAnchor.getBoundingClientRect() : lastCollectionAnchorRect;
    if (!anchor) return;
    const width = collectionPanel.offsetWidth;
    const height = collectionPanel.offsetHeight;
    const center = anchor.left + anchor.width / 2;
    const left = Math.max(12, Math.min(center - width / 2, window.innerWidth - width - 12));
    const minTop = 48;
    const maxTop = window.innerHeight - 32 - height - 10;
    const canPlaceAbove = anchor.top - height - 12 >= minTop;
    const top = canPlaceAbove ? Math.min(maxTop, anchor.top - height - 12) : Math.max(minTop, Math.min(anchor.bottom + 12, maxTop));
    collectionPanel.style.left = `${left}px`;
    collectionPanel.style.top = `${top}px`;
    collectionPanel.style.setProperty("--collection-caret-x", `${Math.max(18, Math.min(center - left, width - 18))}px`);
    collectionPanel.dataset.placement = canPlaceAbove ? "above" : "below";
  }

  function positionContextMenu(x, y, estimatedHeight, trigger = null) {
    if (trigger instanceof HTMLElement) lastContextTrigger = trigger;
    contextMenu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - 232))}px`;
    contextMenu.style.top = `${Math.max(46, Math.min(y, window.innerHeight - estimatedHeight - 8))}px`;
    contextMenu.classList.add("is-open");
    contextMenu.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => menuItems(contextMenu)[0]?.focus({ preventScroll: true }));
  }

  function closeContextMenu({ restoreFocus = false } = {}) {
    contextMenu.classList.remove("is-open");
    contextMenu.setAttribute("aria-hidden", "true");
    contextMenu.innerHTML = "";
    if (restoreFocus && lastContextTrigger?.isConnected) lastContextTrigger.focus({ preventScroll: true });
  }

  function openSiteContextMenu(siteId, context, x, y, trigger = null) {
    const site = byId(siteId);
    if (!site) return;
    const deleteItem = context === "settings" ? `
      <div class="menu-separator"></div>
      <button class="context-item danger" type="button" data-site-action="delete"><i data-lucide="trash-2"></i><span>删除该域名的全部收藏…</span></button>` : "";
    contextMenu.innerHTML = `
      <div class="menu-title">${escapeHTML(site.name)} · ${siteCount(site)} 条收藏</div>
      <button class="context-item" type="button" role="menuitem" data-site-action="first"><i data-lucide="arrow-up-to-line"></i><span>移到最前</span></button>
      <button class="context-item" type="button" role="menuitem" data-site-action="last"><i data-lucide="arrow-down-to-line"></i><span>移到最后</span></button>
      <button class="context-item" type="button" role="menuitem" data-site-action="hide"><i data-lucide="eye-off"></i><span>从 Dock 隐藏</span></button>
      ${deleteItem}`;
    contextMenu.querySelectorAll(".context-item").forEach(item => item.setAttribute("role", "menuitem"));
    positionContextMenu(x, y, context === "settings" ? 190 : 154, trigger);
    contextMenu.querySelectorAll("[data-site-action]").forEach(button => button.addEventListener("click", () => {
      if (button.dataset.siteAction === "first" || button.dataset.siteAction === "last") moveSite(siteId, button.dataset.siteAction);
      if (button.dataset.siteAction === "hide") hideSite(siteId);
      if (button.dataset.siteAction === "delete") openDomainDeleteConfirm(siteId);
    }));
    refreshIcons();
  }

  function openBookmarkContextMenu(item, site, x, y, trigger = null) {
    if (!item) return;
    contextMenu.innerHTML = `
      <div class="menu-title">域名由网址自动计算，不能跨域移动</div>
      <button class="context-item" type="button" role="menuitem" data-bookmark-action="new-tab"><i data-lucide="square-arrow-out-up-right"></i><span>在新标签页打开</span></button>
      <button class="context-item" type="button" role="menuitem" data-bookmark-action="new-window"><i data-lucide="app-window"></i><span>在新窗口打开</span></button>
      <button class="context-item" type="button" role="menuitem" data-bookmark-action="copy"><i data-lucide="copy"></i><span>复制链接</span></button>
      <div class="menu-separator"></div>
      <button class="context-item" type="button" role="menuitem" data-bookmark-action="tags"><i data-lucide="tags"></i><span>管理标签</span></button>
      <button class="context-item" type="button" role="menuitem" data-bookmark-action="folder"><i data-lucide="folder-input"></i><span>移动到收藏夹</span></button>
      <button class="context-item danger" type="button" role="menuitem" data-bookmark-action="delete"><i data-lucide="trash-2"></i><span>删除 Bookmark</span></button>`;
    positionContextMenu(x, y, 286, trigger);
    contextMenu.querySelectorAll("[data-bookmark-action]").forEach(button => button.addEventListener("click", async () => {
      const action = button.dataset.bookmarkAction;
      closeContextMenu();
      if (action === "new-tab") showToast(`在新标签页打开“${item.title}”`);
      if (action === "new-window") showToast(`在新窗口打开“${item.title}”`);
      if (action === "copy") {
        try { await navigator.clipboard.writeText(item.url); } catch { /* 浏览器权限不可用时保留演示反馈 */ }
        showToast("链接已复制");
      }
      if (action === "tags") openTagManager(item);
      if (action === "folder") openFolderPicker(item.id);
      if (action === "delete") openBookmarkDeleteConfirm(item, site);
    }));
    refreshIcons();
  }

  function openBookmarkDeleteConfirm(item, site) {
    mountDialog(`
      <section class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="bookmark-delete-title">
        <div class="confirm-body">
          <div class="confirm-icon"><i data-lucide="trash-2"></i></div>
          <h2 id="bookmark-delete-title">删除这个 Bookmark？</h2>
          <p>“${escapeHTML(item.title)}”会同时从域名集合、普通收藏夹和标签结果中移除。</p>
        </div>
        <footer class="confirm-actions"><button class="dialog-button" type="button" data-dialog-cancel>取消</button><button class="dialog-button danger" type="button" data-confirm-bookmark-delete>删除</button></footer>
      </section>`, "[data-dialog-cancel]", lastContextTrigger);
    confirmBackdrop.querySelector("[data-dialog-cancel]").addEventListener("click", closeDialog);
    confirmBackdrop.querySelector("[data-confirm-bookmark-delete]").addEventListener("click", () => {
      deletedBookmarkIds.add(item.id);
      closeDialog();
      persistState();
      renderAll();
      showToast("Bookmark 已删除", "撤销", () => {
        deletedBookmarkIds.delete(item.id);
        persistState();
        renderAll();
        showToast("已恢复 Bookmark");
      });
    });
    refreshIcons();
  }

  function openTagManager(item) {
    const working = new Set(item.tags);
    mountDialog(`
      <section class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="tag-manager-title">
        <div class="confirm-body">
          <h2 id="tag-manager-title">管理标签</h2>
          <p>${escapeHTML(item.title)}</p>
          <div class="tag-manager-grid">${popupTags.slice(0, 12).map(tag => `<button class="tag-manager-chip ${working.has(tag) ? "is-active" : ""}" type="button" aria-pressed="${working.has(tag)}" data-dialog-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</button>`).join("")}</div>
        </div>
        <footer class="confirm-actions"><button class="dialog-button" type="button" data-dialog-cancel>取消</button><button class="dialog-button" type="button" data-save-tags>保存</button></footer>
      </section>`, "[data-dialog-cancel]", lastContextTrigger);
    confirmBackdrop.querySelector("[data-dialog-cancel]").addEventListener("click", closeDialog);
    confirmBackdrop.querySelectorAll("[data-dialog-tag]").forEach(button => button.addEventListener("click", () => {
      if (working.has(button.dataset.dialogTag)) working.delete(button.dataset.dialogTag); else working.add(button.dataset.dialogTag);
      button.classList.toggle("is-active", working.has(button.dataset.dialogTag));
      button.setAttribute("aria-pressed", String(working.has(button.dataset.dialogTag)));
    }));
    confirmBackdrop.querySelector("[data-save-tags]").addEventListener("click", () => {
      bookmarkTagOverrides[item.id] = Array.from(working);
      closeDialog();
      persistState();
      renderAll();
      showToast("标签已更新");
    });
    refreshIcons();
  }

  function openDomainDeleteConfirm(siteId) {
    closeContextMenu();
    const site = byId(siteId);
    const count = siteCount(site);
    mountDialog(`
      <section class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="domain-delete-title">
        <div class="confirm-body">
          <div class="confirm-icon"><i data-lucide="triangle-alert"></i></div>
          <h2 id="domain-delete-title">删除 ${escapeHTML(site.domain)} 的全部收藏？</h2>
          <p>这不是“从 Dock 隐藏”。删除后，该域名下的 <strong>${count} 条收藏</strong>会从以下位置同步消失：</p>
          <div class="loss-list">普通收藏夹 · 标签筛选 · 搜索结果 · 域名集合 · 底部 Dock</div>
          <div class="recycle-note"><i data-lucide="archive-restore"></i><span>内容会进入回收站并保留 30 天。恢复时仍保留原收藏夹和标签。</span></div>
        </div>
        <footer class="confirm-actions"><button class="dialog-button" type="button" data-dialog-cancel>取消</button><button class="dialog-button danger" type="button" data-confirm-domain-delete>删除 ${count} 条收藏</button></footer>
      </section>`, "[data-dialog-cancel]", lastContextTrigger);
    confirmBackdrop.querySelector("[data-dialog-cancel]").addEventListener("click", closeDialog);
    confirmBackdrop.querySelector("[data-confirm-domain-delete]").addEventListener("click", () => {
      site.hiddenBeforeDelete = site.hidden;
      site.deleted = true;
      site.deletedAt = Date.now();
      closeDialog();
      collectionPanel.classList.remove("is-open");
      persistState();
      renderAll();
      showToast(`已将 ${site.domain} 的 ${count} 条收藏移入回收站`, "撤销", () => restoreDeletedSite(site.id));
    });
    refreshIcons();
  }

  function restoreDeletedSite(siteId) {
    const site = byId(siteId);
    if (!site) return;
    site.deleted = false;
    site.deletedAt = null;
    site.hidden = Boolean(site.hiddenBeforeDelete);
    persistState();
    renderAll();
    showToast(`已恢复 ${site.name}`);
  }

  function renderSettings() {
    const visibleCount = visibleSites().length;
    const hiddenCount = hiddenSites().length;
    const trashCount = trashSites().length;
    settingsPopover.classList.toggle("is-sites", settingsPage === "sites");
    if (settingsPage === "home") {
      settingsPopover.innerHTML = `
        <header class="settings-header"><strong>设置</strong><span class="settings-meta">当前设置集中展示</span><button class="icon-button" type="button" data-close-settings aria-label="关闭设置"><i data-lucide="x"></i></button></header>
        <div class="settings-scroll">
          <div class="settings-section-title">Dock 显示</div>
          <div class="setting-row-v2"><div class="setting-copy"><strong>显示站点名称</strong><span>只改变 Dock 展示，不修改站点数据</span></div><button class="switch-v2 ${showDockTitles ? "is-active" : ""}" type="button" role="switch" data-title-switch aria-label="显示站点名称" aria-checked="${showDockTitles}"></button></div>
          <div class="setting-row-v2"><div class="setting-copy"><strong>站点 Logo 尺寸</strong><span>小 40px · 中 56px · 大 72px</span></div><div class="segmented-v2" data-size-control role="radiogroup" aria-label="Dock Logo 尺寸">${["小", "中", "大"].map(size => `<button class="${dockSize === size ? "is-active" : ""}" type="button" role="radio" data-dock-size="${size}" aria-checked="${dockSize === size}">${size}</button>`).join("")}</div></div>
          <div class="setting-row-v2"><div class="setting-copy"><strong>收藏夹尺寸</strong><span>独立调整图标、文字和底栏高度</span></div><div class="segmented-v2" data-folder-size-control role="radiogroup" aria-label="收藏夹尺寸">${["小", "中", "大"].map(size => `<button class="${folderSize === size ? "is-active" : ""}" type="button" role="radio" data-folder-size="${size}" aria-checked="${folderSize === size}">${size}</button>`).join("")}</div></div>
          <div class="settings-section-title">内容管理</div>
          <button class="setting-row-v2" type="button" data-open-site-management><span class="setting-leading"><i data-lucide="layout-grid"></i></span><span class="setting-copy"><strong>站点管理</strong><span>排序、隐藏、恢复与危险删除</span></span><span class="setting-value">${visibleCount} 显示 · ${hiddenCount} 隐藏</span><i class="setting-chevron" data-lucide="chevron-right"></i></button>
        </div>
        <footer class="settings-footer-v2"><span>展开 Dock 是直接命令，不属于设置项</span><button class="command-button-v2" type="button" data-reset-display><i data-lucide="rotate-ccw"></i><span>恢复显示默认</span></button></footer>`;
    } else {
      const source = managementTab === "visible" ? visibleSites() : managementTab === "hidden" ? hiddenSites() : trashSites();
      const query = managementQuery.trim().toLowerCase();
      const filtered = source.filter(site => !query || `${site.name} ${site.domain}`.toLowerCase().includes(query));
      const draggingAllowed = managementTab === "visible" && !query;
      const rows = filtered.length ? filtered.map(site => `
        <div class="management-site-row" draggable="${draggingAllowed}" data-management-site="${site.id}">
          <span class="drag-handle ${draggingAllowed ? "" : "is-disabled"}" title="${draggingAllowed ? "拖拽排序" : "搜索或当前视图下不支持拖拽"}"><i data-lucide="grip-vertical"></i></span>
          <img src="${asset(site.icon)}" alt=""><span class="management-site-copy"><strong>${escapeHTML(site.name)}</strong><span>${escapeHTML(site.domain)}${site.deleted ? " · 30 天后永久删除" : ""}</span></span>
          <span class="management-site-count">${siteCount(site)} 条</span>
          ${managementTab === "hidden" ? `<button class="icon-button" type="button" data-restore-hidden="${site.id}" aria-label="恢复显示${escapeHTML(site.name)}"><i data-lucide="eye"></i></button>` : ""}
          ${managementTab === "trash" ? `<button class="command-button-v2" type="button" data-restore-trash="${site.id}"><i data-lucide="rotate-ccw"></i><span>恢复</span></button>` : `<button class="icon-button" type="button" data-site-menu="${site.id}" aria-label="${escapeHTML(site.name)}更多操作"><i data-lucide="ellipsis"></i></button>`}
        </div>`).join("") : `<div class="management-empty">${query ? "没有匹配的站点<br>换一个名称或域名试试" : managementTab === "hidden" ? "没有隐藏的站点" : managementTab === "trash" ? "回收站为空" : "没有显示中的站点"}</div>`;
      settingsPopover.innerHTML = `
        <header class="settings-header"><button class="icon-button" type="button" data-back-settings aria-label="返回设置"><i data-lucide="arrow-left"></i></button><strong>站点管理</strong><span class="settings-meta">${activeSites().length} 个站点</span><button class="icon-button" type="button" data-close-settings aria-label="关闭设置"><i data-lucide="x"></i></button></header>
        <div class="settings-scroll">
          <div class="management-toolbar">
            <label class="management-search"><i data-lucide="search"></i><input id="management-search-input" value="${escapeHTML(managementQuery)}" placeholder="搜索名称或域名" autocomplete="off"></label>
            <div class="management-tabs" role="tablist" aria-label="站点管理范围"><button class="${managementTab === "visible" ? "is-active" : ""}" type="button" role="tab" data-management-tab="visible" aria-selected="${managementTab === "visible"}">显示中 ${visibleCount}</button><button class="${managementTab === "hidden" ? "is-active" : ""}" type="button" role="tab" data-management-tab="hidden" aria-selected="${managementTab === "hidden"}">已隐藏 ${hiddenCount}</button><button class="${managementTab === "trash" ? "is-active" : ""}" type="button" role="tab" data-management-tab="trash" aria-selected="${managementTab === "trash"}">回收站 ${trashCount}</button></div>
            ${query ? `<div class="management-hint">搜索过滤时暂停拖拽，仍可使用置前、置后、隐藏和删除。</div>` : ""}
          </div>
          <div class="management-list">${rows}</div>
        </div>
        <footer class="settings-footer-v2"><span>隐藏不删除收藏 · 删除内容保留 30 天</span><button class="command-button-v2" type="button" data-reset-order><i data-lucide="rotate-ccw"></i><span>恢复排序默认</span></button></footer>`;
    }

    settingsPopover.querySelectorAll("[data-close-settings]").forEach(button => button.addEventListener("click", () => closeSettings()));
    const openManagement = settingsPopover.querySelector("[data-open-site-management]");
    if (openManagement) openManagement.addEventListener("click", () => { settingsPage = "sites"; managementQuery = ""; renderSettings(); refreshIcons(); });
    const back = settingsPopover.querySelector("[data-back-settings]");
    if (back) back.addEventListener("click", () => { settingsPage = "home"; managementQuery = ""; renderSettings(); refreshIcons(); });
    const resetDisplay = settingsPopover.querySelector("[data-reset-display]");
    if (resetDisplay) resetDisplay.addEventListener("click", () => { showDockTitles = false; dockSize = "中"; folderSize = "中"; persistState(); renderAll(); showToast("已恢复 Dock 与收藏夹显示默认"); });
    const resetOrderButton = settingsPopover.querySelector("[data-reset-order]");
    if (resetOrderButton) resetOrderButton.addEventListener("click", resetOrder);
    settingsPopover.querySelectorAll("[data-management-tab]").forEach(button => button.addEventListener("click", () => {
      managementTab = button.dataset.managementTab;
      managementQuery = "";
      renderSettings();
      refreshIcons();
      requestAnimationFrame(() => settingsPopover.querySelector(`[data-management-tab="${managementTab}"]`)?.focus({ preventScroll: true }));
    }));
    const search = document.getElementById("management-search-input");
    if (search) search.addEventListener("input", event => {
      const caret = event.target.selectionStart;
      managementQuery = event.target.value;
      renderSettings();
      const next = document.getElementById("management-search-input");
      if (next) { next.focus(); next.setSelectionRange(caret, caret); }
    });
    settingsPopover.querySelectorAll("[data-site-menu]").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      const rect = event.currentTarget.getBoundingClientRect();
      openSiteContextMenu(button.dataset.siteMenu, "settings", rect.right - 224, rect.bottom + 4, event.currentTarget);
    }));
    settingsPopover.querySelectorAll("[data-restore-hidden]").forEach(button => button.addEventListener("click", () => {
      const site = byId(button.dataset.restoreHidden);
      site.hidden = false;
      persistState();
      renderAll();
      showToast(`已恢复显示 ${site.name}`);
    }));
    settingsPopover.querySelectorAll("[data-restore-trash]").forEach(button => button.addEventListener("click", () => restoreDeletedSite(button.dataset.restoreTrash)));
    bindSiteDrag(settingsPopover.querySelectorAll("[data-management-site]"));
    refreshIcons();
  }

  function folderChipMarkup(folder, overflow = false) {
    return `<button class="folder-chip${overflow ? " folder-overflow-chip" : ""}" type="button" style="--chip:${folder[1]}" title="${escapeHTML(folder[0])}" data-folder-name="${escapeHTML(folder[0])}" aria-haspopup="dialog" aria-expanded="false" aria-controls="folder-collection-panel"><i data-lucide="folder"></i><span>${escapeHTML(folder[0])}</span></button>`;
  }

  function bindFolderChipButtons(root) {
    root.querySelectorAll(".folder-chip").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      openFolderCollection(button.dataset.folderName, event.currentTarget);
      notifyParent("category-bar");
    }));
  }

  function closeFolderOverflow({ restoreFocus = false } = {}) {
    const wasOpen = !folderOverflowPanel.hidden;
    folderOverflowPanel.hidden = true;
    folderOverflowPanel.setAttribute("aria-hidden", "true");
    folderMoreButton.classList.remove("is-open");
    folderMoreButton.setAttribute("aria-expanded", "false");
    if (restoreFocus && wasOpen && folderOverflowReturnFocus?.isConnected) folderOverflowReturnFocus.focus({ preventScroll: true });
    folderOverflowReturnFocus = null;
  }

  function renderFolderOverflow() {
    const overflowSet = new Set(overflowFolderNames);
    const folders = bottomFolders.filter(folder => overflowSet.has(folder[0]));
    folderOverflowPanel.innerHTML = folders.map(folder => folderChipMarkup(folder, true)).join("");
    bindFolderChipButtons(folderOverflowPanel);
    refreshIcons();
  }

  function positionFolderOverflow() {
    if (folderOverflowPanel.hidden || folderMoreButton.hidden) return;
    const anchor = folderMoreButton.getBoundingClientRect();
    const width = folderOverflowPanel.offsetWidth;
    const height = folderOverflowPanel.offsetHeight;
    const left = Math.max(8, Math.min(anchor.right - width, window.innerWidth - width - 8));
    const top = Math.max(48, anchor.top - height - 8);
    folderOverflowPanel.style.left = `${left}px`;
    folderOverflowPanel.style.top = `${top}px`;
  }

  function openFolderOverflow() {
    const willOpen = folderOverflowPanel.hidden;
    closeTransient();
    if (!willOpen || !overflowFolderNames.length) return;
    folderOverflowReturnFocus = folderMoreButton;
    renderFolderOverflow();
    folderOverflowPanel.hidden = false;
    folderOverflowPanel.setAttribute("aria-hidden", "false");
    folderMoreButton.classList.add("is-open");
    folderMoreButton.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      positionFolderOverflow();
      folderOverflowPanel.querySelector(".folder-chip")?.focus({ preventScroll: true });
    });
  }

  function syncFolderCapacity() {
    const list = document.getElementById("bottom-folders");
    const chips = Array.from(list.querySelectorAll(".folder-chip"));
    if (!chips.length) {
      overflowFolderNames = [];
      folderMoreButton.hidden = true;
      closeFolderOverflow();
      return;
    }
    chips.forEach(chip => { chip.hidden = false; });
    folderMoreButton.hidden = true;
    const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
    const total = chips.reduce((sum, chip) => sum + chip.offsetWidth, 0) + gap * Math.max(0, chips.length - 1);
    if (total <= list.clientWidth + .5) {
      overflowFolderNames = [];
      folderMoreButton.classList.remove("is-folder-active");
      closeFolderOverflow();
      return;
    }

    folderMoreButton.hidden = false;
    void document.getElementById("folder-header").offsetWidth;
    const available = list.clientWidth;
    let used = 0;
    let visibleCount = 0;
    let overflowStarted = false;
    overflowFolderNames = [];
    chips.forEach(chip => {
      const width = chip.offsetWidth;
      const next = used + (visibleCount ? gap : 0) + width;
      const fits = !overflowStarted && (next <= available + .5 || visibleCount === 0);
      chip.hidden = !fits;
      if (fits) {
        used = next;
        visibleCount += 1;
      } else {
        overflowStarted = true;
        overflowFolderNames.push(chip.dataset.folderName);
      }
    });
    folderMoreButton.classList.toggle("is-folder-active", folderCollectionPanel.classList.contains("is-open") && overflowFolderNames.includes(activeFolderPanelName));
    renderFolderOverflow();
    if (!folderOverflowPanel.hidden) requestAnimationFrame(positionFolderOverflow);
  }

  function renderBottom() {
    const visibleFolders = demoScenario === "empty" ? bottomFolders.slice(0, 1) : bottomFolders;
    const folderList = document.getElementById("bottom-folders");
    folderList.innerHTML = visibleFolders.map(folder => folderChipMarkup(folder)).join("");
    bindFolderChipButtons(folderList);
    document.getElementById("tool-zone").innerHTML = tools.map((tool, index) => `<button class="tool-button" type="button" data-tool-index="${index}" title="${tool[1]}" aria-label="${tool[1]}"${tool[1] === "设置" ? ' aria-haspopup="dialog" aria-expanded="false" aria-controls="settings-popover"' : ""}><i data-lucide="${tool[0]}"></i></button>`).join("");
    document.querySelectorAll("[data-tool-index]").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      const tool = tools[Number(button.dataset.toolIndex)];
      notifyParent("tool-zone");
      setDockExpanded(false);
      if (tool[1] === "设置") {
        const willOpen = !settingsPopover.classList.contains("is-open");
        closeTransient();
        if (willOpen) openSettings(button);
      } else {
        closeTransient();
        showToast(`${tool[1]}是设计稿候选入口，正式能力仍待 M10 确认`);
      }
    }));
    refreshIcons();
    requestAnimationFrame(syncFolderCapacity);
  }

  const folderChildren = {
    "ui界面设计skill": ["组件案例"],
    "设计参考": ["竞品截图"]
  };

  function folderPanelAllItems() {
    return activeSites().flatMap(site => collectionItems(site)
      .filter(item => item.folder === activeFolderPanelName)
      .map(item => ({ ...item, site })));
  }

  function folderPanelSites(items = folderPanelAllItems()) {
    const ids = new Set(items.map(item => item.site.id));
    return sites.filter(site => ids.has(site.id));
  }

  function isChildFolderItem(item) {
    const suffix = Number(item.id.split("-").pop());
    return Number.isFinite(suffix) ? suffix % 2 === 0 : true;
  }

  function folderPanelScopeItems() {
    let items = folderPanelAllItems();
    if (activeFolderPanelSite !== "all") items = items.filter(item => item.site.id === activeFolderPanelSite);
    if (activeFolderPanelChild) items = items.filter(isChildFolderItem);
    return items;
  }

  function folderPanelBookmarks() {
    const items = folderPanelScopeItems().filter(item => activeFolderPanelTag === "全部" || item.tags.includes(activeFolderPanelTag));
    return sortBookmarkItems(items, activeFolderPanelSort);
  }

  function renderFolderCollection() {
    const allItems = folderPanelAllItems();
    const sourceSites = folderPanelSites(allItems);
    if (activeFolderPanelSite !== "all" && !sourceSites.some(site => site.id === activeFolderPanelSite)) activeFolderPanelSite = "all";
    folderCollectionPanel.classList.toggle("is-single-site", sourceSites.length <= 1);

    document.getElementById("folder-site-rail").innerHTML = sourceSites.length > 1 ? `
      <button class="folder-site-filter ${activeFolderPanelSite === "all" ? "is-active" : ""}" type="button" data-folder-site-filter="all" title="全部站点" aria-label="全部站点" aria-pressed="${activeFolderPanelSite === "all"}"><i data-lucide="layout-grid"></i></button>
      ${sourceSites.map(site => {
        const itemCount = allItems.filter(item => item.site.id === site.id).length;
        const label = `${site.name} · ${itemCount} 条`;
        return `<button class="folder-site-filter ${site.id === activeFolderPanelSite ? "is-active" : ""}" type="button" data-folder-site-filter="${site.id}" title="${escapeHTML(label)}" aria-label="${escapeHTML(label)}" aria-pressed="${site.id === activeFolderPanelSite}"><img src="${asset(site.icon)}" alt=""></button>`;
      }).join("")}` : "";

    const path = activeFolderPanelChild ? `
      <button class="folder-path-button" type="button" data-folder-root><i data-lucide="folder"></i><span>${escapeHTML(activeFolderPanelName)}</span></button>
      <i data-lucide="chevron-right"></i><strong>${escapeHTML(activeFolderPanelChild)}</strong>` : `
      <i data-lucide="folder"></i><strong>${escapeHTML(activeFolderPanelName)}</strong><span>${allItems.length} 条</span>`;
    document.getElementById("folder-path").innerHTML = path;

    const scopeItems = folderPanelScopeItems();
    const facetStats = bookmarkFacetStats(scopeItems);
    if (activeFolderPanelTag !== "全部" && !facetStats.some(item => item.tag === activeFolderPanelTag)) activeFolderPanelTag = "全部";
    document.getElementById("folder-facets").innerHTML = facetPanelMarkup({
      stats: facetStats,
      activeTag: activeFolderPanelTag,
      query: folderFacetQuery,
      total: scopeItems.length,
      dataName: "folder-facet",
      searchInputId: "folder-facet-search-input"
    });

    document.querySelectorAll("[data-folder-sort]").forEach(button => {
      const active = button.dataset.folderSort === activeFolderPanelSort;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const childRows = !activeFolderPanelChild ? (folderChildren[activeFolderPanelName] || []).map(child => `
      <button class="folder-child-row" type="button" data-folder-child="${escapeHTML(child)}"><i data-lucide="folder"></i><span>${escapeHTML(child)}</span><small>子收藏夹</small><i data-lucide="chevron-right"></i></button>`).join("") : "";
    const bookmarks = folderPanelBookmarks();
    document.getElementById("folder-bookmark-list").innerHTML = `${childRows}${bookmarks.map(item => bookmarkRowMarkup(item, item.site, "folder")).join("") || (!childRows ? '<div class="folder-panel-empty">当前筛选下没有内容</div>' : "")}`;

    document.querySelectorAll("[data-folder-site-filter]").forEach(button => button.addEventListener("click", () => {
      activeFolderPanelSite = button.dataset.folderSiteFilter;
      activeFolderPanelTag = "全部";
      folderFacetQuery = "";
      renderFolderCollection();
    }));
    document.querySelectorAll("[data-folder-facet]").forEach(button => button.addEventListener("click", () => {
      const requested = button.dataset.folderFacet;
      activeFolderPanelTag = requested === activeFolderPanelTag && requested !== "全部" ? "全部" : requested;
      if (activeFolderPanelTag !== "全部") tagUsage[activeFolderPanelTag] = Date.now();
      persistState();
      renderFolderCollection();
    }));
    const folderFacetSearch = document.getElementById("folder-facet-search-input");
    if (folderFacetSearch) folderFacetSearch.addEventListener("input", event => {
      const caret = event.target.selectionStart;
      folderFacetQuery = event.target.value;
      renderFolderCollection();
      const next = document.getElementById("folder-facet-search-input");
      if (next) { next.focus(); next.setSelectionRange(caret, caret); }
    });
    document.querySelector("[data-folder-root]")?.addEventListener("click", () => { activeFolderPanelChild = ""; activeFolderPanelTag = "全部"; folderFacetQuery = ""; renderFolderCollection(); });
    document.querySelectorAll("[data-folder-child]").forEach(button => button.addEventListener("click", () => { activeFolderPanelChild = button.dataset.folderChild; activeFolderPanelTag = "全部"; folderFacetQuery = ""; renderFolderCollection(); }));
    document.querySelectorAll("[data-folder-bookmark-open]").forEach(row => {
      const open = () => {
        const item = folderPanelBookmarks().find(bookmark => bookmark.id === row.dataset.folderBookmarkOpen);
        if (item) showToast(`在当前标签页打开“${item.title}”`);
      };
      row.addEventListener("click", event => { if (!event.target.closest("[data-folder-bookmark-menu]")) open(); });
      row.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") open(); });
      row.addEventListener("contextmenu", event => {
        event.preventDefault();
        const item = folderPanelBookmarks().find(bookmark => bookmark.id === row.dataset.folderBookmarkOpen);
        if (item) openBookmarkContextMenu(item, item.site, event.clientX, event.clientY, row);
      });
    });
    document.querySelectorAll("[data-folder-bookmark-menu]").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      const item = folderPanelBookmarks().find(bookmark => bookmark.id === button.dataset.folderBookmarkMenu);
      if (item) {
        const rect = button.getBoundingClientRect();
        openBookmarkContextMenu(item, item.site, rect.right + 4, rect.top, event.currentTarget);
      }
    }));
    document.querySelectorAll(".folder-chip").forEach(chip => {
      const active = chip.dataset.folderName === activeFolderPanelName;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-expanded", String(active && folderCollectionPanel.classList.contains("is-open")));
    });
    folderMoreButton.classList.toggle("is-folder-active", folderCollectionPanel.classList.contains("is-open") && overflowFolderNames.includes(activeFolderPanelName));
    refreshIcons();
  }

  function openFolderCollection(folderName = "未分类", trigger = null) {
    const returnTarget = trigger?.closest("#folder-overflow-panel") ? folderMoreButton : (trigger || (document.activeElement instanceof HTMLElement ? document.activeElement : null));
    lastFolderCollectionAnchorRect = trigger?.getBoundingClientRect() || lastFolderCollectionAnchorRect;
    closeTransient();
    folderCollectionReturnFocus = returnTarget;
    setDockExpanded(false);
    activeFolderPanelName = bottomFolders.some(folder => folder[0] === folderName) ? folderName : "未分类";
    activeFolderPanelSite = "all";
    activeFolderPanelTag = "全部";
    folderFacetQuery = "";
    activeFolderPanelChild = "";
    renderFolderCollection();
    folderCollectionPanel.classList.add("is-open");
    folderCollectionPanel.setAttribute("aria-hidden", "false");
    document.querySelectorAll(".folder-chip").forEach(chip => {
      const active = chip.dataset.folderName === activeFolderPanelName;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-expanded", String(active));
    });
    folderMoreButton.classList.toggle("is-folder-active", overflowFolderNames.includes(activeFolderPanelName));
    hideSurfaceTooltip();
    requestAnimationFrame(positionFolderCollection);
  }

  function positionFolderCollection() {
    if (!folderCollectionPanel.classList.contains("is-open")) return;
    const liveAnchor = Array.from(document.querySelectorAll(".folder-chip")).find(chip => chip.dataset.folderName === activeFolderPanelName && !chip.hidden && chip.getClientRects().length > 0);
    const anchor = liveAnchor ? liveAnchor.getBoundingClientRect() : lastFolderCollectionAnchorRect;
    if (!anchor) return;
    const width = folderCollectionPanel.offsetWidth;
    const height = folderCollectionPanel.offsetHeight;
    const center = anchor.left + anchor.width / 2;
    const left = Math.max(8, Math.min(center - width / 2, window.innerWidth - width - 8));
    const minTop = 48;
    const maxTop = window.innerHeight - height - 8;
    const canPlaceAbove = anchor.top - height - 10 >= minTop;
    const top = canPlaceAbove ? Math.min(maxTop, anchor.top - height - 10) : Math.max(minTop, Math.min(anchor.bottom + 10, maxTop));
    folderCollectionPanel.style.left = `${left}px`;
    folderCollectionPanel.style.top = `${top}px`;
    folderCollectionPanel.style.setProperty("--folder-collection-caret-x", `${Math.max(18, Math.min(center - left, width - 18))}px`);
    folderCollectionPanel.dataset.placement = canPlaceAbove ? "above" : "below";
  }

  const currentPopupTags = () => popupTagFixture || popupTags;
  const currentFolders = () => folderFixture || foldersData;

  function setRenderedUiState(state) {
    const value = state || "default";
    document.body.dataset.uiState = value;
    extensionPanel.dataset.uiState = value;
  }

  function resetPopupSurface() {
    extensionPanel.classList.remove("is-initial-error");
    popupSystemState.hidden = true;
    popupFeedback.hidden = true;
    folderFeedback.hidden = true;
    selectedOverflowPanel.hidden = true;
    selectedOverflow.setAttribute("aria-expanded", "false");
  }

  function showPopupFeedback(message) {
    popupFeedbackCopy.textContent = message;
    popupFeedback.hidden = false;
  }

  function showFolderFeedback(message) {
    folderFeedbackCopy.textContent = message;
    folderFeedback.hidden = false;
  }

  function openPopup({ createIfNeeded = true } = {}) {
    const returnTarget = document.activeElement instanceof HTMLElement ? document.activeElement : pluginEntry;
    if (createIfNeeded) bookmarkSaved = true;
    closeTransient();
    popupReturnFocus = returnTarget;
    setDockExpanded(false);
    resetPopupSurface();
    extensionPanel.classList.add("is-open");
    extensionPanel.setAttribute("aria-hidden", "false");
    extensionPanel.classList.remove("is-folder-mode");
    pluginEntry.classList.add("is-active");
    pluginEntry.setAttribute("aria-expanded", "true");
    document.getElementById("folder-value").textContent = activeFolder;
    persistState();
    renderPopupTags(document.getElementById("tag-search").value);
    renderSelectedTags();
    renderDock();
    if (collectionPanel.classList.contains("is-open") && activeCollectionSiteId === "zhihu") renderCollection();
    refreshIcons();
  }

  function tagEmptyMarkup(message) {
    return `<div class="popup-empty-state"><i data-lucide="tags"></i><span>${escapeHTML(message)}</span></div>`;
  }

  function applyTagMutation(tag) {
    if (selectedTags.has(tag)) selectedTags.delete(tag); else selectedTags.add(tag);
    activeFailureState = "";
    popupFeedback.hidden = true;
    persistState();
    renderPopupTags(document.getElementById("tag-search").value);
    renderSelectedTags();
    renderAll();
    setRenderedUiState(document.getElementById("tag-search").value ? (selectedTags.size > 1 ? "S04" : "S03") : (selectedTags.size ? "S05" : "S01"));
  }

  function renderPopupTags(query = "") {
    const source = currentPopupTags();
    const normalized = query.trim().toLowerCase();
    const filtered = source.filter(tag => !normalized || tag.toLowerCase().includes(normalized));
    const visible = normalized ? filtered : filtered.slice(0, 8);
    const exact = source.some(tag => tag.toLowerCase() === normalized);
    const highlight = tag => {
      if (!normalized) return escapeHTML(tag);
      const index = tag.toLowerCase().indexOf(normalized);
      if (index < 0) return escapeHTML(tag);
      return `${escapeHTML(tag.slice(0, index))}<span class="tag-match">${escapeHTML(tag.slice(index, index + query.trim().length))}</span>${escapeHTML(tag.slice(index + query.trim().length))}`;
    };
    document.getElementById("tag-composer").classList.toggle("is-searching", Boolean(normalized));
    const tagGrid = document.getElementById("tag-grid");
    if (!source.length && !normalized) {
      tagGrid.innerHTML = tagEmptyMarkup("暂无可选标签，输入关键词新增标签");
    } else if (!visible.length) {
      tagGrid.innerHTML = tagEmptyMarkup("没有找到相关标签");
    } else {
      tagGrid.innerHTML = visible.map((tag, index) => {
        const selected = selectedTags.has(tag);
        const icon = selected ? "circle-check" : (normalized ? "tag" : "clock-3");
        return `<button class="tag-option ${selected ? "is-selected" : ""}" type="button" data-popup-tag="${escapeHTML(tag)}" data-action="toggle-tag" aria-pressed="${selected}"><i data-lucide="${icon}"></i><span class="tag-label" data-field="name" title="${escapeHTML(tag)}">${highlight(tag)}</span><span class="tag-count" data-field="usageCount">(${4 + index % 5})</span></button>`;
      }).join("");
    }
    document.querySelectorAll("[data-popup-tag]").forEach(button => button.addEventListener("click", () => applyTagMutation(button.dataset.popupTag)));
    const createTag = document.getElementById("create-tag");
    createTag.classList.toggle("is-show", Boolean(normalized) && !exact);
    createTag.querySelector("span").textContent = normalized ? `新增标签“${query.trim()}”` : "";
    refreshIcons();
  }

  function removeSelectedTag(tag) {
    selectedTags.delete(tag);
    activeFailureState = "";
    popupFeedback.hidden = true;
    persistState();
    renderSelectedTags();
    renderPopupTags(document.getElementById("tag-search").value);
    renderAll();
  }

  function setSelectedOverflowOpen(open) {
    selectedOverflowPanel.hidden = !open;
    selectedOverflow.setAttribute("aria-expanded", String(open));
    if (open) selectedOverflowPanel.querySelector("button")?.focus();
  }

  function renderSelectedTags() {
    const selectedArea = document.getElementById("selected-area");
    const selected = Array.from(selectedTags);
    const visibleLimit = selected.some(tag => tag.length > 18) ? 3 : 6;
    const visible = selected.slice(0, visibleLimit);
    const hidden = selected.slice(visibleLimit);
    selectedArea.classList.toggle("has-tags", selected.length > 0);
    document.getElementById("selected-tags").innerHTML = visible.map(tag => `<span class="tag-pill" data-field="tag"><i data-lucide="tag"></i><span title="${escapeHTML(tag)}">${escapeHTML(tag)}</span><button type="button" data-remove-tag="${escapeHTML(tag)}" data-action="remove-tag" aria-label="移除${escapeHTML(tag)}"><i data-lucide="x"></i></button></span>`).join("");
    selectedOverflow.hidden = hidden.length === 0;
    selectedOverflow.querySelector("span").textContent = `+${hidden.length}`;
    selectedOverflowPanel.innerHTML = hidden.map(tag => `<div class="overflow-tag-row"><span title="${escapeHTML(tag)}">${escapeHTML(tag)}</span><button type="button" data-remove-overflow-tag="${escapeHTML(tag)}" aria-label="移除${escapeHTML(tag)}"><i data-lucide="x"></i></button></div>`).join("");
    if (!hidden.length) setSelectedOverflowOpen(false);
    document.querySelectorAll("[data-remove-tag]").forEach(button => button.addEventListener("click", () => removeSelectedTag(button.dataset.removeTag)));
    document.querySelectorAll("[data-remove-overflow-tag]").forEach(button => button.addEventListener("click", () => removeSelectedTag(button.dataset.removeOverflowTag)));
    refreshIcons();
  }

  function folderRowMarkup(folder, action = "select", { depth = 0, hasChildren = false } = {}) {
    const [name, count = 0, path = ""] = folder;
    const selected = folderPickerSelection === name;
    const pathClass = path ? "has-path" : "";
    const dataAttribute = action === "create" ? `data-create-folder="${escapeHTML(name)}"` : `data-folder="${escapeHTML(name)}"`;
    const icon = action === "create" ? "folder-plus" : (selected ? "folder-check" : "folder");
    const copy = path ? `<span class="folder-row-copy"><strong>${escapeHTML(name)}</strong><small title="${escapeHTML(path)}">${escapeHTML(path)}</small></span>` : `<span class="folder-row-copy"><strong>${action === "create" ? `新建“${escapeHTML(name)}”` : escapeHTML(name)}</strong></span>`;
    const disclosure = hasChildren
      ? `<button class="folder-disclosure" type="button" data-toggle-folder-tree="${escapeHTML(name)}" aria-label="${expandedFolderNodes.has(name) ? "收起" : "展开"}${escapeHTML(name)}" aria-expanded="${expandedFolderNodes.has(name)}"><i data-lucide="chevron-right"></i></button>`
      : '<span class="folder-disclosure-spacer" aria-hidden="true"></span>';
    return `<div class="folder-tree-item" data-depth="${depth}">${disclosure}<button class="folder-row ${selected ? "is-active" : ""} ${pathClass}" type="button" ${dataAttribute} data-action="${action === "create" ? "create-folder" : "select-folder"}" aria-current="${selected ? "true" : "false"}" aria-level="${depth + 1}"><i data-lucide="${icon}"></i>${copy}<span class="count">${action === "create" ? "" : count}</span></button></div>`;
  }

  function finishFolderSelection(folderName) {
    folderPickerSelection = folderName;
    folderFeedback.hidden = true;
    activeFailureState = "";
    if (editingBookmarkId) {
      bookmarkFolders[editingBookmarkId] = folderName;
      editingBookmarkId = null;
      extensionPanel.classList.remove("is-open", "is-folder-mode");
      extensionPanel.setAttribute("aria-hidden", "true");
      pluginEntry.classList.remove("is-active");
      pluginEntry.setAttribute("aria-expanded", "false");
      document.getElementById("open-folder-picker").setAttribute("aria-expanded", "false");
      persistState();
      renderAll();
      openCollection(activeCollectionSiteId, lastCollectionAnchorRect, lastContextTrigger);
      showToast(`已移动到“${folderName}”`);
      return;
    }
    activeFolder = folderName;
    document.getElementById("folder-value").textContent = activeFolder;
    extensionPanel.classList.remove("is-folder-mode");
    document.getElementById("open-folder-picker").setAttribute("aria-expanded", "false");
    persistState();
    renderAll();
    renderSelectedTags();
    renderPopupTags();
    setRenderedUiState(selectedTags.size ? "S05" : "S01");
    requestAnimationFrame(() => document.getElementById("open-folder-picker")?.focus({ preventScroll: true }));
    showToast("收藏夹已即时保存");
  }

  function commitFolderSelection(folderName, { force = false } = {}) {
    pendingFolderName = folderName;
    if (!force && activeFailureState === "F08") {
      showFolderFeedback("保存失败，请重试");
      return;
    }
    finishFolderSelection(folderName);
  }

  function commitCreatedFolder(folderName, { force = false } = {}) {
    pendingFolderName = folderName;
    if (!force && activeFailureState === "F07") {
      showFolderFeedback("保存失败，请重试");
      return;
    }
    const target = folderFixture || foldersData;
    if (!target.some(folder => folder[0].toLowerCase() === folderName.toLowerCase())) target.unshift([folderName, 0]);
    finishFolderSelection(folderName);
  }

  function renderFolders(query = "") {
    const normalized = query.trim().toLowerCase();
    const source = currentFolders();
    const systemSource = [["未分类", 1]];
    const system = systemSource.filter(folder => !normalized || folder[0].toLowerCase().includes(normalized));
    const filtered = source.filter(folder => !normalized || `${folder[0]} ${folder[2] || ""} ${folder[3] || ""}`.toLowerCase().includes(normalized));
    const exact = [...systemSource, ...source].some(folder => folder[0].toLowerCase() === normalized);
    document.getElementById("system-folders").innerHTML = system.map(folder => folderRowMarkup(folder)).join("");
    const listParts = [];
    if (!normalized && !source.length) listParts.push('<div class="folder-empty-state"><i data-lucide="folder-open"></i><span>暂无自建收藏夹</span></div>');
    if (normalized && !system.length && !filtered.length) listParts.push('<div class="folder-empty-state"><i data-lucide="search-x"></i><span>没有找到相关收藏夹</span></div>');
    if (normalized) {
      listParts.push(...filtered.map(folder => folderRowMarkup(folder, "select", { depth: folder[3] ? 1 : 0 })));
    } else {
      const roots = filtered.filter(folder => !folder[3]);
      roots.forEach(folder => {
        const children = filtered.filter(candidate => candidate[3] === folder[0]);
        listParts.push(folderRowMarkup(folder, "select", { hasChildren: children.length > 0 }));
        if (children.length && expandedFolderNodes.has(folder[0])) {
          listParts.push(...children.map(child => folderRowMarkup(child, "select", { depth: 1 })));
        }
      });
    }
    if (normalized && !exact) listParts.push(folderRowMarkup([query.trim(), 0], "create"));
    document.getElementById("folder-list").innerHTML = listParts.join("");
    document.getElementById("folder-section-title").hidden = Boolean(normalized && !filtered.length && exact);
    document.querySelectorAll("[data-folder]").forEach(button => button.addEventListener("click", () => commitFolderSelection(button.dataset.folder)));
    document.querySelectorAll("[data-toggle-folder-tree]").forEach(button => button.addEventListener("click", () => {
      const folderName = button.dataset.toggleFolderTree;
      if (expandedFolderNodes.has(folderName)) expandedFolderNodes.delete(folderName); else expandedFolderNodes.add(folderName);
      renderFolders(document.getElementById("folder-search").value);
      requestAnimationFrame(() => document.querySelector(`[data-toggle-folder-tree="${CSS.escape(folderName)}"]`)?.focus({ preventScroll: true }));
    }));
    document.querySelectorAll("[data-create-folder]").forEach(button => button.addEventListener("click", () => commitCreatedFolder(button.dataset.createFolder)));
    refreshIcons();
  }

  function closeFolderPicker() {
    folderFeedback.hidden = true;
    activeFailureState = "";
    if (editingBookmarkId) {
      editingBookmarkId = null;
      extensionPanel.classList.remove("is-open", "is-folder-mode");
      extensionPanel.setAttribute("aria-hidden", "true");
      pluginEntry.classList.remove("is-active");
      pluginEntry.setAttribute("aria-expanded", "false");
      document.getElementById("open-folder-picker").setAttribute("aria-expanded", "false");
      openCollection(activeCollectionSiteId, lastCollectionAnchorRect, lastContextTrigger);
    } else {
      extensionPanel.classList.remove("is-folder-mode");
      document.getElementById("open-folder-picker").setAttribute("aria-expanded", "false");
      setRenderedUiState(selectedTags.size ? "S05" : "S01");
      requestAnimationFrame(() => document.getElementById("open-folder-picker")?.focus({ preventScroll: true }));
    }
  }

  function openFolderPicker(bookmarkId = null) {
    editingBookmarkId = bookmarkId;
    if (bookmarkId) {
      const site = byId(activeCollectionSiteId);
      const item = collectionItems(site).find(candidate => candidate.id === bookmarkId);
      folderPickerSelection = bookmarkFolders[bookmarkId] || item?.folder || "未分类";
    } else folderPickerSelection = activeFolder;
    folderFeedback.hidden = true;
    closeCollection({ restoreFocus: false });
    extensionPanel.classList.add("is-open", "is-folder-mode");
    extensionPanel.setAttribute("aria-hidden", "false");
    pluginEntry.classList.add("is-active");
    pluginEntry.setAttribute("aria-expanded", "true");
    document.getElementById("open-folder-picker").setAttribute("aria-expanded", "true");
    document.getElementById("folder-search").value = "";
    renderFolders();
    requestAnimationFrame(() => document.getElementById("folder-search")?.focus({ preventScroll: true }));
  }

  function showInitialSaveError() {
    bookmarkSaved = false;
    extensionPanel.classList.add("is-initial-error");
    popupSystemState.hidden = false;
    popupFeedback.hidden = true;
    setRenderedUiState("S10");
    refreshIcons();
  }

  function applyPopupFixture(requestedState) {
    const state = popupStateIds.has(requestedState) ? requestedState : "S01";
    const renderedState = state;
    const tagSearch = document.getElementById("tag-search");
    const folderSearch = document.getElementById("folder-search");
    popupTagFixture = null;
    folderFixture = null;
    activeFailureState = "";
    pendingFolderName = "";
    lastFailedTag = "";
    selectedTags = new Set();
    activeFolder = "未分类";
    folderPickerSelection = activeFolder;
    bookmarkSaved = state !== "S10";
    tagSearch.value = "";
    folderSearch.value = "";

    let tagQuery = "";
    let folderQuery = "";
    switch (state) {
      case "S02": tagQuery = "设计"; break;
      case "S03": selectedTags = new Set(["平面设计"]); tagQuery = "设计"; break;
      case "S04": selectedTags = new Set(["平面设计", "封面设计", "设计审美提升"]); tagQuery = "设计"; break;
      case "S05": selectedTags = new Set(["平面设计", "封面设计"]); break;
      case "S06": tagQuery = "平面设计"; break;
      case "S07": tagQuery = "资料研究方法"; break;
      case "S08": popupTagFixture = []; break;
      case "S09":
        popupTagFixture = [
          "跨设备浏览器工作区信息架构研究", "中文桌面效率工具响应式排版", "插件保存失败恢复与重试策略", "设计系统组件映射与验收",
          "200% 文本缩放", "键盘无障碍", "长名称与溢出处理", "Reduced Motion"
        ];
        selectedTags = new Set(popupTagFixture);
        break;
      case "S11": tagQuery = "新的研究标签"; lastFailedTag = tagQuery; activeFailureState = "S11"; break;
      case "S12": selectedTags = new Set(["平面设计"]); tagQuery = "设计"; lastFailedTag = "封面设计"; activeFailureState = "S12"; break;
      case "F02": folderQuery = "风"; break;
      case "F03": folderQuery = "F 风格"; break;
      case "F04": folderQuery = "新项目资料"; break;
      case "F05": folderFixture = []; break;
      case "F06":
        folderFixture = [["同名素材", 3, "项目 / 2026 / 品牌视觉重构 / 第一阶段 / 竞品与参考资料"]];
        activeFolder = "同名素材";
        folderPickerSelection = activeFolder;
        break;
      case "F07": folderQuery = "新项目资料"; pendingFolderName = folderQuery; activeFailureState = "F07"; break;
      case "F08": activeFolder = "J 建筑-房子"; folderPickerSelection = activeFolder; pendingFolderName = "F 风格"; activeFailureState = "F08"; break;
      default: break;
    }

    tagSearch.value = tagQuery;
    openPopup({ createIfNeeded: false });

    if (state === "S10") {
      showInitialSaveError();
    } else if (state.startsWith("F")) {
      openFolderPicker();
      folderSearch.value = folderQuery;
      renderFolders(folderQuery);
      if (state === "F07" || state === "F08") showFolderFeedback("保存失败，请重试");
    } else {
      renderPopupTags(tagQuery);
      renderSelectedTags();
      if (state === "S11" || state === "S12") showPopupFeedback("保存失败，请重试");
    }

    setRenderedUiState(renderedState);
    const focusTarget = params.get("focus");
    if (focusTarget) {
      const targets = {
        "tag-search": tagSearch,
        "folder-search": folderSearch,
        cancel: document.getElementById("cancel-bookmark"),
        done: document.getElementById("done-popup"),
        "first-option": extensionPanel.querySelector(".tag-option, .folder-row")
      };
      const applyFixtureFocus = () => targets[focusTarget]?.focus({ preventScroll: true });
      requestAnimationFrame(applyFixtureFocus);
      window.addEventListener("load", () => requestAnimationFrame(applyFixtureFocus), { once: true });
    }
  }

  function renderAll() {
    renderDock();
    renderBottom();
    renderSettings();
    updateSearchControls();
    renderSearchEngineMenu();
    if (searchMenu.classList.contains("is-open")) renderSearchMenu();
    if (collectionPanel.classList.contains("is-open")) {
      renderCollection();
      requestAnimationFrame(positionCollection);
    }
    if (folderCollectionPanel.classList.contains("is-open")) {
      renderFolderCollection();
      requestAnimationFrame(positionFolderCollection);
    }
    refreshIcons();
  }

  function clearPrototypeFocus() {
    document.querySelectorAll(".prototype-focus, .prototype-element-focus").forEach(element => element.classList.remove("prototype-focus", "prototype-element-focus"));
  }

  function applyDiscussionState(module, element = "") {
    clearPrototypeFocus();
    closeTransient();
    closeDialog();
    setDockExpanded(false);
    if (module === "save-panel") {
      openPopup({ createIfNeeded: false });
      extensionPanel.classList.add("prototype-focus");
    } else if (["collection-panel", "tag-filter", "context-menu"].includes(module)) {
      const first = visibleSites()[0];
      const anchor = document.querySelector(`[data-dock-site="${first.id}"]`);
      openCollection(first.id, anchor?.getBoundingClientRect());
      collectionPanel.classList.add("prototype-focus");
      if (module === "tag-filter") document.getElementById("facet-panel").classList.add("prototype-focus");
      if (module === "context-menu") requestAnimationFrame(() => {
        const more = document.querySelector("[data-item-menu]");
        if (more) more.click();
        contextMenu.classList.add("prototype-focus");
      });
    } else if (module === "search-box") {
      mainSearch.value = "设计";
      openSearchInterface();
      document.getElementById("search-form").classList.add("prototype-focus");
    } else if (module === "domain-dock") {
      document.getElementById("default-dock").classList.add("prototype-focus");
    } else if (module === "browser-shell") {
      document.getElementById("browser-chrome").classList.add("prototype-focus");
    } else if (module === "wallpaper") {
      document.getElementById("wallpaper").classList.add("prototype-focus");
    } else if (module === "category-bar") {
      openFolderCollection("未分类");
      folderCollectionPanel.classList.add("prototype-focus");
    } else if (module === "tool-zone") {
      openSettings(null, { focus: false });
      settingsPopover.classList.add("prototype-focus");
      document.getElementById("tool-zone").classList.add("prototype-focus");
    }
    if (element) {
      const target = document.querySelector(`[data-element="${element}"]`);
      if (target) target.classList.add("prototype-element-focus");
    }
  }

  function createTagFromInput() {
    const input = document.getElementById("tag-search");
    const value = input.value.trim();
    if (!value) return;
    const source = currentPopupTags();
    const existing = source.find(tag => tag.toLowerCase() === value.toLowerCase());
    const tag = existing || value;
    if (!existing) {
      if (popupTagFixture) popupTagFixture.unshift(tag); else popupTags.unshift(tag);
    }
    selectedTags.add(tag);
    activeFailureState = "";
    popupFeedback.hidden = true;
    input.value = "";
    persistState();
    renderPopupTags();
    renderSelectedTags();
    renderAll();
    setRenderedUiState("S05");
    showToast("新标签已创建并即时保存");
  }

  function focusRelativeOption(current, direction) {
    const options = Array.from(extensionPanel.querySelectorAll(".tag-option:not([disabled]), .create-tag.is-show:not([disabled]), .folder-row:not([disabled])"));
    if (!options.length) return;
    const index = Math.max(0, options.indexOf(current));
    options[(index + direction + options.length) % options.length].focus();
  }

  function handlePopupEscape(event) {
    if (selectedOverflow.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      event.stopPropagation();
      setSelectedOverflowOpen(false);
      selectedOverflow.focus();
      return true;
    }
    if (extensionPanel.classList.contains("is-folder-mode")) {
      event.preventDefault();
      event.stopPropagation();
      closeFolderPicker();
      return true;
    }
    return false;
  }

  function cancelBookmarkImmediately() {
    bookmarkSaved = false;
    selectedTags.clear();
    activeFolder = "未分类";
    activeFailureState = "";
    persistState();
    closePopup();
    renderAll();
    showToast("Bookmark 已删除，Dock 数量已更新");
  }

  pluginEntry.addEventListener("click", () => { openPopup(); notifyParent("save-panel"); });
  document.getElementById("browser-chrome").addEventListener("click", event => { if (!event.target.closest("#plugin-entry")) notifyParent("browser-shell"); });
  document.getElementById("wallpaper").addEventListener("click", () => notifyParent("wallpaper"));
  document.getElementById("done-popup").addEventListener("click", () => { closePopup(); notifyParent("save-panel", "done"); });
  document.getElementById("open-side-panel").addEventListener("click", openSidePanelPreview);
  document.getElementById("cancel-bookmark").addEventListener("click", () => { cancelBookmarkImmediately(); notifyParent("save-panel", "cancel"); });
  document.getElementById("open-folder-picker").addEventListener("click", () => { openFolderPicker(); notifyParent("save-panel", "folder"); });
  document.getElementById("back-popup").addEventListener("click", closeFolderPicker);
  document.getElementById("folder-search").addEventListener("input", event => {
    folderFeedback.hidden = true;
    if (activeFailureState === "F07" || activeFailureState === "F08") activeFailureState = "";
    renderFolders(event.target.value);
  });
  document.getElementById("tag-search").addEventListener("input", event => {
    popupFeedback.hidden = true;
    if (activeFailureState === "S11" || activeFailureState === "S12") activeFailureState = "";
    renderPopupTags(event.target.value);
  });
  document.getElementById("create-tag").addEventListener("click", createTagFromInput);
  document.getElementById("retry-save").addEventListener("click", () => {
    bookmarkSaved = true;
    openPopup({ createIfNeeded: false });
    setRenderedUiState("S01");
  });
  document.getElementById("close-save-error").addEventListener("click", closePopup);
  document.getElementById("popup-feedback-retry").addEventListener("click", () => {
    if (activeFailureState === "S11") createTagFromInput();
    else if (activeFailureState === "S12" && lastFailedTag) applyTagMutation(lastFailedTag);
  });
  document.getElementById("folder-feedback-retry").addEventListener("click", () => {
    if (activeFailureState === "F07" && pendingFolderName) commitCreatedFolder(pendingFolderName, { force: true });
    else if (activeFailureState === "F08" && pendingFolderName) commitFolderSelection(pendingFolderName, { force: true });
  });
  selectedOverflow.addEventListener("click", () => setSelectedOverflowOpen(selectedOverflow.getAttribute("aria-expanded") !== "true"));
  selectedOverflowPanel.addEventListener("click", event => event.stopPropagation());

  document.getElementById("tag-search").addEventListener("keydown", event => {
    if (event.key === "ArrowDown") { event.preventDefault(); extensionPanel.querySelector(".create-tag.is-show, .tag-option")?.focus(); }
    if (event.key === "Escape" && !handlePopupEscape(event)) {
      if (event.currentTarget.value) { event.preventDefault(); event.stopPropagation(); event.currentTarget.value = ""; renderPopupTags(); }
      else {
        event.preventDefault();
        event.stopPropagation();
        closePopup();
      }
    }
  });
  document.getElementById("folder-search").addEventListener("keydown", event => {
    if (event.key === "ArrowDown") { event.preventDefault(); extensionPanel.querySelector(".folder-row")?.focus(); }
    if (event.key === "Escape") handlePopupEscape(event);
  });
  extensionPanel.addEventListener("keydown", event => {
    const option = event.target.closest(".tag-option, .create-tag, .folder-row");
    if (option && event.key === "ArrowDown") { event.preventDefault(); focusRelativeOption(option, 1); }
    if (option && event.key === "ArrowUp") { event.preventDefault(); focusRelativeOption(option, -1); }
    if (event.key === "Escape") {
      if (!handlePopupEscape(event)) {
        event.preventDefault();
        event.stopPropagation();
        closePopup();
      }
      return;
    }
    trapFocus(event, extensionPanel);
  });

  document.getElementById("expand-dock").addEventListener("click", () => { closeTransient(); setDockExpanded(true); notifyParent("domain-dock"); });
  folderMoreButton.addEventListener("click", event => { event.stopPropagation(); openFolderOverflow(); notifyParent("category-bar"); });
  document.getElementById("collapse-dock").addEventListener("click", () => setDockExpanded(false));
  document.getElementById("close-collection").addEventListener("click", () => closeCollection());
  document.getElementById("close-folder-collection").addEventListener("click", () => closeFolderCollection());
  document.querySelectorAll("[data-collection-sort]").forEach(button => button.addEventListener("click", () => { activeCollectionSort = button.dataset.collectionSort; renderCollection(); }));
  document.querySelectorAll("[data-folder-sort]").forEach(button => button.addEventListener("click", () => { activeFolderPanelSort = button.dataset.folderSort; renderFolderCollection(); }));
  document.getElementById("search-form").addEventListener("click", event => {
    if (event.target.closest("button")) return;
    openSearchInterface();
  });
  document.getElementById("search-form").addEventListener("submit", event => { event.preventDefault(); submitSearch(); });
  mainSearch.addEventListener("focus", openSearchInterface);
  mainSearch.addEventListener("input", renderSearchMenu);
  mainSearch.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") { event.preventDefault(); setSearchActiveIndex(searchActiveIndex + 1); }
    if (event.key === "ArrowUp") { event.preventDefault(); setSearchActiveIndex(searchActiveIndex - 1); }
    if (event.key === "Escape") { searchMenu.classList.remove("is-open"); mainSearch.blur(); }
  });
  searchEngineButton.addEventListener("click", event => {
    event.stopPropagation();
    const willOpen = !searchEngineMenu.classList.contains("is-open");
    searchEngineMenu.classList.toggle("is-open", willOpen);
    searchEngineButton.setAttribute("aria-expanded", String(willOpen));
    if (willOpen) {
      renderSearchEngineMenu();
      requestAnimationFrame(() => searchEngineMenu.querySelector('[aria-checked="true"], [role="menuitemradio"]')?.focus({ preventScroll: true }));
    }
  });
  document.querySelectorAll("[data-search-action]").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    const action = button.dataset.searchAction;
    if (action === "scope") {
      searchScope = searchScope === "all" ? "saved" : "all";
      persistState();
      updateSearchControls();
      openSearchInterface();
    }
    if (action === "add") showToast("添加文件与 AI 读取保留为后续能力");
    if (action === "voice") showToast("语音输入将沿用浏览器能力，当前 Demo 不采集麦克风");
  }));
  toastAction.addEventListener("click", () => { const callback = toastCallback; toastCallback = null; toast.classList.remove("is-show"); if (callback) callback(); });
  confirmBackdrop.addEventListener("click", event => {
    event.stopPropagation();
    if (event.target === confirmBackdrop) closeDialog();
  });
  confirmBackdrop.addEventListener("keydown", event => {
    if (confirmBackdrop.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeDialog();
      return;
    }
    trapFocus(event, confirmBackdrop);
  });
  settingsPopover.addEventListener("click", event => {
    event.stopPropagation();
    const sizeButton = event.target.closest("[data-dock-size]");
    if (sizeButton) {
      dockSize = sizeButton.dataset.dockSize;
      persistState();
      renderAll();
      requestAnimationFrame(() => settingsPopover.querySelector(`[data-dock-size="${dockSize}"]`)?.focus({ preventScroll: true }));
      return;
    }
    const folderSizeButton = event.target.closest("[data-folder-size]");
    if (folderSizeButton) {
      folderSize = folderSizeButton.dataset.folderSize;
      persistState();
      renderAll();
      requestAnimationFrame(() => settingsPopover.querySelector(`[data-folder-size="${folderSize}"]`)?.focus({ preventScroll: true }));
      return;
    }
    if (event.target.closest("[data-title-switch]")) {
      showDockTitles = !showDockTitles;
      persistState();
      renderAll();
      requestAnimationFrame(() => settingsPopover.querySelector("[data-title-switch]")?.focus({ preventScroll: true }));
    }
  });
  settingsPopover.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.closest("[data-dock-size], [data-folder-size], [data-title-switch]")) {
      event.preventDefault();
      event.target.closest("[data-dock-size], [data-folder-size], [data-title-switch]").click();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeSettings();
      return;
    }
    trapFocus(event, settingsPopover);
  });
  collectionPanel.addEventListener("click", event => event.stopPropagation());
  folderCollectionPanel.addEventListener("click", event => event.stopPropagation());
  folderOverflowPanel.addEventListener("click", event => event.stopPropagation());
  folderOverflowPanel.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeFolderOverflow({ restoreFocus: true });
      return;
    }
    trapFocus(event, folderOverflowPanel);
  });
  contextMenu.addEventListener("click", event => event.stopPropagation());
  contextMenu.addEventListener("keydown", event => handleMenuNavigation(event, contextMenu, lastContextTrigger, () => closeContextMenu()));
  searchEngineMenu.addEventListener("keydown", event => handleMenuNavigation(event, searchEngineMenu, searchEngineButton, () => {
    searchEngineMenu.classList.remove("is-open");
    searchEngineButton.setAttribute("aria-expanded", "false");
  }));
  toast.addEventListener("click", event => event.stopPropagation());

  document.addEventListener("click", event => {
    if (!event.target.closest("#folder-overflow-panel") && !event.target.closest("#folder-more-button")) closeFolderOverflow({ restoreFocus: false });
    if (!event.target.closest("#selected-area")) setSelectedOverflowOpen(false);
    if (!event.target.closest("#context-menu") && !event.target.closest("[data-item-menu]") && !event.target.closest("[data-site-menu]")) closeContextMenu();
    if (!event.target.closest("#search-form") && !event.target.closest("#search-menu")) searchMenu.classList.remove("is-open");
    if (!event.target.closest("#search-engine-button") && !event.target.closest("#search-engine-menu")) {
      searchEngineMenu.classList.remove("is-open");
      searchEngineButton.setAttribute("aria-expanded", "false");
    }
    if (!event.target.closest("#settings-popover") && !event.target.closest("[data-tool-index]")) closeSettings({ restoreFocus: false });
    if (collectionPanel.classList.contains("is-open") && !event.target.closest("#collection-panel") && !event.target.closest("[data-dock-site]") && !event.target.closest("[data-expanded-site]") && !event.target.closest("#context-menu") && !event.target.closest("#confirm-backdrop")) closeCollection({ restoreFocus: false });
    if (folderCollectionPanel.classList.contains("is-open") && !event.target.closest("#folder-collection-panel") && !event.target.closest(".folder-chip") && !event.target.closest("#context-menu") && !event.target.closest("#confirm-backdrop")) closeFolderCollection({ restoreFocus: false });
  });
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (!confirmBackdrop.hidden) return;
    if (contextMenu.classList.contains("is-open")) {
      event.preventDefault();
      closeContextMenu({ restoreFocus: true });
      return;
    }
    if (!folderOverflowPanel.hidden) {
      event.preventDefault();
      closeFolderOverflow({ restoreFocus: true });
      return;
    }
    if (settingsPopover.classList.contains("is-open")) {
      event.preventDefault();
      closeSettings();
      return;
    }
    if (folderCollectionPanel.classList.contains("is-open")) {
      event.preventDefault();
      closeFolderCollection();
      return;
    }
    if (collectionPanel.classList.contains("is-open")) {
      event.preventDefault();
      closeCollection();
      return;
    }
    if (extensionPanel.classList.contains("is-open")) {
      event.preventDefault();
      closePopup();
      return;
    }
    if (!sidePanelPreview.hidden) {
      event.preventDefault();
      closeSidePanelPreview();
      return;
    }
    if (searchEngineMenu.classList.contains("is-open")) {
      event.preventDefault();
      searchEngineMenu.classList.remove("is-open");
      searchEngineButton.setAttribute("aria-expanded", "false");
      searchEngineButton.focus({ preventScroll: true });
      return;
    }
    searchMenu.classList.remove("is-open");
    setDockExpanded(false);
  });
  window.addEventListener("resize", () => { hideSurfaceTooltip(); syncDockCapacity(); syncFolderCapacity(); positionFolderOverflow(); positionCollection(); positionFolderCollection(); });
  window.addEventListener("scroll", hideSurfaceTooltip, true);
  window.addEventListener("storage", event => {
    if (event.key === stateKey) document.body.dataset.externalStatePending = "true";
  });
  window.addEventListener("message", event => {
    if (event.origin !== location.origin) return;
    if (event.data?.type === "zero-prototype-set-module") applyDiscussionState(event.data.module || "", event.data.element || "");
    if (event.data?.type === "zero-close-side-panel") closeSidePanelPreview();
  });

  popupSiteIcon.addEventListener("error", () => {
    const fallback = "assets/figma/tabbar/ai-assistant.svg";
    if (!popupSiteIcon.src.endsWith(fallback)) popupSiteIcon.src = fallback;
  });
  if (params.get("favicon") === "missing") requestAnimationFrame(() => popupSiteIcon.dispatchEvent(new Event("error")));

  renderAll();
  if (fixtureState || popupHostMode) applyPopupFixture(fixtureState || "S01");
  else {
    renderPopupTags();
    renderSelectedTags();
    setRenderedUiState("default");
  }
  const dockResizeObserver = new ResizeObserver(syncDockCapacity);
  dockResizeObserver.observe(document.getElementById("dock-row"));
  const folderResizeObserver = new ResizeObserver(syncFolderCapacity);
  folderResizeObserver.observe(document.getElementById("folder-header"));
  folderResizeObserver.observe(document.getElementById("bottom-folders"));
  if (initialModule && !fixtureMode) requestAnimationFrame(() => applyDiscussionState(initialModule, initialElement));
  else if (requestedFolderOverflow && !fixtureMode) requestAnimationFrame(openFolderOverflow);
  window.__zeroPopupQa = { stateIds: Array.from(popupStateIds), fixtureState, popupHostMode };
})();

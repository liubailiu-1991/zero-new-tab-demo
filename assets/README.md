# 原型资产

## latest-cloud-field-wallpaper.jpg

用途：从最新用户默认态原型中提取的云野壁纸裁切，用于 V4 工作台中央结构原型，使其与当前高保真方向保持一致。

来源：`source/user-prototypes/latest-2026-07-31/01-new-tab-default.png`。

## new-tab-mountain-lake.jpg

用途：历史低保真 Demo 的中性自然场景壁纸，只用于增强场景真实感，不代表 ZERO 最终壁纸或品牌视觉。

来源：Unsplash 图片服务。

原始地址：https://images.unsplash.com/photo-1501785888041-af3ef285b470

## lucide.min.js

用途：V4 工作台和原型的本地图标运行文件，确保静态 HTML 离线打开时仍能显示 Lucide 图标。

来源：https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js

## figma/tabbar

用途：Figma `Duck Newtab Desktop` 节点 `875:39042` 中没有准确 Lucide 对应的顶部壳专用图形，包括 360 Favicon 的三个矢量片段、AI 工具入口和标签页管理图标。

来源：Figma MCP 资产导出后本地化。运行时只引用本地 SVG，不依赖会过期的 Figma 在线地址。后退、前进、刷新、收藏、关闭、新建、扩展、历史和窗口控制继续使用本地 Lucide。

## figma/site 补充品牌资产

用途：补齐 Figma `875:39069` 宽屏站点 Dock 中缺失的喜马拉雅、协作空间、Premiere、游戏资料、开发工具、视觉工具和创作工具 Logo。

来源：用户提供并归档的 `source/user-prototypes/figma-bottom-2026-07-31/03-bottom-dock-annotated.png`。该截图是节点视觉参考；补充资产按截图中的 `56px` 品牌图形单独裁切、本地化和透明圆角处理，不使用整张截图作为页面底图。

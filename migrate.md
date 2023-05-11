# element-plus to element-ultra 迁移指南


- global.d.ts文件的导入需要改成对应的element-ultra包名
- packages/element-pro包名改成element-ultra, package.json文件中的name字段改成"element-ultra"
- docs文件夹下的package.json文件中的dependencies字段中的element-pro改成element-ultra
- docs文件夹下的vite.config.ts文件中的所有element-plus改成element-ultra
- docs/.vitepress/theme/index.ts文件, 导入相关的包含plus的改成ultra
- scripts/gen-version.ts文件夹下的所有element-plus改成element-ultra
- 替换docs下所有.vue文件中的from 'element-plus' 为 from 'element-ultra'
- docs下的所有md文件中的element-plus改成element-ultra
- build/utils/path.ts中的element-plus改成element-ultra
- build/utils/shared.ts中的EP_PKG

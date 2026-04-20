// 假如你使用的框架/工具不支持 postcss.config.js 配置文件，则可以使用内联的写法
module.exports = {
  plugins: {
    tailwindcss: {},
    // 假如框架已经内置了 `autoprefixer`，可以去除下一行
    autoprefixer: {},
  },
};

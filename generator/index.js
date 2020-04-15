module.exports = (api, options, rootOptions) => {
  // 命令
  api.extendPackage({
    scripts: {
      'build:prod': 'vue-cli-service build --mode production',
      'build:dev': 'vue-cli-service build --mode dev',
      'build:test': 'vue-cli-service build --mode test',
      'lint:fix': 'eslint --fix ./src/'
    }
  })

  // 项目依赖
  api.extendPackage({
    dependencies: {
      'axios': '^0.19.2',
      "element-ui": "^2.13.0",
      "store2": "^2.11.0",
      "font-awesome": "^4.7.0",
      "vue-router": "^3.1.6",
      "vuex": "^3.1.3"
    }
  })

  // css 预处理 - less
  // 在 preset.json cssPreprocessor 配置
  // 会自动添加 less、less-loader 依赖
  // 自动配置 loader

  // 添加 postcss 插件
  api.extendPackage({
    devDependencies: {
      "@vue/test-utils": "^1.0.0-beta.33",
      "jest": "^25.0"
    }
  })

//   api.extendPackage({
//     postcss: {
//       'plugins': {
//         'autoprefixer': {},
//         'postcss-px-to-viewport': {
//           'viewportWidth': 750,
//           'viewportHeight': 1334,
//           'unitPrecision': 3,
//           'viewportUnit': 'vw',
//           'selectorBlackList': [
//             'ignore'
//           ],
//           'minPixelValue': 1,
//           'mediaQuery': false
//         }
//       }
//     }
//   })

  // 自动导入
//   api.extendPackage({
//     devDependencies: {
//       'style-resources-loader': '1.2.1'
//     }
//   })

  // eslint
  // 有一些功能在 preset.json 中配置，例如：
  // package.json devDependencies 包含 "@vue/eslint-config-standard"
  // .eslintrc extends 包含 "@vue/standard"
  // package.json gitHooks 包含 "pre-commit": "lint-staged"
  api.extendPackage({
    eslintConfig: {
      rules: {
        'space-before-function-paren': 'off',
        'no-tabs': 'off'
      }
    }
  })

  // commitizen - 协助开发者提交标准的 git message
//   api.extendPackage({
//     devDependencies: {
//       'commitizen': '^3.0.2',
//       'cz-conventional-changelog': '^2.1.0'
//     }
//   })

//   api.extendPackage({
//     config: {
//       'commitizen': {
//         'path': './node_modules/cz-conventional-changelog'
//       }
//     }
//   })

  // commitlint - 校验 git 提交信息格式
//   api.extendPackage({
//     devDependencies: {
//       '@commitlint/cli': '^7.2.1',
//       '@commitlint/config-conventional': '^7.1.2'
//     }
//   })

//   api.extendPackage({
//     gitHooks: {
//       'commit-msg': 'commitlint -e'
//     }
//   })

//   api.extendPackage({
//     commitlint: {
//       'extends': ['@commitlint/config-conventional']
//     }
//   })

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('tests/'))
      .forEach(path => delete files[path])
  })

  // 生成项目文件
  api.render('./template')

  // 屏蔽 generator 之后的文件写入操作
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}

// https://eslint.org/docs
module.exports = {
  // 限定根目录
  root: true,
  // vue官方提ESLint 插件 eslint-plugin-vue提供了 parser 和 rules。
  // parser 为 vue-eslint-parser
  parser: 'vue-eslint-parser',
  // 解析器选项
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  // 指定启用环境
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  globals: {},
  // 启用推荐的规则
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 未使用变量直接error 且忽略名称以下划线开头的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'space-before-function-paren': 'off',
    // 警告除配置的大小写之外的自定义事件名称
    'vue/custom-event-name-casing': 'off',
    // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/script-setup-uses-vars': 'error',
    // 强制属性顺序
    'vue/attributes-order': 'off',
    // 每个文件是否只有一个组件
    'vue/one-component-per-file': 'off',
    // 标签的右括号之前强制换行
    'vue/html-closing-bracket-newline': 'off',
    // 限制每行的最大属性/属性数以提高可读性
    'vue/max-attributes-per-line': 'off',
    // 需要在多行元素的内容前后换行
    'vue/multiline-html-element-content-newline': 'off',
    // 需要在单行元素的内容前后换行
    'vue/singleline-html-element-content-newline': 'off',
    // 在模板中的自定义组件上强制执行属性命名样式
    'vue/attribute-hyphenation': 'off',
    // 此规则要求为每个未标记为required（Boolean道具除外）的道具设置默认值
    'vue/require-default-prop': 'off',
    // 消除自我分配
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}

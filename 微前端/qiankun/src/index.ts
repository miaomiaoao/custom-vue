/**
 * @author Kuitos
 * @since 2019-04-25
 */

// registerMicroApps, start这两个方法是最重要的两个方法
// loadMicroApp 加载组件 动态加载应用
export { loadMicroApp, registerMicroApps, start } from './apis';
// 全局通信方法，内置发布订阅系统 也可以redux  更新和监听状态变化
export { initGlobalState } from './globalState'; 
export { getCurrentRunningApp as __internalGetCurrentRunningApp } from './sandbox';
export * from './errorHandler';
export * from './effects';
export * from './interfaces';
export { prefetchImmediately as prefetchApps } from './prefetch';

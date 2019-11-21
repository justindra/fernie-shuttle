declare module 'vue-material/dist/components' {
  import _Vue from 'vue';

  // export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
  export function MdApp(Vue: typeof _Vue, options?: any): void;
  export function MdButton(Vue: typeof _Vue, options?: any): void;
  export function MdCard(Vue: typeof _Vue, options?: any): void;
  export function MdContent(Vue: typeof _Vue, options?: any): void;
  export function MdDrawer(Vue: typeof _Vue, options?: any): void;
  export function MdDivider(Vue: typeof _Vue, options?: any): void;
  export function MdIcon(Vue: typeof _Vue, options?: any): void;
  export function MdList(Vue: typeof _Vue, options?: any): void;
  export function MdSubheader(Vue: typeof _Vue, options?: any): void;
  export function MdTabs(Vue: typeof _Vue, options?: any): void;
  export function MdToolbar(Vue: typeof _Vue, options?: any): void;
}

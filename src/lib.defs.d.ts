// Type definitions for vue-virtual-scroller
// Project: https://github.com/Akryum/vue-virtual-scroller/
declare module 'vue-virtual-scroller' {
  import { defineComponent, Plugin } from 'vue';

  interface PluginOptions {
    installComponents?: boolean;
    componentsPrefix?: string;
  }

  const plugin: Plugin & { version: string };

  export const RecycleScroller: any;
  export const DynamicScroller: any;
  export const DynamicScrollerItem: any;

  export function IdState(options?: {
    idProp?: (vm: any) => any;
  }): ReturnType<typeof defineComponent>;

  export default plugin;
}

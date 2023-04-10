import type { App, Component, Plugin, Directive } from "vue";

export type SFCWithInstall<T> = T & Plugin;

/**
 * 组件添加install方法
 * @param compoent
 * @returns
 */
export function withInstall<T extends Component>(compoent: T) {
  (compoent as SFCWithInstall<T>).install = (app: App) => {
    app.component(compoent.name as string, compoent);
  };

  return compoent as SFCWithInstall<T>;
}

export type DirectiveWithInstall<T> = T & Plugin;

/**
 * 指令添加install方法
 * @param name
 * @param directive
 * @returns
 */
export function directiveWithInstall<T extends Directive>(
  name: string,
  directive: T,
) {
  (directive as DirectiveWithInstall<T>).install = (app: App) => {
    app.directive(name, directive);
  };

  return directive as DirectiveWithInstall<T>;
}

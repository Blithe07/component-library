import type { App } from "vue";
import * as Components from "../components";
import * as Directives from "../directives";

export const install = (app: App) => {
  Object.values({ ...Components, ...Directives }).forEach((com) => {
    app.use(com);
  });
};

declare module "vue" {
  export interface GlobalComponents {
    YhPageLayout: typeof import("./dist")["YhPageLayout"];
    YhDictsSelect: typeof import("./dist")["YhDictsSelect"];
    YhDictsAnalysis: typeof import("./dist")["YhDictsAnalysis"];
    YhCard: typeof import("./dist")["YhCard"];
    YhProductSelect: typeof import("./dist")["YhProductSelect"];
    YhLink: typeof import("./dist")["YhLink"];
    YhDivide: typeof import("./dist")["YhDivide"];
    YhDivideItem: typeof import("./dist")["YhDivideItem"];
    YhPage: typeof import("./dist")["YhPage"];
    YhRadioTab: typeof import("./dist")["YhRadioTab"];
    YhTreeBox: typeof import("./dist")["YhTreebox"];
    YhDictSelect: typeof import("./dist")["YhDictSelect"];
    YhDict: typeof import("./dist")["YhDict"];
    YhConfirmbox: typeof import("./dist")["YhConfirmbox"];
    YhTab: typeof import("./dist")["YhTab"];
    YhTabItem: typeof import("./dist")["YhTabItem"];
  }
}

declare global {
  const YhAuth: typeof import("./dist")["YhAuth"];
}

export {};

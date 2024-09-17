import { DEFAULT_LANG, LANGUAGES } from "@consts";

export const ROUTES = {
  home: "/",
  blog: {
    root: "/blog",
    search: "/blog/search",
  },
} as const;

function mapObject(obj, fn) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] =
      typeof value === "object" && value !== null
        ? mapObject(value, fn)
        : fn(value);
    return acc;
  }, {});
}

const generateRouter = () => {
  return LANGUAGES.reduce((acc, lang) => {
    if (lang == DEFAULT_LANG) {
      acc[lang] = mapObject(ROUTES, (v) => `${v}`);
    } else {
      acc[lang] = mapObject(ROUTES, (v) => `/${lang}${v}`);
    }
    return acc;
  }, {});
};

const TRANSLATED_ROTUES = generateRouter();

export const getRouter = (lang) => {
  return TRANSLATED_ROTUES[lang] as typeof ROUTES;
};

type RouterTypeGen<T extends { [key: string]: any }> = {
  [key in keyof T]: T[key] extends string | Function
    ? T[key]
    : RouterTypeGen<T[key]>;
};

export type RouterType = { [key: string]: Function | string | RouterType };

import "astro";

declare module "astro" {
  interface AstroSharedContext<
    Props extends Record<string, any> = Record<string, any>,
    RouteParams extends Record<string, string | undefined> = Record<
      string,
      string | undefined
    >
  > {
    currentLocale: "BOB";
  }
}

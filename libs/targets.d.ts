declare module "@geocortex/workflow/runtime/app" {
    export type Application = any;

    export type Map = any;

    export type Site = any;

    export type Widget = any;
}

declare module "@geocortex/workflow/runtime/app/ActivityPackUtils" {
    export function mapDependencies(moduleMap: any, modulePrefix: string, libraryPath?: string);
}

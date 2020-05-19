/// <reference types="react" />
declare module "@geocortex/workflow/runtime/app/AppActivity" {
    import * as React from "react";
    export { React };
    import { Application, Map, Site, Widget } from "@geocortex/workflow/runtime/app";
    /** Properties that control how an activity user interface is hosted by the host application. */
    export interface ShowProps {
        /** The name of the container that will host the activity user interface. */
        container?: "default" | "modal";
        /** The title to present for the activity user interface. */
        title?: string;
        /** The icon to present for the activity user interface. */
        icon?: string;
    }
    /** A render method that provides a React element. */
    export interface RenderMethod<T, TThis, TState> {
        /**
         * @param this The activity instance.
         * @param resolve The resolver that returns updated state to the activity from the React element.
         * @param state The initial activity state.
         * @returns The React element to render.
         */
        (this: TThis, resolve: RenderResolve<T>, state: TState):
            | JSX.Element
            | PromiseLike<JSX.Element>;
    }
    /** A resolve method for messaging between a React component and the parent activity. */
    export interface RenderResolve<T> {
        /** Returns updated state to the activity. */
        (value: T | PromiseLike<T>): void;
        /** Returns a rejection to the activity. */
        reject(reason: any): any;
    }
    /**
     * A base activity implementation that provides access to application level resources and
     * facilitates rendering of custom user interfaces.
     */
    export abstract class AppActivity {
        /**
         * The host application. For example:
         * - Geocortex Viewer for HTML5: https://docs.geocortex.com/essentials/gvh/latest/api-help/classes/_mapping_infrastructure_amd_d_._geocortex_infrastructure_viewer_.viewerapplication.html
         * - Web AppBuilder: https://developers.arcgis.com/web-appbuilder/api-reference
         */
        app: Application;
        /**
         * The map of the host application. For example:
         * - ArcGIS API for JavaScript v3: https://developers.arcgis.com/javascript/3/jsapi/map-amd.html
         * - ArcGIS API for JavaScript v4: https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html
         */
        map: Map;
        /**
         * The Geocortex Essentials site of the host application. This is available in Geocortex Viewer for HTML5 applications only.
         * See https://docs.geocortex.com/essentials/gvh/latest/api-help/classes/_essentials_amd_d_._geocortex_essentials_site_.site.html
         */
        site: Site;
        /**
         * The Web AppBuilder widget running the workflow. This is available in Web AppBuilder applications only.
         */
        widget: Widget;
        /** Shows the activity user interface. */
        show(props?: ShowProps): boolean;
        /** Shows the activity user interface in a disabled/non-interactive state. */
        spin(props?: ShowProps): boolean;
        /** Shows the activity user interface in a disabled/non-interactive state but does not block the host application. */
        spinNoBlock(props?: ShowProps): boolean;
        /** Hides the activity user interface. */
        hide(): boolean;
        /** Renders the activity user interface. */
        render<T, TState>(method: RenderMethod<T, this, TState>, state: TState): Promise<T>;
        /** Renders the activity user interface. */
        render<T>(method: RenderMethod<T, this, any>): Promise<T>;
        /** Renders the activity user interface. */
        render(visual: JSX.Element): Promise<React.Component<any, any> | Element>;
        /** Renders the activity user interface. */
        render(visual: any): Promise<any>;
        /** Renders the activity user interface. */
        render(): Promise<HTMLElement>;
        constructor();
        /** Performs the activity execution logic. */
        abstract execute(...args: any[]): any;
    }
}

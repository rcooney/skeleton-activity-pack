/// <reference types="react" />
declare module "@geocortex/workflow/runtime/app/RegisterCustomFormElementBase" {
    import { Element } from "@geocortex/workflow/runtime/forms/FormDefinition";
    /** The props of a custom form element. */
    export interface CustomFormElementProps {
        /** The form element. */
        element: Element;
        /** The name of the form element. */
        name: string;
        /**
         * A callback function to raise an event.
         * The "changed" and "clicked" events expect the value of the form element as the eventValue.
         * The "custom" event accepts any value as the eventValue.
         * Use the Get Form Event Data to access the event data in a subworkflow of the Display Form activity.
         */
        raiseEvent: (eventName: "changed" | "clicked" | "custom", eventValue: any) => void;
    }
    /**
     * A base activity implementation that provides a convenient way to register
     * custom form elements to be used in Display Form activities.
     */
    export abstract class RegisterCustomFormElementBase {
        constructor();
        /**
         * Performs the activity execution logic.
         * Implementations of the execute method should call the register method to register custom form elements.
         */
        abstract execute(...args: any[]): any;
        /**
         * Registers a custom form element handler.
         * @param name A unique type name for the form element.
         * @param component A React component class or stateless functional component that performs the rendering of the form element.
         */
        protected register(
            name: string,
            component:
                | React.ComponentClass<CustomFormElementProps>
                | React.SFC<CustomFormElementProps>
        ): void;
    }
}
declare module "@geocortex/workflow/runtime/forms/FormDefinition" {
    /** A form element. */
    export interface Element {
        /** Indicates the type name of the custom implementation. */
        customType?: string;
        /** Indicates the description for the element. */
        description?: Text;
        /** Indicates that the element is enabled or not. */
        enabled?: boolean;
        /** Indicates the error for the element. */
        error?: Text;
        /** Indicates the title for the element. */
        title?: Text;
        /** Indicates the current value. */
        value?: any;
        /** Indicates whether the element is visible or not. */
        visible?: boolean;
    }
}

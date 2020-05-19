import * as React from "react";
import {
    CustomFormElementProps,
    RegisterCustomFormElementBase,
} from "@geocortex/workflow/runtime/app/RegisterCustomFormElementBase";

// A simple React Stateless Functional Component that demonstrates raising events.
// Use React.SFC when your component does not have any state.
const SfcCustomFormElement: React.SFC<CustomFormElementProps> = props => {
    const raiseClick = event => {
        // Raise the clicked event.
        props.raiseEvent("clicked", new Date());
    };

    const raiseChange = event => {
        // Raise the changed event.
        props.raiseEvent("changed", new Date());
    };

    const raiseCustom = event => {
        // Raise the custom event with a custom event value.
        const eventValue = {
            customEventType: "custom1",
            data: new Date(),
        };
        props.raiseEvent("custom", eventValue);
    };

    return (
        <div>
            A simple React.SFC custom form element
            <br />
            <button onClick={raiseClick}>Raise click</button>
            <button onClick={raiseChange}>Raise change</button>
            <button onClick={raiseCustom}>Raise custom</button>
        </div>
    );
};

export interface ReactComponentCustomFormElementState {
    // The number of button clicks the use has made.
    clickCount: number;
}

// A simple React Component that demonstrates raising events and using state.
// Use React.Component when your component manages state.
export class ReactComponentCustomFormElement extends React.Component<
    CustomFormElementProps,
    ReactComponentCustomFormElementState
> {
    // Set the default state of the component.
    state = {
        clickCount: 0,
    };

    raiseClick = event => {
        // Update the state of the component.
        this.setState({
            clickCount: this.state.clickCount + 1,
        });

        // Raise the clicked event.
        this.props.raiseEvent("clicked", new Date());
    };

    raiseChange = event => {
        // Update the state of the component.
        this.setState({
            clickCount: this.state.clickCount + 1,
        });

        // Raise the changed event.
        this.props.raiseEvent("changed", new Date());
    };

    raiseCustom = event => {
        // Update the state of the component.
        this.setState({
            clickCount: this.state.clickCount + 1,
        });

        // Raise the custom event with a custom event value.
        const eventValue = {
            customEventType: "custom1",
            data: new Date(),
        };
        this.props.raiseEvent("custom", eventValue);
    };

    render() {
        return (
            <div>
                A simple React.Component custom form element
                <br />
                <button onClick={this.raiseClick}>Raise click</button>
                <button onClick={this.raiseChange}>Raise change</button>
                <button onClick={this.raiseCustom}>Raise custom</button>
                <br />
                Number of clicks: {this.state.clickCount}
            </div>
        );
    }
}

// @displayName Register Simple Custom Form Elements
// @category Custom Activities
// @description Registers the following custom form elements:
//              InlineReactSfcCustomFormElement, ReactSfcCustomFormElement, ReactComponentCustomFormElement.
export class RegisterSimpleCustomFormElements extends RegisterCustomFormElementBase {
    // The unique identifier of the activity.
    // This value should not be changed once an activity has been published.
    static action = "<generate:>RegisterSimpleCustomFormElements";

    // The identifier of the suite of activities that this activity belongs to.
    // This value should not be changed once an activity has been published.
    static suite = "<generate:>";

    // Perform the execution logic of the activity.
    execute(): {} {
        // Register custom form elements.
        this.register("InlineReactSfcCustomFormElement", (props: CustomFormElementProps) => {
            return <div>Hello World</div>;
        });
        this.register("ReactSfcCustomFormElement", SfcCustomFormElement);
        this.register("ReactComponentCustomFormElement", ReactComponentCustomFormElement);

        return {};
    }
}

import * as React from "react";
import {
    CustomFormElementProps,
    RegisterCustomFormElementBase,
} from "@geocortex/workflow/runtime/app/RegisterCustomFormElementBase";

export interface StarRatingState {
    // The selected star rating.
    rating: number;
}

export class StarRatingFormElement extends React.Component<
    CustomFormElementProps,
    StarRatingState
> {
    // Set the default state of the component.
    state: StarRatingState = {
        rating: 0,
    };

    componentDidMount() {
        // Set the initial state from the element's value.
        const { element } = this.props;
        if (element && element.value) {
            this.setState({
                rating: element.value,
            });
        }
    }

    componentWillReceiveProps(nextProps: Readonly<CustomFormElementProps>) {
        // Set the state from the element's value when the props change.
        // This could happen as the result of a form event subworkflow that uses
        // the "Set Form Element Property" activity to set the value property of
        // the element.
        const { element } = nextProps;
        if (element && element.value) {
            this.setState({
                rating: element.value,
            });
        }
    }

    handleClick = event => {
        const { element, raiseEvent } = this.props;

        // Get the value from the button.
        // Parse as an integer because the value will be a string.
        const value = parseInt(event.target.value);

        if (element.value !== value) {
            // Update the component state.
            this.setState({
                rating: value,
            });

            // Update the element's value.
            element.value = value;

            // Raise the changed event
            raiseEvent("changed", value);
        }
    };

    // Button style to show only the button content.
    baseStyle: React.CSSProperties = {
        background: "none",
        border: "none",
        outline: "none",
        fontSize: "2em",
        padding: 0,
    };

    // Button styles to show selected and unselected states.
    selectedStyle = { ...this.baseStyle, ...{ color: "#ffa91b" } };
    unselectedStyle = { ...this.baseStyle, ...{ color: "#c6c6c6" } };

    render() {
        // Disable the element if it is read only.
        // Note: readOnly isn't an official property of custom form elements,
        // however, it can be set by a form event subworkflow that uses the
        // "Set Form Element Property" to set the readOnly property of the
        // element to true|false.
        const disabled = (this.props.element as any).readOnly ? true : undefined;

        // Create 5 buttons
        const buttons = [];
        for (let i = 1; i <= 5; i++) {
            buttons.push(
                <button
                    onClick={this.handleClick}
                    value={i}
                    style={this.state.rating < i ? this.unselectedStyle : this.selectedStyle}
                    disabled={disabled}
                >
                    ★
                </button>
            );
        }

        return <div>{buttons}</div>;
    }
}

// @displayName Register Star Rating Form Element
// @category Custom Activities
// @description Registers the following custom form elements:
//              StarRating.
export class RegisterStarRatingFormElement extends RegisterCustomFormElementBase {
    // The unique identifier of the activity.
    // This value should not be changed once an activity has been published.
    static action = "<generate:>::RegisterStarRatingFormElement";

    // The identifier of the suite of activities that this activity belongs to.
    // This value should not be changed once an activity has been published.
    static suite = "<generate:>";

    // Perform the execution logic of the activity.
    execute(): {} {
        // Register custom form elements.
        this.register("StarRating", StarRatingFormElement);

        return {};
    }
}

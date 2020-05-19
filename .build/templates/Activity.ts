/** An interface that defines the inputs of the activity. */
export interface _ActivityInputs {
    // @displayName Input 1
    // @description The first input to the activity.
    // @required
    input1?: string;

    // @displayName Input 2
    // @description The second input to the activity.
    input2?: number;
}

/** An interface that defines the outputs of the activity. */
export interface _ActivityOutputs {
    /** A result of the activity. */
    // @description The result of the activity.
    result: string;
}

// @displayName _Activity
// @category Custom Activities
// @description A description of the activity.
export class _Activity {
    // The unique identifier of the activity.
    // This value should not be changed once an activity has been published.
    static action = "<generate:>::_Activity";

    // The identifier of the suite of activities that this activity belongs to.
    // This value should not be changed once an activity has been published.
    static suite = "<generate:>";

    // Perform the execution logic of the activity.
    async execute(inputs: _ActivityInputs): Promise<_ActivityOutputs> {
        return { result: "test" };
    }
}

import { AppActivity, RenderResolve, React } from "@geocortex/workflow/runtime/app/AppActivity";

export interface HelloUIInputs {
    /** This is an input. */
    text?: string;
}

export interface HelloUIOutputs {
    /** This is an output. */
    result?: string;
}

interface State {
    text: string;
    result?: string;
}

// @displayName Hello UI
// @category Custom Activities
// @description Demonstrates an activity that creates a custom user interface.
export class HelloUI extends AppActivity {
    // Required to participate in workflow. This is the mandatory value for the workflow engine to execute this handler.
    static action = "<generate:>::HelloUI";

    // Required to participate in workflow. This is value must be in alignment with the reference.
    static suite = "<generate:>";

    private collectInput(resolve: RenderResolve<State>, state: State) {
        function clear() {
            resolve({ text: "" });
        }

        function submit() {
            resolve({ text: state.text, result: state.text });
        }

        function onChange(text: string) {
            resolve({ text });
        }

        return (
            <div className="x-custom-form">
                <style type="text/css">
                    {`
                        .x-custom-form {
                            padding: 0.5em;
                        }

                        .x-custom-form button {
                            padding: 0.2em 0.5em 0.2em 0.6em;
                            border: 1px solid #333;
                            background-color: #ccf;
                        }

                        .x-custom-form .submit {
                            font-weight: bold;
                        }

                        .x-custom-form > * {
                            margin: 0.2em;
                        }
                    `}
                </style>
                <input
                    type="text"
                    value={state.text}
                    onChange={x => onChange(x.currentTarget.value)}
                />
                <button onClick={submit} className="submit">
                    Submit
                </button>
                <button onClick={clear}>Clear</button>
            </div>
        );
    }

    // Do the work for the activity.
    async execute(inputs: HelloUIInputs): Promise<HelloUIOutputs> {
        this.show({
            title: "Custom Form Title",
        });

        let state: State = {
            text: typeof inputs.text === "string" ? inputs.text : "",
        };

        while (state.result === void 0) {
            state = await this.render(this.collectInput, state);
        }

        this.spin();
        this.render(<div />);

        return { result: state.result };
    }
}

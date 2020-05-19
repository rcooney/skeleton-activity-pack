# Geocortex Workflow Activity SDK

This project provides tools for developing custom activities and form elements for Geocortex Workflow 5.
The project produces an **Activity Pack** which is a collection of custom activities.

## Requirements

-   [Node.js](https://nodejs.org/en/) version 6.11.0 or newer.
    -   Run `node -v` in the terminal to confirm the version.
-   [NPM](https://www.npmjs.com/get-npm) version 3.10.10 or newer.
    -   Run `npm -v` in the terminal to confirm the version.
-   [Visual Studio Code](https://code.visualstudio.com/) version 1.15 or newer.
    -   Note: This document assumes that Visual Studio Code is the development environment; however, it is possible to develop workflow activities with Visual Studio or other command line tools.
-   Working knowledge of [TypeScript](https://www.typescriptlang.org/).

## Setup

1. Start Visual Studio Code.
1. Select `Open Folder...` and choose the `activity-sdk` folder.
1. Open the terminal using `` CTRL+` ``
    - Or from the **View** > **Integrated Terminal** menu.
1. Run `npm install` in the terminal to install the project's dependencies.
1. Run `npm run build` in the terminal to compile the TypeScript project.
    - The `dist` folder will contain the compiled activity pack output.

## Create Activities

To create a new activity:

1. Run `npm run activity` in the terminal.
1. When prompted enter the name of the activity you would like to create and press `Enter`. For example, `MyActivity`.
    - Use PascalCase for activity names. This is a convention, not a requirement.
1. The script will perform the following operations:
    1. Create a new activity .ts file with the provided name in the `src/activities` folder.
    1. Populate the activity .ts file from an activity template.
    1. Register the activity in `src/index.ts`.
1. Open the newly created `src/activities/MyActivity.ts` file.
1. Implement the activity by modifying the inputs, outputs and execution logic of the activity class.

You can add many activities to the same project.

## Deploy the Activity Pack

Activity packs must be hosted by a web server that supports SSL and CORS.
Ensure your server:

-   Has a valid SSL certificate.
-   Supports [Cross-Origin Resource Sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) and allows CORS requests from the `https://apps.geocortex.com` origin.
    -   Note: If you sign in to Workflow Designer using Portal for ArcGIS your server will need to allow CORS requests from your custom origin. For example, `https://acme.apps.geocortex.com`.

This allows:

-   Workflow Designer to read the list of custom activities and their metadata from the source .ts files (or source maps).
-   Applications to execute the custom activities at runtime using the output .js files.

There are several hosting options:

### Development Web Server

This project includes an [Express](https://www.npmjs.com/package/express) web server that supports SSL and is suitable for most development purposes.

To start the development web server and enable a compile-on-save watch task:

1. Run `npm start` in the terminal to start the build and the development web server.
    - Note: You can press `CTRL+C` in the terminal to stop the watch and the development web server.

-   The development web server is only available while the `start` task is running.
-   The development web server is available at https://localhost:57999/ by default.
    -   You can change the port by modifying `.build/tsc.js`. Edit the first line:  
        `var PORT = 57999;`
-   The development web server serves the content of the `dist` directory.
-   The SSL certificate of the development web server is not valid. To work around this, do one of the following:
    -   Open https://localhost:57999/ in a web browser and allow the invalid certificate as an exception.
    -   Trust the `.build/ca.crt` file (add it to your Trusted Root Authority store).
    -   Replace the `.build/localhost.crt` and `.build/localhost.key` files with a known valid certificate.
-   The development web server supports CORS requests from any origin by default.

### IIS

1. Ensure the IIS web site supports SSL and uses a valid SSL certificate.
1. Ensure the web site or application supports CORS and allows CORS requests from the `https://apps.geocortex.com` origin.
1. Do one of the following:

    - Register the `dist` folder as a virtual directory or application in IIS.
    - Create a virtual directory or application in IIS and copy the contents of the `dist` folder into it.

### Another Web Server

1. Ensure the web server supports SSL and uses a valid SSL certificate.
1. Ensure the web server supports CORS and allows CORS requests from the `https://apps.geocortex.com` origin.
1. Copy the contents of the `dist` folder to a virtual directory on the web server.

## Register the Activity Pack

To make an activity pack available to workflow authors in Workflow Designer you must create a special item in ArcGIS Online or Portal for ArcGIS that references it.

1. Sign in to ArcGIS Online or Portal for ArcGIS (using the same account that you use to author workflows).
1. Go to **My Content**.
1. Select **Add Item** > **An application**.
    - Type: `Web Mapping`.
    - Purpose: `Ready To Use`.
    - API: `JavaScript`.
    - URL: The URL to your activity pack.
        - Use https://localhost:57999/ for the development server.
    - Title: Your desired title.
    - Tags: Must include `geocortex-workflow-activity-pack`.

## Author Workflows with Custom Activities

To see your custom activities in the toolbox of Workflow Designer:

1. Open or reload (press `F5`) Workflow Designer.
1. Custom activities will appear in the toolbox.
1. Drag custom activities onto the design surface and configure their inputs as you would for other activities.
1. Save the workflow.
    - The workflow will contain references to custom activities.

Note: If you modify the source of an activity you must reload Workflow Designer to see those changes.

## Control Activity Appearance

You can control how an activity is presented in Workflow Designer by modifying the following decorators of the activity:

-   Activity class
    -   `@category` The name of the toolbox category the activity will appear in.
    -   `@displayName` The name of the activity that appears in the toolbox and properties panel.
    -   `@description` The description of the activity that appears in inline help tooltips.
    -   `@helpUrl` An absolute URL to additional documentation for this activity.
-   Inputs interface
    -   `@displayName` The name of the activity input that appears in the properties panel.
    -   `@description` The description of the activity input that appears in inline help tooltips.
    -   `@required` Whether the activity input should be presented as required.
        -   Note: Validation of required inputs must be implemented by the `execute(inputs)` method of the activity.
-   Outputs interface
    -   `@description` The description of the activity output that appears in inline help tooltips.

## Activity Compatibility

You can specify which environments an activity is compatible with by adding the appropriate decorators to the activity from the following list:

-   `@onlineOnly` Indicates that the activity will not work without network connectivity. It is sufficient to add the decorator without any text beside it.
-   `@clientOnly` Indicates that the activity will only run in a client environment such as web browser or mobile app. It is sufficient to add the decorator without any text beside it.
-   `@serverOnly` Indicates that the activity will only run on a server running Workflow Server. It is sufficient to add the decorator without any text beside it.
-   `@supportedApps` A comma-separated list of apps supported by the activity. Workflows targeting an app that is not listed here should not use this activity.
-   `@unsupportedApps` A comma-separated list of apps not supported by the activity. Workflows targeting an app that is listed here should not use this activity.

App values currently supported in Workflow Designer:

-   `WAB`
-   `GVH`

If you do not want to limit the use of an activity, do not add any of the above decorators. It will appear in the toolbox and will not generate any warnings when used.

-   Note: The intention is that you use either `@supportedApps` or `@unsupportedApps`, depending on the situation. Do not use both.

## Advanced Activities

### App Activities

Some activities may need access to resources like the map, the host application or host widget. An `AppActivity` base class is available that provides these resources. Depending on the type of host application different resources will be available.

1. Create a new activity using `npm run activity`.
1. Open the newly created .ts(x) file.
1. Add an import for the `AppActivity` base class at the top of your activity .ts(x) file.  
   `import { AppActivity } from "@geocortex/workflow/runtime/app/AppActivity";`
1. Modify the activity class declaration to extend the `AppActivity` base class.  
   `export class MyActivity extends AppActivity`
1. Use the `map`, `app` and `widget` properties of the activity class within the `execute(inputs)` method.

### Custom Form Elements

Some workflows may need to display form elements beyond those that are provided out-of-the-box. Custom form elements can be implemented using [React](https://reactjs.org/) and then registered through a custom activity. The custom activity must be used in the host workflow prior to the Display Form activity that uses the custom form element.

This documentation assumes the developer has a thorough understanding of React development with TypeScript.

1. Create a new activity using `npm run activity`.
    - Use a .tsx file extension if you wish to define React components in this file.
    - Use a .ts file extension if you wish to define React components in separate .tsx files.
1. Open the newly created .ts(x) file.
1. Add the following imports at the top of your activity .ts(x) file.  
   `import { CustomFormElementProps, RegisterCustomFormElementBase } from "@geocortex/workflow/runtime/app/RegisterCustomFormElementBase";`
1. If you created a .tsx file you must also import React by adding the following import at the top of your activity .tsx file.  
   `import * as React from "react";`
1. Modify the activity class declaration to extend the `RegisterCustomFormElementBase` base class.  
   `export class MyActivity extends RegisterCustomFormElementBase`
1. Within the `execute(inputs)` method register your custom React-based form elements by calling the `register(name, component)` method.

    - `name` is a `string` that represents the custom type name for this form element. You will use this name as the "Custom Type" property when configuring a Custom form element in Workflow Designer. This name should be unique.
    - `component` is a React component that implements `React.SFC<CustomFormElementProps>` or extends `React.ComponentClass<CustomFormElementProps>` that provides the custom form element user interface .

    This example registers a React Stateless Functional Component inline in the activity. This isn't a best practice, but it demonstrates the pattern. A better pattern is to define your React Components in other .tsx files.

    ```
    execute(): {} {
        this.register("CustomFormElement1", (props: CustomFormElementProps) => {
            return (<div>Hello World</div>);
        });
        return {};
    }
    ```

1. In Workflow Designer add the custom activity to the workflow.
    - The custom activity must precede any Display Form activities that use the custom form element. It is a best practice to put these activities at the very start of your workflow.
1. In a Display Form activity add a "Custom" form element.
1. Set the "Custom Type" property of the custom form element to match the type name used in the `register(name, component)` method above.

Note: you can register multiple custom form elements in a single activity.

Also see the following examples of more complex custom form elements:

-   `.build/examples/RegisterSimpleCustomFormElements.tsx`
-   `.build/examples/RegisterStarRatingFormElement.tsx`

#### Get Properties of Custom Form Elements at Runtime

A custom form element may produce a value that a workflow needs to access at runtime. To get the value of a property of a custom form element:

1. Use an expression to access the custom property of the form element. For example, to access `data` and `value` properties use an expression like `=$form1.state.custom1.data` and `=$form1.state.custom1.value`.

Note: it is the responsibility of the React implementation of your custom form element to provide the custom property on the component's `element` prop. For example, `props.element.data` or `props.element.value`.

#### Set Properties of Custom Form Elements at Runtime

A custom form element may require configuration settings or property values to be assigned at runtime. To set a property on a custom form element:

1. Add an event subworkflow to the custom form element. For example, add the `load` event.
1. Add a `Set Form Element Property` activity to the subworkflow.
1. Set the `Property Name` input of the activity to the desired property name to set on the custom form element. For example, `data` or `value`.
1. Set the `Property Value` input of the activity to the desired property value to pass to the custom form element.

Note: Within the React implementation of your custom form element the property value will be available via the component's `element` prop. For example, `props.element.data` or `props.element.value`.

### Reference external libraries

If your Activity Pack relies upon external libraries, you need to add a call to `mapDependencies()` to the `configure()` method in `src/main.ts`.

For example, if you wanted to use the _chai_ library and had the file "chai.js" located in a folder called `deps/chai` within the `dist` folder, you would write the following:

```
mapDependencies({ chai: "deps/chai/chai" }, prefix);
```

(You also need to uncomment the `import` statement at the top of the file to be able to call the `mapDependencies()` function.)

In your activity, you could then reference the _chai_ library by name:

```
import { assert } from "chai";
...
assert(...);
```

### Reference external react components

If your Activity Pack contains a custom form element that relies upon an external react component, you need to add a call to `mapDependencies()` to the `configure()` method in `src/main.ts`, much the same as for simpler external libraries.

-   Note: There are some limitations on the types of component you can load:
    -   You can only import components that are defined using the [AMD or UMD](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) syntax.
    -   You cannot import components defined as an [Named Module](http://requirejs.org/docs/whyamd.html#namedmodules).
    -   You cannot import components defined using the [CommonJS](http://requirejs.org/docs/commonjs.html) syntax.

#### Example: Using the third-party [react-circular-color](https://github.com/ubcent/react-circular-color) component.

1. Run `npm install react-circular-color` in the terminal.
1. Run `npm run activity` in the terminal.
1. When prompted enter the name `RegisterStarRatingFormElement.tsx` and press `Enter`.  
   This will use the star rating example as the template for your activity.
1. Edit `src/activities/RegisterStarRatingFormElement.tsx`: 1. Add the following import statement:  
   `import CircularColor from "react-circular-color";` 1. Replace the `render()` method with the following code:  
   `render() { return (<CircularColor size={200} />); }` 1. Save your changes.
1. Edit `src/main.ts`: 1. Add the following line to the `configure(prefix: string)` method:  
   `mapDependencies({ "react-circular-color": "deps/react-circular-color/build/index" }, prefix);` 1. Uncomment the line that starts with `// import { mapDependencies }` at the top of the file. 1. Save your changes.
1. Run `npm run build` in the terminal.
1. In the `dist` folder, create a new sub-directory called `deps` and copy the `node_modules/react-circular-color` folder into it. The directory structure should look like this when you're done:
    - dist
        - activities
        - deps
            - react-circular-color
    - libs
    - node_modules
    - src
1. Run `npm start` in the terminal.
1. Create a workflow that uses your new custom form element and run it in the sandbox. You should see the color picker component on the form.

### Advanced dependencies

Usually the above usage of `mapDependencies` is adequate, but if you ever need a child dependency to use a different version of a module than a parent, there is an additional parameter that can be used for this.

There is an optional third parameter to `mapDependencies` called `libraryPath`. This specifies a path relative to the `dist` folder where the mappings should be applied.

#### Example: Specifying mapping rules for a sub-directory

In this example, we supply a value for the optional `libraryId` parameter when calling `mapDependencies` to define mapping rules for a sub-directory of the activity pack.

By supplying the value of `"deps"` at the end of the parameters, the module name becomes `"@geocortex/workflow/externals/ext-0/deps"` rather than `"@geocortex/workflow/externals/ext-0"`. (The number may be greater than zero if you have several activity packs loaded.)

Code:

```
mapDependencies({ "example-module": "deps/example-module/index" }, prefix, "deps");
```

Result:

```
"@geocortex/workflow/externals/ext-0/deps": {
  ...
  "example-module": "@geocortex/workflow/externals/ext-0/deps/example-module/index"
}
```

## Share the Activity Pack

As a workflow author, you will see custom activities in Workflow Designer from the activity packs you have registered. You will also see activity packs that have been shared with you via groups you are a member of.

To share an activity pack with other workflow authors in your organization share the ArcGIS item that represents the activity pack with a group that contains the target users.

-   Note: You do not need to share activity packs with the end users of your applications that run workflows containing custom activities.

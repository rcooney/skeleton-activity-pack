// import { mapDependencies } from "@geocortex/workflow/runtime/app/ActivityPackUtils";
declare var require: Function;

function configure(prefix: string) {
    // Use the mapDependencies() method to add custom
    // mappings to extra libraries used by your activity pack.
    // The root is the "dist" folder.
    // Paths can be absolute or relative.
    // Example:
    // mapDependencies({ moduleName: "folder/file" }, prefix);
}

let promise;
export function main(load, options, prefix) {
    if (promise === void 0) {
        configure.call(this, prefix);
        return (promise = load("./index", require).then(function(index) {
            index.init();
            return index;
        }));
    }
    return promise;
}

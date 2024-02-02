export const flattenJSON = (function (isArray, wrapped) {
    return function (table) {
        return reduce("", {}, table);
    };
    function reduce(path, accumulator, table) {
        if (isArray(table)) {
            var length = table.length;
            if (length) {
                var index = 0;
                while (index < length) {
                    var property = path + "[" + index + "]",
                        item = table[index++];
                    if (wrapped(item) !== item) accumulator[property] = item;
                    else reduce(property, accumulator, item);
                }
            } else accumulator[path] = table;
        } else {
            var empty = true;
            if (path) {
                for (var property in table) {
                    var item = table[property],
                        property = path + "." + property,
                        empty = false;
                    if (wrapped(item) !== item) accumulator[property] = item;
                    else reduce(property, accumulator, item);
                }
            } else {
                for (var property in table) {
                    var item = table[property],
                        empty = false;
                    if (wrapped(item) !== item) accumulator[property] = item;
                    else reduce(property, accumulator, item);
                }
            }
            if (empty) accumulator[path] = table;
        }
        return accumulator;
    }
})(Array.isArray, Object);

export const unflattenJSON = (table) => {
    var result = {};
    for (var path in table) {
        var cursor = result,
            length = path.length,
            property = "",
            index = 0;
        while (index < length) {
            var char = path.charAt(index);
            if (char === "[") {
                var start = index + 1,
                    end = path.indexOf("]", start),
                    cursor = (cursor[property] = cursor[property] || []),
                    property = path.slice(start, end),
                    index = end + 1;
            } else {
                var cursor = (cursor[property] = cursor[property] || {}),
                    start = char === "." ? index + 1 : index,
                    bracket = path.indexOf("[", start),
                    dot = path.indexOf(".", start);
                if (bracket < 0 && dot < 0) var end = (index = length);
                else if (bracket < 0) var end = (index = dot);
                else if (dot < 0) var end = (index = bracket);
                else var end = (index = bracket < dot ? bracket : dot);
                var property = path.slice(start, end);
            }
        }
        cursor[property] = table[path];
    }
    return result[""];
};

export const getPathData = (obj, path = "") => {
    let split_path = path.split(".");

    let repeat = split_path.length - 1;

    for (let loop = 0; loop <= repeat; loop++) {
        let split = split_path[loop];
        let split_data = obj[split];

        if (repeat === loop) {
            if (!!split_data) {
                return split_data;
            } else {
                return new Object();
            }
        } else {
            split_path.shift();

            return getPathData(split_data, split_path.join("."));
        }
    }

    return null;
};

export const setDataInPath = (obj, path, val) => {
    /**
     * If the path is a string, convert it to an array
     * @param  {String|Array} path The path
     * @return {Array}             The path array
     */
    let stringToPath = function (path) {
        // If the path isn't a string, return it
        if (typeof path !== "string") return path;

        // Create new array
        let output = [];

        // Split to an array with dot notation
        path.split(".").forEach(function (item, index) {
            // Split to an array with bracket notation
            item.split(/\[([^}]+)\]/g).forEach(function (key) {
                // Push to the new array
                if (key.length > 0) {
                    output.push(key);
                }
            });
        });

        return output;
    };

    // Convert the path to an array if not already
    path = stringToPath(path);

    // Cache the path length and current spot in the object
    let length = path.length;
    let current = obj;

    // Loop through the path
    path.forEach(function (key, index) {
        // If this is the last item in the loop, assign the value
        if (index === length - 1) {
            current[key] = val;
        }

        // Otherwise, update the current place in the object
        else {
            // If the key doesn't exist, create it
            if (!current[key]) {
                current[key] = {};
            }

            // Update the current place in the objet
            current = current[key];
        }
    });
};



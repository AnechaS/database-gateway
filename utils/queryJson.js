module.exports = function(value, object, keySearch) {
    let result = undefined;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            if (element[keySearch] == value) {
                result = key;
                break;
            }
        }
    }
    return result;
};

function subGroup(array, subGroupLength) {
    // https://www.cnblogs.com/lgnblog/p/10560008.html
    let index = 0;
    let newArray = [];
    while(index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
  }

/**
 *
 * @param {string} funcname
 * @param {array} args
 * @param {number} [cap=31] default: 31
 * @param {object} [options]
 * @param {boolean} options.zinc
 */
function splitJass(funcname, args, cap, options) {
    let cap_default = 31
    cap = cap == null ? cap_default : cap

    if (options == null) {
        options = {}
    }

    let zinc = false
    if (options.hasOwnProperty('zinc') == true) {
        if (options['zinc'] == true) {
            zinc = true
        }
    }

    if (args == null) {
        args = []
    }
    let subArgsGroup = subGroup(args, cap)
    let pieces = []
    subArgsGroup.forEach((subArgs, index) => {
        let paramsText = subArgs.join(', ')
        let piece = `${funcname}${index}(${paramsText})`
        if (zinc == true) { piece += ';' }
        pieces.push(piece)
    })

    return pieces
}

module.exports = splitJass

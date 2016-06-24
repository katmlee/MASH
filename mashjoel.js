
var totals = function() {
    return _.countBy(game, 'type');
};

var mash = function(n) {
    var result = {};
    var i = n;

    while (game.length > 0) {
        var item = game.splice(i, 1)[0]; // Remove the next nth item
        var counts = totals();
        if (counts[item.type] === 1) { // Last item found, remove it
            var chunks = _.partition(game, function(el) { // Check the Underscore docs
                return el.type === item.type;
            });
            var item = chunks[0][0]; // This is the last item of this type.
            result[item.type] = item.value;
            game = chunks[1]; // Everything else is the remainder of the array.
        }
        i = (i + n) % game.length;
    }
    return result;
};

console.log(mash(4));

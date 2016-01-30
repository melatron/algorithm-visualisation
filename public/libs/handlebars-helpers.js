/**
 * Created by Tony on 21/01/2016.
 */
Handlebars.registerHelper('renderView', function(name, options) {
    if (typeof name === 'string' && typeof templates[name] === 'function') {
        return templates[name]();
    }
    return '';
});
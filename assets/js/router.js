let routes = {};
let templates = {};
function view(url, title) {
    let appDiv = document.getElementById("main-content");
    fetch(url).then(function (page) {
        return page.text();
    }).then(function (html) {
        setInnerHTML(appDiv, html);
        setTitle(title);
    });
}
function route(path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};
function template(name, templateFunction) {
    return templates[name] = templateFunction;
};
function resolveRoute(route) {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    };
};
function router(evt) {
    let url = window.location.hash.slice(1) || '/';
    let routeFunc = resolveRoute(url);
    console.log(url);
    routeFunc();
};
function initRoutes() {
    // Define templates here
    template('home', () => view("pages/home.htm"));
    template('games', () => view("pages/games.htm", "Games"));
    template('about', () => view("pages/about.htm", "About Me"));
    template('contact', () => view("pages/contact.htm", "Contact"));
    template('games-eaglercraft', () => view("pages/games/eaglercraft.htm", "Eaglercraft"));
    template('games-super-mario-sixty-four', () => view("pages/games/super-mario-sixty-four.htm", "Super Mario 64"));
    // Define routes here
    route('/', 'home');
    route('/games', 'games');
    route('/about', 'about');
    route('/contact', 'contact');
    route('/games/eaglercraft', 'games-eaglercraft');
    route('/games/super-mario-sixty-four', 'games-super-mario-sixty-four');
}
initRoutes();
// Add event listeners
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
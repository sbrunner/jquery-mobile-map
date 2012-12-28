({
    appDir: "../",
    baseUrl: "scripts/",
    dir: "../../app-build",
//    optimize: "none",

    paths: {
        "jquery": "../../jquery-mobile/js/jquery",
        "jquery-mobile": '../../jquery-mobile/js',
        "text": "../../jquery-mobile/js/text",
        "depend": "../../jquery-mobile/js/depend",
        "jquery-layout": '../../jquery.layout-latest',
        "openlayers": "../../openlayers/build/OpenLayers",
        "backbone": "../../backbone/backbone",
        "underscore": "../../underscore/underscore",
        "mapquery": "../../mapquery/src"
    },

    modules: [
        {
            name: "main"
        }
    ]
})

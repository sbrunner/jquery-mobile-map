({
    appDir: "../",
    baseUrl: "scripts/",
    dir: "../../app-build",
//    optimize: "none",

    paths: {
        "app": ".",
        "jquery": "../../jquery-mobile/js/jquery",
        "jquery-ui": '../../jquery-ui/ui',
        "jquery-mobile": '../../jquery-mobile/js',
        "text": "../../jquery-mobile/js/text",
        "depend": "../../jquery-mobile/js/depend",
        "jqgrid": '../../jqGrid/js',
        "jquery-layout": '../../jquery.layout-latest',
        "openlayers": "../../openlayers/build/OpenLayers",
        "backbone": "../../backbone/backbone",
        "underscore": "../../underscore/underscore",
        "datatables": "../../DataTables/media/js/jquery.dataTables",
        "mapquery": "../../mapquery/src"
    },

    shim: {
        'underscore': {
            exports: "_"
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'mapquery': {
            deps: ['openlayers', 'jquery']
        },
        'datatables': {
            deps: ['openlayers', 'jquery']
        },
        
        'app/jqgrid.compat': { deps: ['jquery', ] },
        'jqgrid/grid.base': { deps: ['app/jqgrid.compat', ] },
        'jqgrid/grid.common': { deps: ['jquery', 'jqgrid/grid.formedit'] },
        'jqgrid/grid.jqueryui': { deps: ['jqgrid/grid.common', 'jqgrid/grid.base'] },
        'jqgrid/grid.formedit': { deps: ['jqgrid/JsonXml', 'jqgrid/grid.base'] },
        'jqgrid/grid.inlinedit': { deps: ['jqgrid/grid.jqueryui'] },
        'jqgrid/grid.celledit': { deps: ['jqgrid/grid.jqueryui'] },
        'jqgrid/grid.subgrid': { deps: ['jqgrid/grid.jqueryui'] },
        'jqgrid/grid.treegrid': { deps: ['jqgrid/grid.jqueryui'] },
        'jqgrid/grid.grouping': { deps: ['jqgrid/grid.jqueryui'] },
        'jqgrid/grid.custom': { deps: ['jqgrid/grid.jqueryui'] },
        'jqgrid/grid.tbltogrid': { deps: ['jqgrid/grid.jqueryui'] },
        'jqgrid/grid.import': { deps: ['jqgrid/grid.jqueryui', 'jqgrid/JsonXml'] },
        'jqgrid/jquery.fmatter': { deps: ['jqgrid/grid.jqueryui'] },
        'jqgrid/grid.filter': { deps: ['jqgrid/grid.jqueryui'] }
    },

    modules: [
        {
            name: "main"
        }
    ]
})

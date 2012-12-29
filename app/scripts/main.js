
require.config({
    baseUrl: ".",
    packages: [
        'app'
    ],
    paths: {
        "jquery": "../jquery-mobile/js/jquery",
        "jquery-mobile": '../jquery-mobile/js',
        "text": "../jquery-mobile/js/text",
        "depend": "../jquery-mobile/js/depend",
        "jquery-layout": '../jquery.layout-latest',
        "openlayers": "../openlayers/build/OpenLayers",
        "backbone": "../backbone/backbone",
        "underscore": "../underscore/underscore",
        "mapquery": "../mapquery/src"
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
            deps: ['openlayers', 'jquery'],
            exports: 'mapquery'
        }
    }
});

require([
    "jquery",
    "jquery-mobile/jquery.mobile.init", // to parse the HTML
    "jquery-mobile/widgets/page.sections", // for pages (HTML)
    "jquery-mobile/widgets/listview", // HTML
    "jquery-mobile/widgets/controlgroup",
    "jquery-mobile/widgets/popup",
    "jquery-mobile/widgets/forms/button",
    "jquery-layout",
    "openlayers",
    "mapquery/jquery.mapquery.core"
], function($) {
    $.extend($.mobile, {
        defaultPageTransition: "none",
        autoInitializePage: false,
        linkBindingEnabled: false,
        hashListeningEnabled: false
    });

    $(function() {

        if ($('body').width() < 800) {
            $('.small-hide').hide();
        }
        else {
            layout = $('body').layout({
                'defaults': {
                    resizable: true,
                    spacing_open: 4,
                    spacing_closed: 4
                },
                west: {
                    size: 300,
                    minSize: 200,
                    maxSize: 500
                },
                east: {
                    initHidden: true
                },
                north: {
                    size: 130,
                    resizable: false,
                    closable: false,
                    spacing_open: 0
                }
            });
        }
        $.mobile.initializePage();

        var nav = $('<div></div>');

        $('<button>About us</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            $.mobile.changePage("#aboutus", { changeHash: false });
        });

        $('<button>About SV</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            $.mobile.changePage('#aboutsv', { changeHash: false });
        });

        $('<button>Main</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            $.mobile.changePage("#main", { changeHash: false });
        });

        if ($('body').width() < 800) {
            $('<button>Map</button>')
            .appendTo(nav)
            .button({
            })
            .on('click', function() {
                $.mobile.changePage("#map2-page", { changeHash: false });
/*                $('#map2').mapQuery({
                    layers: [{
                        type: 'osm'
                    }],
                    theme: null,
                    center: { position: [6.5, 46.5], zoom: 10 }
                });*/
            });
        }

        $('<button>Tost</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            // TODO
        });

        $('<button>Perm tost</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            // TODO
        });


        if ($('body').width() >= 800) {
            $('<button>One</button>')
            .appendTo(nav)
            .button({
            })
            .on('click', function() {
                layout.show('east');
                $('.ui-layout-east > *').each(function (index, elem) {
                    elem.style.display = 'none';
                });
                $('.ui-layout-east #one')[0].style.display = 'inline-block';
            });

            $('<button>Two</button>')
            .appendTo(nav)
            .button({
            })
            .on('click', function() {
                layout.show('east');
                $('.ui-layout-east > *').each(function (index, elem) {
                    elem.style.display = 'none';
                });
                $('.ui-layout-east #two')[0].style.display = 'inline-block';
            });
        }

        if ($('body').width() < 800) {
            var popup = $('<div id="popupMenu">')
            nav.appendTo(popup)
            .controlgroup({
            });
            popup.appendTo($('body'))
            .popup();
            // onpagecreate ...
            $('<button data-icon="arrow-d" class="ui-btn-right">Menu</button>')
            .appendTo($('#page > div > [data-role=header]'))
            .button({
            })
            .on('click', function() {
                $("#popupMenu").popup("open");
            });
        }
        else {
            nav.appendTo($('#nav'))
            .controlgroup({
                type: 'horizontal',
                mini: true
            });
        }

        if ($('body').width() < 800) {
            $.mobile.changePage("#map2-page", { changeHash: false });
        }
        else {
//            $.mobile.changePage("#main", { changeHash: false });
        }
                
        var map = $($('body').width() < 800 ? '#map2' : '#map').mapQuery({
            layers: [{
                type: 'osm'
            }],
            theme: null,
            center: { position: [6.5, 46.5], zoom: 10 }
        })
        .data('mapQuery');
    });
});

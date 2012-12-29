
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
    "jquery-mobile/transitions/slideup",
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
            });
        }

        $('<div id="toast"></div>')
        .appendTo($('body'))
        .popup({
            corners: false,
            theme: 'none',
            shadow: false,
            tolerance: '0,0'
        });
        var timer = null;
        $('<button>Tost</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            $('#toast').html('My popup');
            if (timer) {
                clearTimeout(timer);
            }
            else {
                $('#toast').popup('open', {
                    transition: "slideup",
                    positionTo: "window"
                });
                $('#toast-screen').removeClass('in');
                $('#toast-screen').addClass('ui-screen-hidden');
            }
            timer = setTimeout(function () {
                $('#toast').popup('close');
                timer = null;
            }, 3000);
        });

        $('<button>Perm tost</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            $('#toast').html('My segond popup');
            $('#toast').popup('open', {
                transition: "slideup",
                positionTo: "window"
            });
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
            $('<div id="popupMenu">')
            nav.appendTo(popup)
            .controlgroup({
            })
            .appendTo($('body'))
            .popup();
            // onpagecreate ...
            $('<button data-icon="arrow-d" class="ui-btn-right">Menu</button>')
            .appendTo($('#page > div > [data-role=header]'))
            .button({
            })
            .on('click', function() {
                $("#popupMenu").popup("open", {
                    x: $('body').width(),
                    y: $('body').height()
                });
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

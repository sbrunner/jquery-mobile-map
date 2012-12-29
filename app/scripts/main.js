
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
    "jquery-mobile/widgets/page.sections", // HTML, for pages
    "jquery-mobile/widgets/listview", // HTML
    "jquery-mobile/widgets/table",
//    "jquery-mobile/widgets/table.reflow", // acctually unusable :(
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

    $.mobile.table.prototype.options.mode = "reflow";
    $.mobile.table.prototype.options.classes = $.extend(
        $.mobile.table.prototype.options.classes,
        {
            reflowTable: "ui-table-reflow",
            cellLabels: "ui-table-cell-label"
        }
    );
    function reflow($table) {
        var self = $table.data("mobile-table"),
            o = self.options;

        // If it's not reflow mode, return here.
        if (o.mode !== "reflow") {
            return;
        }

        self.element.addClass(o.classes.reflowTable);

        // get headers in reverse order so that top-level headers are appended last
        var reverseHeaders =  $(self.allHeaders.get().reverse());

        // create the hide/show toggles
        reverseHeaders.each(function(i) {
            var $cells = $(this).jqmData("cells"),
                colstart = $(this).jqmData("colstart"),
                hierarchyClass = $cells.not($table).filter("thead th").length && " ui-table-cell-label-top",
                text = $(this).text();

            if (text !== "") {
                if (hierarchyClass) {
                    var iteration = parseInt($(this).attr("colspan"), 10),
                        filter = "";

                    if (iteration){
                        filter = "td:nth-child("+ iteration +"n + " + (colstart) +")";
                    }
                    $cells.filter(filter).prepend("<b class='" + o.classes.cellLabels + hierarchyClass + "'>" + text + "</b>" );
                }
                else {
                    $cells.prepend("<b class='" + o.classes.cellLabels + "'>" + text + "</b>" );
                }

            }
        });
    }

    $(function() {
        var smallScreen = $('body').width() < 800;

        if (smallScreen) {
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
                south: {
                    initHidden: true,
                    size: 200,
                    minSize: 100,
                    maxSize: 300
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

        if (smallScreen) {
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


        if (!smallScreen) {
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
        $('<button>Table</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            var table = $(
                '<table class="ui-responsive">' +
                '  <thead>' +
                '    <tr>' +
                '      <th data-priority="1">Rank</th>' +
                '      <th style="width:40%">Movie Title</th>' +
                '      <th data-priority="2">Year</th>' +
                '      <th data-priority="3"><abbr title="Rotten Tomato Rating">Rating</abbr></th>' +
                '      <th data-priority="4">Reviews</th>' +
                '      <th data-priority="4">Director</th>' +
                '    </tr>' +
                '  </thead>' +
                '  <tbody>' +
                '    <tr>' +
                '      <th>1</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/Citizen_Kane" data-rel="external">Citizen Kane</a></td>' +
                '      <td>1941</td>' +
                '      <td>100%</td>' +
                '      <td>74</td>' +
                '      <td>Orson Welles</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>2</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/Casablanca_(film)" data-rel="external">Casablanca</a></td>' +
                '      <td>1942</td>' +
                '      <td>97%</td>' +
                '      <td>64</td>' +
                '      <td>Michael Curtiz</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>3</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/The_Godfather" data-rel="external">The Godfather</a></td>' +
                '      <td>1972</td>' +
                '      <td>97%</td>' +
                '      <td>87</td>' +
                '      <td>Francis Ford Coppola</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>4</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)" data-rel="external">Gone with the Wind</a></td>' +
                '      <td>1939</td>' +
                '      <td>96%</td>' +
                '      <td>87</td>' +
                '      <td>Victor Fleming</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>5</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)" data-rel="external">Lawrence of Arabia</a></td>' +
                '      <td>1962</td>' +
                '      <td>94%</td>' +
                '      <td>87</td>' +
                '      <td>Sir David Lean</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>6</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/Dr._Strangelove" data-rel="external">Dr. Strangelove Or How I Learned to Stop Worrying and Love the Bomb</a></td>' +
                '      <td>1964</td>' +
                '      <td>92%</td>' +
                '      <td>74</td>' +
                '      <td>Stanley Kubrick</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>7</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/The_Graduate" data-rel="external">The Graduate</a></td>' +
                '      <td>1967</td>' +
                '      <td>91%</td>' +
                '      <td>122</td>' +
                '      <td>Mike Nichols</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>8</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)" data-rel="external">The Wizard of Oz</a></td>' +
                '      <td>1939</td>' +
                '      <td>90%</td>' +
                '      <td>72</td>' +
                '      <td>Victor Fleming</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>9</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/Singin%27_in_the_Rain" data-rel="external">Singin\' in the Rain</a></td>' +
                '      <td>1952</td>' +
                '      <td>89%</td>' +
                '      <td>85</td>' +
                '      <td>Stanley Donen, Gene Kelly</td>' +
                '    </tr>' +
                '    <tr>' +
                '      <th>10</th>' +
                '      <td class="title"><a href="http://en.wikipedia.org/wiki/Inception" data-rel="external">Inception</a></td>' +
                '      <td>2010</td>' +
                '      <td>84%</td>' +
                '      <td>78</td>' +
                '      <td>Christopher Nolan</td>' +
                '    </tr>' +
                '  </tbody>' +
                '</table>')
            .table();
            table.reflow = reflow;
            table.reflow(table);
            if (smallScreen) {
                var page = $('#free'),
                    title = page.children(":jqmData(role=header) h1"),
                    content = page.children(":jqmData(role=content)");
                title.html('Results');
                content.html('');
                table.appendTo(content);
                $.mobile.changePage(page, { changeHash: false });
            }
            else {
                table.appendTo($('#south'))
                layout.show('south');
            }
        });

        if (smallScreen) {
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

        if (smallScreen) {
            $.mobile.changePage("#map2-page", { changeHash: false });
        }
        else {
//            $.mobile.changePage("#main", { changeHash: false });
        }

        var map = $(smallScreen ? '#map2' : '#map').mapQuery({
            layers: [{
                type: 'osm'
            }],
            theme: null,
            center: { position: [6.5, 46.5], zoom: 10 }
        })
        .data('mapQuery');
    });
});

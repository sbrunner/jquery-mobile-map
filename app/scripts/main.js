
require.config({
    baseUrl: ".",
    packages: [
        'app'
    ],
    paths: {
        "app": "scripts",
        "jquery": "../jquery-mobile/js/jquery",
        "jquery-mobile": '../jquery-mobile/js',
        "jquery-ui": '../jquery-ui/ui',
        "text": "../jquery-mobile/js/text",
        "depend": "../jquery-mobile/js/depend",
        "jquery-layout": '../jquery.layout-latest',
        "jqgrid": '../jqGrid/js',
        "openlayers": "../openlayers/build/OpenLayers",
        "backbone": "../backbone/backbone",
        "underscore": "../underscore/underscore",
        "datatables": "../DataTables/media/js/jquery.dataTables",
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
            deps: ['openlayers', 'jquery']
        },
        'datatables': {
            deps: ['openlayers', 'jquery']
        },
        
        'app/jqgrid.compat': { deps: ['jquery', ] },
        'jqgrid/grid.base': { deps: ['app/jqgrid.compat', ] },
        'jqgrid/grid.common': { deps: ['jquery', 'jqgrid/grid.formedit'] },
        'jqgrid/grid.jqueryui': { deps: ['jqgrid/grid.common', 'jqgrid/grid.base'] },
        'jqgrid/grid.import': { deps: ['jqgrid/grid.jqueryui'] },
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
    "mapquery/jquery.mapquery.core",
    "jqgrid/i18n/grid.locale-en",
    "jqgrid/grid.inlinedit",
    "jqgrid/grid.filter",
    "datatables"
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

        $('<div id="tost"></div>')
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
            $('#tost').html('My popup');
            if (timer) {
                clearTimeout(timer);
            }
            else {
                $('#tost').popup('open', {
                    transition: "slideup",
                    positionTo: "window"
                });
                $('#tost-screen').removeClass('in');
                $('#tost-screen').addClass('ui-screen-hidden');
            }
            timer = setTimeout(function () {
                $('#tost').popup('close');
                timer = null;
            }, 3000);
        });

        $('<button>Perm tost</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            $('#tost').html('My segond popup');
            $('#tost').popup('open', {
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
                $('#south').html('');
                table.appendTo($('#south'))
                layout.show('south');
            }
        });

        $('<button>DT</button>')
        .appendTo(nav)
        .button({
        })
        .on('click', function() {
            $('#south').html('');
            var grid = $('<table cellpadding="0" cellspacing="0" border="0" class="display"></table>');
            grid.dataTable({
                "aaData": [
                    [ "Trident", "Internet Explorer 4.0", "Win 95+", 4, "X" ],
                    [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C" ],
                    [ "Trident", "Internet Explorer 5.5", "Win 95+", 5.5, "A" ],
                    [ "Trident", "Internet Explorer 6.0", "Win 98+", 6, "A" ],
                    [ "Trident", "Internet Explorer 7.0", "Win XP SP2+", 7, "A" ],
                    [ "Gecko", "Firefox 1.5", "Win 98+ / OSX.2+", 1.8, "A" ],
                    [ "Gecko", "Firefox 2", "Win 98+ / OSX.2+", 1.8, "A" ],
                    [ "Gecko", "Firefox 3", "Win 2k+ / OSX.3+", 1.9, "A" ],
                    [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ],
                    [ "Webkit", "Safari 1.3", "OSX.3", 312.8, "A" ],
                    [ "Webkit", "Safari 2.0", "OSX.4+", 419.3, "A" ],
                    [ "Webkit", "Safari 3.0", "OSX.4+", 522.1, "A" ]
                ],
                "aoColumns": [
                    { "sTitle": "Engine" },
                    { "sTitle": "Browser" },
                    { "sTitle": "Platform" },
                    { "sTitle": "Version", "sClass": "center" },
                    {
                        "sTitle": "Grade",
                        "sClass": "center",
                        "fnRender": function(obj) {
                            var sReturn = obj.aData[obj.iDataColumn];
                            if (sReturn == "A") {
                                sReturn = "<b>A</b>";
                            }
                            return sReturn;
                        }
                    }
                ]
            })
            .appendTo($('#south'));
            layout.show('south');
        });

        if (!smallScreen) {
            $('<button>Edit</button>')
            .appendTo(nav)
            .button({
            })
            .on('click', function() {
                var grid = $('<table id="rowed2"></table>');
                $('#south').html('');
                grid.appendTo($('#south'));
                $('<div id="prowed2"></div>').appendTo($('#south'));
                grid.jqGrid({
                    datatype: "local",
                    colNames:['Inv No', 'Date', 'Client', 'Amount', 'Tax', 'Total', 'Notes'],
                    colModel:[
                        {name: 'id', index: 'id', width: 55},
                        {name: 'invdate', index:'invdate', width: 90, editable:true},
                        {name: 'name', index:'name', width: 100, editable:true},
                        {name: 'amount', index:'amount', width: 80, align: "right", editable:true},
                        {name: 'tax', index:'tax', width: 80, align: "right", editable:true},
                        {name: 'total', index:'total', width: 80,align: "right", editable:true},
                        {name: 'note', index:'note', width: 150, sortable: false, editable:true}
                    ],
                    sortname: 'id',
                    viewrecords: true,
                    sortorder: "desc",
                    pager: '#prowed2',
                    height: "100%",
                    width: "100%",
                    multiselect: true,
                });
                grid.jqGrid('navGrid', "#prowed2", {edit:false, add:false, del:false});
                grid.jqGrid('inlineNav',"#prowed2");
                var mydata = [
                    {id:"1",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"2",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"3",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
                    {id:"4",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"5",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"6",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
                    {id:"7",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"8",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"9",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}
                ];
                for (var i=0; i<=mydata.length; i++) {
                    grid.jqGrid('addRowData', i+1, mydata[i]);
                }
                layout.show('south');
            });
        }

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

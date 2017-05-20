class MapController {

    constructor(divMapContainer) {
        this._divMapContainer = divMapContainer;
    }

    renderMap() {
        var settings = {
            container: $(this._divMapContainer),
            map : 'brazil_br',
            backgroundColor: '#1a1a1a',
            normalizeFunction: 'polynomial',
            showTooltip: false,
            zoomButtons : false,
            regionStyle: {
                initial : {
                    fill : '#555555',
                    "stroke" : '#a0a0a0',
                    "stroke-width": '0.5px',
                    "stroke-opacity": 1
                }
            },
            showLabels: true,
            markers: []
        };

        this._map = new jvm.Map(settings);
        $('*[for="sc"]').css('margin-top', '-15px').css('margin-left', '-10px');
        $('*[for="rj"]').css('margin-top', '-5px');
        $('*[for="rs"]').css('margin-top', '-10px');
        $('*[for="pi"]').css('margin-left', '-10px');
    }

    get map() {
        return this._map;
    }
}
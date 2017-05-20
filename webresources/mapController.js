class MapController {

    constructor(divMapContainer) {
        this._divMapContainer = divMapContainer;
    }

    renderMap() {
        var settings = {
            map : 'brazil_br',
            backgroundColor: '#1a1a1a',
            normalizeFunction: 'linear',
            showTooltip: false,
            borderWidth: 0.5,
            borderOpacity: 1,
            borderColor: 'white',
            color: '#444444',
            hoverColor: '#888888',
            selectedColor: '#00ffd1',
            showLabels: true,
            onRegionClick: function (element, code, region) {
                console.log(region,code.toUpperCase());
            },
        };
        $('#' + this._divMapContainer).vectorMap(settings);
        $('*[for="sc"]').css('margin-top', '-15px').css('margin-left', '-10px');
        $('*[for="rj"]').css('margin-top', '-5px');
        $('*[for="rs"]').css('margin-top', '-10px');
        $('*[for="pi"]').css('margin-left', '-10px');
    }
}
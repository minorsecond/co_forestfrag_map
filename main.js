import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerGroup from 'ol/layer/Group'
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS'
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Attribution from "ol/control/Attribution";

import LayerSwitcher, {GroupLayerOptions} from 'ol-layerswitcher';
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import {bbox as bboxStrategy} from "ol/loadingstrategy";

const OSMLayer = new TileLayer({
    source: new OSM(),
    visible: 'true',
    displayInLayerSwitcher: false
})

const LCMosaicSource = new TileWMS({
    attributions: "| Robert Ross Wardrup | www.rwardrup.com",
    url: 'https://geo.spatstats.com/geoserver/CO_ForestFrag/wms',
    params: {'LAYERS': 'CO_ForestFrag:CO_NLCD',
        'TILED': true,
        'VERSION': '1.3.0',
    }
})

const W3MosaicSource = new TileWMS({
    attributions: "| Robert Ross Wardrup | www.rwardrup.com",
    url: 'https://geo.spatstats.com/geoserver/CO_ForestFrag/wms',
    params: {'LAYERS': 'CO_ForestFrag:COForestFragW3',
        'TILED': true,
        'VERSION': '1.3.0',
    }
})

const InteriorChangeSource = new TileWMS({
    attributions: "| Robert Ross Wardrup | www.rwardrup.com",
    url: 'https://geo.spatstats.com/geoserver/CO_ForestFrag/wms',
    params: {'LAYERS': 'CO_ForestFrag:ForestFragStats',
        'TILED': true,
        'VERSION': '1.3.0',
    }
})

let layerSwitcher = new LayerSwitcher({
    reverse: true,
    groupSelectStyle: 'group'
})

const LCMosaicMap = new TileLayer({
    type: 'base',
    title: 'Colorado Land Cover',
    attribution: "Robert Ross Wardrup",
    visible: false,
    source: LCMosaicSource,
})

const W3MosaicMap = new TileLayer({
    type: 'base',
    title: 'Forest Fragmentation',
    attribution: "Robert Ross Wardrup",
    visible: true,
    source: W3MosaicSource,
})

const InteriorChangeMap = new TileLayer({
    title: 'Forest Interior Change',
    opacity: .75,
    visible: true,
    source: InteriorChangeSource
});

const LCMaps = new LayerGroup({
    title: "Land Cover",
    layers: [LCMosaicMap, W3MosaicMap]
})

const map = new Map({
    target: 'map',
    layers: [OSMLayer, LCMaps, InteriorChangeMap],
    view: new View({
        center: [-11754222,4728294],
        zoom: 7,
    })
});

map.setView(new View({
    center: map.getView().getCenter(),
    extent: map.getView().calculateExtent(map.getSize()),
    zoom: 7
}))

map.addControl(layerSwitcher);

LayerSwitcher.forEachRecursive(map, function (l, idx, a) {
    console.log(l);
    // Determine if layer is visible and, if so, make the slider point to it (if it's a forestfrag object)
})

function displayLegend(layer_name) {
    // Display legend depending on layer
    if (layer_name === "Forest Fragmentation") {
        document.getElementById('map-legend').innerHTML =
            "<table class=\"styled-legend\">\n" +
            "    <thead>\n" +
            "      <tr><th colspan='3' class='table-title'>Legend</th></tr>" +
            "        <tr>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "        </tr>" +
            "    </thead>\n" +
            "    <tbody>\n" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='patch_square'</td>\n" +
            "            <td>Patch</td>" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='transitional_square'></td>\n" +
            "            <td>Transitional</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='edge_square'</td>\n" +
            "            <td>Edge</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='perforated_square'</td>\n" +
            "            <td>Perforated</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='interior_square'</td>\n" +
            "            <td>Interior</td>\n" +
            "            <td></td>" +
            "        </tr>" +
        "        </tr>\n" +
        "    </tbody>\n" +
        "</table>"
    }

    else if (layer_name === "Colorado Land Cover") {
        document.getElementById('map-legend').innerHTML =
            "<table class=\"styled-legend\">\n" +
            "    <thead>\n" +
            "      <tr><th colspan='3' class='table-title'>Legend</th></tr>" +
            "        <tr>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "        </tr>" +
            "    </thead>\n" +
            "    <tbody>\n" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='open_water_square'</td>\n" +
            "            <td>Open Water</td>" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='ice_snow_square'></td>\n" +
            "            <td>Perennial Ice/Snow</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='dev_open_space_square'</td>\n" +
            "            <td>Developed, Open Space</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='dev_low_intensity_square'</td>\n" +
            "            <td>Developed, Low Intensity</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='dev_med_intensity_square'</td>\n" +
            "            <td>Developed, Medium Intensity</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='dev_hi_intensity_square'</td>\n" +
            "            <td>Developed, High Intensity</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='barren_land_square'</td>\n" +
            "            <td>Barren Land (Rock/Sand/Clay)</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='decid_forest_square'</td>\n" +
            "            <td>Deciduous Forest</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='evergreen_forest_square'</td>\n" +
            "            <td>Evergreen Forest</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='mix_forest_square'</td>\n" +
            "            <td>Mixed Forest</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='shrub_scrub_square'</td>\n" +
            "            <td>Shrub/Scrub</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='grass_herb_square'</td>\n" +
            "            <td>Grassland/Herbaceous</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='pasture_hay_square'</td>\n" +
            "            <td>Pasture/Hay</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='crops_square'</td>\n" +
            "            <td>Cultivated Crops</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='woody_wetlands_square'</td>\n" +
            "            <td>Woody Wetlands</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='emer_herb_wetlands_square'</td>\n" +
            "            <td>Emergent Herbaceous Wetlands</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        </tr>\n" +
            "    </tbody>\n" +
            "</table>"
    }
    if (layer_name === "Forest Interior Change") {
        console.log("Ran this");
        document.getElementById('map-legend_right').innerHTML =
            "<table class=\"styled-legend\">\n" +
            "    <thead>\n" +
            "      <tr><th colspan='3' class='table-title'>Forest Interior Change: 2001-2016</th></tr>" +
            "        <tr>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "        </tr>" +
            "    </thead>\n" +
            "    <tbody>\n" +
            "        <tr class=\"active-row\">\n" +
            "            <td style='display: block; text-align: center; margin: 0 auto;' ><span id='x' class='lowest_ff_change_class'>XX</span></td>\n" +
            "            <td>-0.8% - -0.4%</td>" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td style='display: block; text-align: center; margin: 0 auto;' ><span id='x' class='second_lowest_ff_change_class'>XX</span></td>\n" +
            "            <td>-0.4% - -0.08%</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td style='display: block; text-align: center; margin: 0 auto;' ><span id='x' class='middle_ff_change_class'>XX</span></td>\n" +
            "            <td>-0.08% - 0.05%</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td style='display: block; text-align: center; margin: 0 auto;' ><span id='x' class='second_highest_ff_change_class'>XX</span></td>\n" +
            "            <td>0.05% - 1.72%</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td style='display: block; text-align: center; margin: 0 auto;' ><span id='x' class='highest_ff_change_class'>XX</span></td>\n" +
            "            <td>1.72% - 3.58%</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        </tr>\n" +
            "    </tbody>\n" +
            "</table>"
    }

}

window.onload = function () {
    displayLegend('Forest Interior Change');
    displayLegend("Forest Fragmentation");
    LayerSwitcher.forEachRecursive(map, function (l, idx, a) {
        l.on("change:visible", function (e) {
            const lyrName = e.target.get('title');
            const lyrVisible = e.target.getVisible();

            console.log(lyrName);

            if (lyrVisible === true && lyrName !== 'Forest Interior Change') {
                document.getElementById("map-legend").innerHTML = "";
                console.log(lyrName, lyrVisible);
                displayLegend(lyrName);
            } else if (lyrVisible === true && lyrName === 'Forest Interior Change') {
                displayLegend(lyrName);
            } else if (lyrVisible === false && lyrName === 'Forest Interior Change') {
                document.getElementById("map-legend_right").innerHTML = "";
            }
        })
    })
    const dates = ['2001-01-01T00:00:00.000Z', '2004-01-01T00:00:00.000Z', '2006-01-01T00:00:00.000Z',
        '2008-01-01T00:00:00.000Z', '2011-01-01T00:00:00.000Z', '2013-01-01T00:00:00.000Z', '2016-01-01T00:00:00.000Z']
    const sliderRange = document.getElementById('yearRange');
    sliderRange.max = dates.length - 1;
    sliderRange.value="6";

    const dateValue = document.getElementById('date_value');
    dateValue.innerHTML = dates[sliderRange.value].slice(0, 10).substring(0,4)
    W3MosaicMap.getSource().updateParams({'TIME': dates[this.value]});
    LCMosaicMap.getSource().updateParams({'TIME': dates[this.value]});

    sliderRange.oninput = function () {
        dateValue.innerHTML = dates[sliderRange.value].slice(0, 10).substring(0,4)
        console.log(dates[this.value].slice(0, 10));
        W3MosaicMap.getSource().updateParams({'TIME': dates[this.value]});
        LCMosaicMap.getSource().updateParams({'TIME': dates[this.value]});
    }
}

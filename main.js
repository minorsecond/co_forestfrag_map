import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerGroup from 'ol/layer/Group'
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import TileWMS from 'ol/source/TileWMS'
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy'
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Style, Circle, Fill, Stroke} from 'ol/style';

import LayerSwitcher, {GroupLayerOptions} from 'ol-layerswitcher';

const OSMLayer = new TileLayer({
    source: new OSM(),
    type: 'base',
    visible: 'true'
})

const LC2001Source = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:CO_LC_2001_LG',
        'TILED': true,
        'VERSION': '1.1.1',
    },
    serverType: 'geoserver',
    ratio: 1
})

const LC2004Source = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:co_nlcd_land_cover_2004_pyr',
        'TILED': true,
        'VERSION': '1.1.1',
    },
    serverType: 'geoserver',
    ratio: 1
})

const LC2006Source = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:co_nlcd_land_cover_2006_pyr',
        'TILED': true,
        'VERSION': '1.1.1',
    },
    serverType: 'geoserver',
    ratio: 1
})

const LC2008Source = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:co_nlcd_land_cover_2008_pyr',
        'TILED': true,
        'VERSION': '1.1.1',
    },
    serverType: 'geoserver',
    ratio: 1
})

const LC2011Source = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:co_nlcd_land_cover_2011_pyr',
        'TILED': true,
        'VERSION': '1.1.1',
    },
    serverType: 'geoserver',
    ratio: 1
})

const LC2013Source = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:co_nlcd_land_cover_2013_pyr',
        'TILED': true,
        'VERSION': '1.1.1',
    },
    serverType: 'geoserver',
    ratio: 1
})

const LC2016Source = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:co_nlcd_land_cover_2016_pyr',
        'TILED': true,
        'VERSION': '1.1.1',
    },
    serverType: 'geoserver',
    ratio: 1
})


let layerSwitcher = new LayerSwitcher({
    reverse: true,
    groupSelectStyle: 'group'
})

const LC2001Map = new TileLayer({
    title: 'Colorado 2001 Land Cover',
    visible: false,
    source: LC2001Source,
})

const LC2004Map = new TileLayer({
    title: 'Colorado 2004 Land Cover',
    visible: false,
    source: LC2004Source,
})

const LC2006Map = new TileLayer({
    title: 'Colorado 2006 Land Cover',
    visible: false,
    source: LC2006Source,
})

const LC2008Map = new TileLayer({
    title: 'Colorado 2008 Land Cover',
    visible: false,
    source: LC2008Source,
})

const LC2011Map = new TileLayer({
    title: 'Colorado 2011 Land Cover',
    visible: false,
    source: LC2011Source,
})

const LC2013Map = new TileLayer({
    title: 'Colorado 2013 Land Cover',
    visible: false,
    source: LC2013Source,
})

const LC2016Map = new TileLayer({
    title: 'Colorado 2016 Land Cover',
    visible: true,
    source: LC2016Source,
})

const LCMaps = new LayerGroup({
    title: "Land Cover",
    layers: [LC2001Map, LC2004Map, LC2006Map, LC2008Map, LC2011Map, LC2013Map, LC2016Map]
})

const map = new Map({
    target: 'map',
    layers: [OSMLayer, LCMaps],
    view: new View({
        center: [-11754222,4728294],
        zoom: 8,
    })
});

map.setView(new View({
    center: map.getView().getCenter(),
    extent: map.getView().calculateExtent(map.getSize()),
    zoom: 8
}))

map.addControl(layerSwitcher);
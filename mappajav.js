// Posizione iniziale della mappa
	var lat=44.355;
	var lon=11.71;

	var lat1= 46.432;
	var lon1= 10.82;

	var zoom=13;
	var map;

function init() {
// The overlay layer for our marker, with a simple diamond as symbol	BOOOOOOOO
   	var overlay = new OpenLayers.Layer.Vector('Overlay', {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: '../img/marker.png',
            graphicWidth: 20, graphicHeight: 24, graphicYOffset: -24,
            title: '${tooltip}'
        })
    });

// The location of our marker and popup. We usually think in geographic
// coordinates ('EPSG:4326'), but the map is projected ('EPSG:3857').	NON SO BENE

	var myLocation = new OpenLayers.Geometry.Point(lon, lat)
	.transform('EPSG:4326', 'EPSG:3857');
	
	var myLocation1 = new OpenLayers.Geometry.Point(lon1, lat1)	// N.2
	.transform('EPSG:4326', 'EPSG:3857');
	
// We add the marker with a tooltip text to the overlay		NEANCHE QUESTO

	overlay.addFeatures([
	new OpenLayers.Feature.Vector(myLocation, {tooltip: 'OpenLayers'})
    	]);

	overlay.addFeatures([
	new OpenLayers.Feature.Vector(myLocation1, {tooltip: 'OpenLayers'})	// N.2
  	]);

// A popup with some information about our location	VOTO DIESCI

	var popup = new OpenLayers.Popup.FramedCloud("Popup", 
	myLocation.getBounds().getCenterLonLat(), null,
	'We could be here.<br>Or elsewhere.', null,
	true // <-- true if we want a close (X) button, false otherwise
	);

	var popup1 = new OpenLayers.Popup.FramedCloud("Popup",		// N.2
	myLocation1.getBounds().getCenterLonLat(), null,
	'We could be here.<br>Or elsewhere.', null,
	true // <-- true if we want a close (X) button, false otherwise
	);

// creazione mappa		SERVONO I FILTRI
		map = new OpenLayers.Map("map", {
			controls:[
				new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoomBar(),
				new OpenLayers.Control.ScaleLine(),
				new OpenLayers.Control.Permalink('permalink'),
				new OpenLayers.Control.MousePosition(),                    
				new OpenLayers.Control.Attribution()
					],
			maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
                	maxResolution: 156543.0399,
                	numZoomLevels: 19,
               		units: 'm',
            	projection: new OpenLayers.Projection("EPSG:900913"),
            	displayProjection: new OpenLayers.Projection("EPSG:4326")
            } );


// TRACK	// Define the map layer				
			// Here we use a predefined layer that will be kept up to date with URL changes
			layerMapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
			map.addLayer(layerMapnik);
			layerCycleMap = new OpenLayers.Layer.OSM.CycleMap("CycleMap");
			map.addLayer(layerCycleMap);
			layerMarkers = new OpenLayers.Layer.Markers("Markers");
			map.addLayer(layerMarkers);

			// Add the Layer with the GPX Track
			var lgpx = new OpenLayers.Layer.Vector("Descrizione del layer", {
				strategies: [new OpenLayers.Strategy.Fixed()],
				protocol: new OpenLayers.Protocol.HTTP({
					src: "www.site181943.tw.cs.unibo.it/traccia.gpx",
					format: new OpenLayers.Format.GPX()
				}),
				style: {strokeColor: "green", strokeWidth: 30, strokeOpacity: 1},
				projection: new OpenLayers.Projection("EPSG:4326")
			});
			map.addLayer(lgpx);

			var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
			map.setCenter(lonLat, zoom);

			var size = new OpenLayers.Size(21, 25);
			var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
			var icon = new OpenLayers.Icon('http://www.openstreetmap.org/openlayers/img/marker.png',size,offset);
			layerMarkers.addMarker(new OpenLayers.Marker(lonLat,icon));

// MARKER 2
	
			var lonLat1 = new OpenLayers.LonLat(lon1, lat1).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
			map.setCenter(lonLat1, zoom);
			var size1 = new OpenLayers.Size(21,25);
			var offset1 = new OpenLayers.Pixel(-(size.w/2), -size.h);
			var icon1= new OpenLayers.Icon('http://www.openstreetmap.org/openlayers/img/marker.png',size1,offset1);
			layerMarkers.addMarker(new OpenLayers.Marker(lonLat1,icon1));

// *MARKER 2

		map.addControl(new OpenLayers.Control.LayerSwitcher());

//	*TRACK

		map.addPopup(popup);	// AGGIUNGE POPUP, non so perchè funzia solo qua
		map.addPopup(popup1);	// N. 2

// POI's

var mapnik = new OpenLayers.Layer.OSM("OpenStreetMap (Mapnik)");
	map.addLayer(mapnik);
	var pois = new OpenLayers.Layer.Text(
		"My Points",
		{
			src:"www.site181943.tw.cs.unibo.it/textfile.txt",		// !!! in questo file vanno le informazioni per i punti di interesse
			projection: map.displayProjection
		}
	);
	map.addLayer(pois);
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	var lonLat = new OpenLayers.LonLat( lon ,lat ).transform(
		new OpenLayers.Projection("EPSG:4326"),  // transform from WGS 1984
		map.getProjectionObject()                // to Spherical Mercator Projection
	);
	map.setCenter (lonLat, zoom);

// *POI's

		}	// GRAFFA che chiude la funzione
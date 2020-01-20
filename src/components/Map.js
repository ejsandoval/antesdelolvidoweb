import React, { Fragment, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import css from './Map.css';
import svg from '../assets/Map.svg';
import map from '../assets/Map.jpg';
import mapboxgl from 'mapbox-gl';

let geojson = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.634394, -33.436933]
			},
			properties: {
				title: 'Plaza de la Dignidad',
				description: 'Plaza de la Dignidad',
				kind: 'Escultura/Monumento',
				url: 'www.link.to',
				gif: '../assets/PlazaDignididad_05012020.gif'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.634, -33.5]
			},
			properties: {
				title: 'Mapbox',
				description: 'YYY'
			}
		}
	]
};

export const Map = ({ className, variant, onClick, children, disabled }) => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiZWpzYW5kb3ZhbCIsImEiOiJjazVmb3JrZW8yZnplM2Vwb2Voa2ZzcW9rIn0.vdCKHnQ3ApBhX-M2-J-Iag';

	const mapContainer = useRef();
	const [zoom, setZoom] = useState(14.5);
	const [lng, setLng] = useState(-70.634);
	const [lat, setLat] = useState(-33.436);

	useEffect(() => {
		const mapbox = new mapboxgl.Map({
			container: mapContainer.current,
			center: [lng, lat],
			zoom: zoom,
			style: 'mapbox://styles/ejsandoval/ck5fot9ly0r881imf81gaabsm'
		});
		mapbox.on('move', () => {
			setZoom(mapbox.getZoom().toFixed(2));
			setLng(mapbox.getCenter().lng.toFixed(4));
			setLat(mapbox.getCenter().lat.toFixed(4));
		});
		// add markers to map
		geojson.features.forEach(function(marker) {
			// create a HTML element for each feature
			const el = document.createElement('div');
			el.className = css.marker;

			// make a marker for each feature and add to the map
			new mapboxgl.Marker(el)
				.setLngLat(marker.geometry.coordinates)
				.setPopup(
					new mapboxgl.Popup({ offset: 25 }) // add popups
						.setHTML(
							'<h1>' +
								marker.properties.title +
								'</h1><p>' +
								marker.properties.description +
								'</p><h3>' +
								`Tipo: ${marker.properties.kind}` +
								'</h3>'
						)
				)
				.addTo(mapbox);
		});
	}, []);

	const classes = classnames(css.root, { [className]: className, [css[variant]]: css[variant] });
	return (
		<Fragment>
			<div className={css.info}>
				Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
			</div>
			<div className={classes} onClick={onClick} disabled={disabled} ref={mapContainer}>
				{children}
			</div>
		</Fragment>
	);
};

export default Map;

Map.defaultProps = {
	onClick: () => {}
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/api';
import classnames from 'classnames';

import Map from '../components/Map';
import Uploader from '../components/Uploader';

import gif from '../assets/Monument.gif';

import css from './Home.css';

const points = [
	{ x: 30, y: 34, d: 40, kind: 'edificio', url: 'www.link.to', name: 'Lugar', gif: '../assets/Monument.gif' },
	{ x: 200, y: 500, d: 92, kind: 'parque', url: 'www.link.to', name: 'Otro lugar', gif: '../assets/Monument.gif' },
	{ x: 700, y: 330, d: 60, kind: 'edificio', url: 'www.link.to', name: 'Espacio', gif: '../assets/Monument.gif' },
	{ x: 1200, y: 80, d: 20, kind: 'volumen', url: 'www.link.to', name: 'Basura', gif: '../assets/Monument.gif' },
	{
		x: 150,
		y: 780,
		d: 30,
		kind: 'edificio',
		url: 'www.link.to',
		name: 'Edificio 123',
		gif: '../assets/Monument.gif'
	},
	{
		x: 720,
		y: 300,
		d: 150,
		kind: 'estatua',
		url: 'www.link.to',
		name: 'Plaza de la Dignidad',
		gif: '../assets/Monument.gif'
	},
	{
		x: 672,
		y: 549,
		d: 33,
		kind: 'edificio',
		url: 'www.link.to',
		name: 'Nuevo Edificio',
		gif: '../assets/Monument.gif'
	}
];

export default props => {
	const [data, loadData, status] = useApi('/get');
	const [hovered, setHovered] = useState(false);
	const [detail, setDetail] = useState();
	const [current, setCurrent] = useState();

	if (!status.loaded) {
		return <p>Loading ...</p>;
	}
	const hover = point => {
		const isVisible = current ? true : !hovered;
		let detailContent;
		if (current) {
			const { x, y, name, d, kind, url } = current;
			detailContent = (
				<div className={classnames(css.detailContainer, { [css.visible]: isVisible })}>
					<div className={css.gifWrapper}>
						<img className={css.gif} src={gif} />
					</div>
					<div className={css.textContainer}>
						<h2>{name}</h2>
						<h3>{`Tipo: ${kind}`}</h3>
						<h3>{`Posición: (${x}, ${y})`}</h3>
						<h3>{`Cantidad de datos: ${d}`}</h3>
						<Link to={url}>{`Descargar modelo`}</Link>
					</div>
				</div>
			);
		} else {
			const { x, y, name, d, kind, url } = point;
			console.log(gif);
			detailContent = (
				<div className={classnames(css.detailContainer, { [css.visible]: isVisible })}>
					<div className={css.gifWrapper}>
						<img className={css.gif} src={gif} />
					</div>
					<div className={css.textContainer}>
						<h2>{name}</h2>
						<h3>{`Tipo: ${kind}`}</h3>
						<h3>{`Posición: (${x}, ${y})`}</h3>
						<h3>{`Cantidad de datos: ${d}`}</h3>
						<Link to={url}>{`Descargar modelo`}</Link>
					</div>
				</div>
			);
		}
		setDetail(detailContent);
		setHovered(!hovered);
	};

	const clicked = point => {
		const prev = current;
		if (!prev) {
			console.log(point);
			setCurrent(point);
		}
		if (prev && prev.name !== point.name) {
			console.log(point);
			setCurrent(point);
		}
	};

	return (
		<div className={css.root}>
			<Link to={'/page'}>Go to /page</Link>
			<h1 className={css.title}>ANTES DEL OLVIDO</h1>
			{detail}
			<Map>
				{points.map(point => {
					const { x, y, d, kind, url } = point;
					const verde = '#5cff61',
						amarillo = '#fff940',
						cyan = '#5cffe4';
					const color = kind === 'edificio' ? amarillo : kind === 'parque' ? cyan : verde;
					return (
						<div
							className={css.circle}
							key={`${name}-${kind}-${x}-${y}`}
							style={{ width: d, height: d, left: x, top: y, background: color }}
							onMouseOver={() => hover(point)}
							onMouseOut={() => hover(point)}
							onClick={() => clicked(point)}></div>
					);
				})}
			</Map>
			<Uploader />
		</div>
	);
};

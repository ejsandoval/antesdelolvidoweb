import React, { Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';

import Select from './Select';
import Input from './Input';
import Button from './Button';

import svg from '../assets/Map.svg';
import map from '../assets/Map.jpg';

import css from './Uploader.css';

export const Uploader = ({ className, variant, onClick, disabled }) => {
	const [active, setActive] = useState(false);
	const classes = classnames(css.root, {
		[className]: className,
		[css[variant]]: css[variant],
		[css.active]: active
	});
	const form = (
		<Fragment>
			<span className={css.closeButton}>x</span>
			<Input name={'Nombre'} label={'Nombre'} className={css.formInput} />
			<Input name={'Lugar'} label={'Lugar'} className={css.formInput} />
			<Input name={'Archivos'} label={'Archivos'} className={css.formInput} />
			<Button className={css.button}>
				<span>Subir</span>
			</Button>
		</Fragment>
	);

	const clicked = () => {
		setActive(!active);
	};
	return (
		<div className={classes} onClick={() => clicked()} disabled={disabled}>
			{active ? <div className={css.form}>{form}</div> : <span>Sube tus archivos</span>}
		</div>
	);
};

export default Uploader;

Uploader.defaultProps = {
	onClick: () => {}
};

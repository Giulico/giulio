import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { actions } from '@/state/hp';

import * as PIXI from 'pixi.js';
import giulio from '@/assets/images/giulio.jpg';
import giulioMap from '@/assets/images/giulio-map.jpg';

@connect(state => ({ hp: state.hp }))
class Hp extends Component {

	static fetchData({ dispatch }) {
		return dispatch(new actions.fetchHp());
	}

	componentWillMount() {
		if (Object.keys(this.props.hp).length === 0) {
			this.constructor.fetchData({ dispatch: this.props.dispatch });
		}
	}

	componentDidMount() {
		var image, depthMap, displacementMap;
    
		image = load(giulio,
		
		function () {
			depthMap = load(giulioMap,
		
			function () {
				var renderer = PIXI.autoDetectRenderer(
				image.canvas.width,
				image.canvas.height);
		
				document.body.appendChild(renderer.view);
		
				var stage = new PIXI.Container();
				stage.interactive = true;
		
				var container = new PIXI.Container();
				stage.addChild(container);
		
				var displacementSprite = new PIXI.Sprite(
					PIXI.Texture.fromCanvas(depthMap.canvas));
				displacementSprite.width = image.canvas.width;
				displacementSprite.height = image.canvas.height;
				
				stage.addChild(displacementSprite);
				
				var displacementFilter = new PIXI.filters.
					DisplacementFilter(displacementSprite);
		
				container.filters = [displacementFilter];
		
				displacementFilter.scale.x = 10;
				displacementFilter.scale.y = 10;
		
				var bg = new PIXI.Sprite(
					PIXI.Texture.fromCanvas(image.canvas));
		
				container.addChild(bg);
		
				stage.on('mousemove', onPointerMove)
					 .on('touchmove', onPointerMove);
		
				renderer.render(stage);
		
				function onPointerMove(eventData) {
					var mouseOffsetX = eventData.data.global.x /
								image.canvas.width;
					var mouseOffsetY = eventData.data.global.y /
								image.canvas.height;
					
					displacementFilter.scale.x =
						mouseOffsetX * 20;
					displacementFilter.scale.y = 
						mouseOffsetY * 20;
					renderer.render(stage);
				}
			})
		})
		
		function load(path, callback) {
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
		
			var img = document.createElement('img');
			img.crossOrigin = "Anonymous";
			img.onload = function () {
		
				canvas.width = img.width;
				canvas.height = img.height;
		
				ctx.drawImage(img, 0, 0);
				callback(canvas, ctx, img);
			};
			img.src = path;
			return {
				context: ctx,
				image: img,
				canvas: canvas
			};
		}
	}
	render() {

		const { hp } = this.props;

		return [
			<section key={1}>
				<img
					width={50}
					alt='React Logo'
					src={hp.image}
				/>
				<h1>{hp.title}</h1>
			</section>,
			<section
				key={2}
				dangerouslySetInnerHTML={{ __html: hp.description }}
			/>
		];

	}

};

Hp.propTypes = {
	hp: PropTypes.object
};

export default Hp;
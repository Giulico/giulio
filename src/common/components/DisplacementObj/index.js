import * as React from 'react';
import * as PIXI from 'pixi.js';

import {
    Sprite,
    Container,
    Texture,
    filters,
    autoDetectRenderer,
} from '../../constants';
import { load } from './utils';


class DisplacementObj extends React.PureComponent {
    componentDidMount() {
        const imagePath = this.props.image;
        const mapPath = this.props.map;

        const image = load(imagePath, () => {
            const depthMap = load(
                mapPath,
                () => {
                    const renderer = autoDetectRenderer({
                        width: image.canvas.width,
                        height: image.canvas.height,
                        transparent: true,
                    });

                    document.body.appendChild(renderer.view);

                    const stage = new Container();
                    stage.interactive = true;

                    const container = new Container();
                    stage.addChild(container);

                    const displacementSprite = new Sprite(PIXI.Texture.fromCanvas(depthMap.canvas));
                    displacementSprite.width = image.canvas.width;
                    displacementSprite.height = image.canvas.height;

                    stage.addChild(displacementSprite);

                    const displacementFilter = new filters.DisplacementFilter(displacementSprite);

                    container.filters = [displacementFilter];

                    displacementFilter.scale.x = 10;
                    displacementFilter.scale.y = 10;

                    const bg = new PIXI.Sprite(Texture.fromCanvas(image.canvas));

                    container.addChild(bg);

                    const onPointerMove = (eventData) => {
                        const mouseOffsetX = eventData.data.global.x / image.canvas.width;
                        const mouseOffsetY = eventData.data.global.y / image.canvas.height;

                        displacementFilter.scale.x = mouseOffsetX * 20;
                        displacementFilter.scale.y = mouseOffsetY * 20;

                        renderer.render(stage);
                    };

                    stage
                        .on('mousemove', onPointerMove)
                        .on('touchmove', onPointerMove);

                    renderer.render(stage);
                },
            );
        });
    }

    render() {
        return null;
    }
}

export default DisplacementObj;

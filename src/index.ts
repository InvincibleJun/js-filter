import gauss from './filters/gauss';
import base from './filters/base';
import brown from './filters/brown';
import grey from './filters/grey';
import emboss from './filters/emboss';

interface FilterInterface {}

interface OptionInterface {
    type: 'base64' | 'canvas' | 'img';
}

type methods = 'gauss' | 'base' | 'brown' | 'grey' | 'emboss';

interface renderInterface {
    method: methods;
    blur?: number;
}

/**
 * @description
 * @author chenjun
 * @export
 * @class JsFilter
 * @implements {FilterInterface}
 */
export default class JsFilter implements FilterInterface {
    private el: HTMLElement;

    private option: OptionInterface;

    private type: OptionInterface['type'];

    private methods = {
        gauss,
        base,
        brown,
        grey,
        emboss
    };

    /**
     *Creates an instance of JsFilter.
     * @author chenjun
     * @param {HTMLElement} el
     * @param {OptionInterface} [option={ type: 'base64' }]
     * @memberof JsFilter
     */
    constructor(el: HTMLElement, option: OptionInterface = { type: 'base64' }) {
        this.el = el;
        this.option = option;
        this.type = option.type;
        this.init();
    }

    private init() {}

    /**
     * @description
     * @author chenjun
     * @param {string} src
     * @param {methods} method
     * @param {((err: null | Error, result?: HTMLElement | string) => any)} callback
     * @returns
     * @memberof JsFilter
     */
    public loadImage(
        src: string,
        option: renderInterface,
        callback: (
            err: null | Error,
            result?: HTMLElement | string
        ) => any = () => {}
    ) {
        return new Promise((resolve, reject) => {
            try {
                const image = new Image();
                image.crossOrigin = 'anonymous';
                image.src = src;
                image.onload = () => {
                    const result = this.render(
                        option,
                        image,
                        image.width,
                        image.height
                    );
                    resolve();
                    callback(null, result);
                };
            } catch (e) {
                reject(e);
                callback(e);
            }
        });
    }

    /**
     * @description
     * @author chenjun
     * @private
     * @param {methods} method
     * @param {*} image
     * @param {number} width
     * @param {number} height
     * @returns
     * @memberof JsFilter
     */
    private render(
        method: renderInterface,
        image: any,
        width: number,
        height: number
    ) {
        const canvas = document.createElement('canvas');
        const context: any = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0);
        const pixes = context.getImageData(0, 0, width, height);
        context.clearRect(0, 0, canvas.width, canvas.height);

        const newPixes = this.makeImageData(pixes.data, width, height, method);

        context.putImageData(newPixes, 0, 0);

        return this.callback(canvas, context);
    }

    /**
     * @description
     * @author chenjun
     * @private
     * @param {HTMLElement} canvas
     * @param {*} context
     * @returns
     * @memberof JsFilter
     */
    private callback(canvas: HTMLCanvasElement, context: any) {
        switch (this.type) {
            case 'base64':
                return canvas.toDataURL('image/png');
            case 'canvas':
                return canvas;
            case 'img':
                return this.createImage(canvas.toDataURL('image/png'));
            default:
                return canvas;
        }
    }

    /**
     * @description
     * @author chenjun
     * @private
     * @param {Uint8ClampedArray} pixes
     * @param {number} width
     * @param {number} height
     * @param {methods} method
     * @returns
     * @memberof JsFilter
     */
    private makeImageData(
        pixes: Uint8ClampedArray,
        width: number,
        height: number,
        option: renderInterface
    ) {
        const { method, blur = 2 } = option;
        const func: Function | null = this.methods[method];
        if (!func) {
            throw new Error(`不存在该方法${method}`);
        }
        const newPixes = new Uint8ClampedArray(
            func(pixes, width, height, blur)
        );
        return new ImageData(newPixes, width, height);
    }

    /**
     * @description
     * @author chenjun
     * @private
     * @param {string} src
     * @returns
     * @memberof JsFilter
     */
    private createImage(src: string) {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        return img;
    }
}

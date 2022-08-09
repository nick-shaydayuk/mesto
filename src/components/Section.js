export default class Section {
    constructor({ data, renderer }, containerSelector){
        this._cards = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._cards.forEach(item => {
            this._renderer(item);
        })
    }

    prependCard(element) {
        this._container.prepend(element)
    }
}
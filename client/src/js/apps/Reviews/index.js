// Do Initial Request
import axios from 'axios';

import App from "./App";
import ReactAppWrapper from "../helpers/ReactAppWrapper";

const copy = {
    en: "What our riders say about us.",
    es: "Lo que nuestros jinetes dicen de nosotros.",
}


export default class ReviewsApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
        this.scroll = dta.page.scroll
    }

    async load() {

        const res = {
            scroll: this.scroll
        };

        const promises = [
            axios('/api/reviews').then(r => res.reviews = r?.data?.data?.data.filter(review => review.locale === window.locale))
        ];

        await Promise.all(promises);

        res.copy = copy[window.locale];

        await this.render(res);

    }
    
}
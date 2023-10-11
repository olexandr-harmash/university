import React, { Component } from 'react'

import './Popular.css'

import Card from '../../../components/card/Card'
import { getProducts } from '../../../services/product/ProductService';
import { encodeParam } from '../../../pipes/ParamsPipe';

/**
 * TODO: endpoint with popular products on server with structure - map<category_name, product[]>
 */
const model = [{
    name: 'Fresh Fruits',
    items: []
},
{
    name: 'Milk & Dairies',
    items: []
}, {
    name: 'Vegetables',
    items: []
}
];

export default class Popular extends Component {
    constructor(props) {
        super(props);

        this.state = { category: model[0].name, active: false };
    }

    toggle = (category) => {
        this.setState({ category: category });
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        /**
         * TODO: endpoint with popular products on server with structure - map<category_name, product[]>
         */
        model[0].items = await getProducts(encodeParam('Meat & Duper'));
        model[1].items = await getProducts(encodeParam('Meat'));
        model[2].items = await getProducts(encodeParam('Meat & Huge Cost'));

        await this.setStateAsync({ ...this.state, active: true });
    }

    render() {
        return (
            <section className='popular'>
                <div className='container'>
                    <div className='popular-wrap'>
                        <div className='popular-header-wrap'>
                            <div className='popular-header'><span>Popular Products</span></div>
                        </div>
                        <div className='popular-filter-wrap'>
                            <div className='popular-filter'>
                                {
                                    model.map((e, i) => (
                                        <div key={i} onClick={() => this.toggle(e.name)}>
                                            {e.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='popular-catalog-wrap'>
                        {this.state.active ? <div className='popular-catalog'>
                            {
                                model
                                    .find((e, i) => e.name === this.state.category)
                                    .items.map((e, i) => (
                                        <Card
                                            id={e.id}
                                            key={i}
                                            name={e.name}
                                            offer={e.offer}
                                            category={e.category}
                                            price={e.price}
                                        ></Card>
                                    ))
                            }
                        </div> : <span>Loading...</span>}
                    </div>
                </div>
            </section>
        )
    }
}

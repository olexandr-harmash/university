import React, { Component } from 'react'

import './Card.css'
import Button from '../button/Button'
import { Link } from 'react-router-dom'
import { encodeParam } from '../../pipes/ParamsPipe'

export default class Card extends Component {
    render() {
        return (
            <div className='card-wrap'>
                <div className='card'>
                    <div className='card-image-wrap'>
                        <div className='card-image'>
                            <Link to={this.props.link || `/payment?id=${this.props.id}&name=${this.props.name}&price=${this.props.price}&category=${encodeParam(this.props.category)}`}>
                                <img src="https://demos.codezeel.com/wordpress/WCM05/WCM050115/wp-content/uploads/2023/03/16.jpg" alt="a" />
                            </Link>
                        </div>
                        {this.props.offer && <div className='card-button-wrap'>
                            <Button type='auto'>
                                <span>{this.props.offer}</span>
                            </Button>
                        </div>}
                        <div className='card-heart-wrap'>
                            <img src="https://demos.codezeel.com/wordpress/WCM05/WCM050115/wp-content/themes/gromend/assets/img/wishlist.svg" alt="" />
                        </div>
                    </div>
                    <div className='card-category-wrap'>
                        <div className='card-category'>
                            <span>{this.props.category}</span>
                        </div>
                    </div>
                    <div className='card-name-wrap'>
                        <div className='card-name'>
                            <span>{this.props.name}</span>
                        </div>
                    </div>
                    <div className='card-feed-wrap'></div>
                    <div className='card-price-wrap'>
                        <div className='card-price'>
                            <span>{this.props.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

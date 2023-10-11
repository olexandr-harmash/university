import React, { Component } from 'react'

import './Navtop.css'

import Button from '../button/Button'
import { Link } from "react-router-dom";

export default class navtop extends Component {

    render() {
        return (
            <div className='navtop'>
                <div className='container'>
                    <div className='navtop-wrap'>
                        <div className='navtop-logo-wrap'>
                            <div className='navtop-logo'>
                                <a href="https://demos.codezeel.com/wordpress/WCM05/WCM050115/wp-content/uploads/2023/03/Logo.svg">
                                    <img src="https://demos.codezeel.com/wordpress/WCM05/WCM050115/wp-content/uploads/2023/03/Logo.svg" alt="logo" />
                                </a>
                            </div>
                        </div>
                        <div className='navtop-search-wrap'>
                            <div className='navtop-search'>
                                <div className='navtop-search-form'>
                                    <input className='navtop-search-input' type="text" name="" id="" placeholder='Search products...' />
                                    <div className='navtop-search-button-wrap'>
                                        <Button type='common'>search</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='navtop-action-wrap'>
                            <div className='navtop-action'>
                                <div className='navtop-action-icon navtop-action-icon_is-shown'>
                                    <svg aria-hidden="true" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Search</title><path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path></svg>
                                </div>
                                <div className='navtop-action-icon'>
                                    <img src="https://demos.codezeel.com/wordpress/WCM05/WCM050115/wp-content/themes/gromend/assets/img/wishlist.svg" alt="" />
                                </div>
                                <div className='navtop-action-icon'>
                                    <Link to={'/login'}>
                                        <svg id="Layer_1" data-name="Layer 1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 980"><title>Account</title><path d="M652.4,524.5C729,474.5,780,388.4,780,290,780,135.4,654.6,10,500,10S220,135.4,220,290c0,98.4,51,184.5,127.6,234.5C151.7,588.6,10,772.7,10,990H80c0-231.9,188.1-420,420-420S920,758.1,920,990h70C990,772.7,848.3,588.6,652.4,524.5ZM290,290c0-116,94-210,210-210s210,94,210,210S616,500,500,500,290,406,290,290Z" transform="translate(-10 -10)"></path></svg>
                                    </Link>
                                </div>
                                <div className='navtop-action-icon navtop-action-icon_cart'>
                                    <span className='navtop-action-cart-wrap'>
                                        <span className='navtop-action-count'>0</span>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><title>Shopping Cart</title>
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor">
                                                <path d="M894 4626 c-17 -8 -44 -31 -60 -51 l-28 -37 -244 -1950 c-147 -1177
                                            -241 -1964 -237 -1984 7 -42 50 -93 92 -110 48 -21 4238 -21 4286 0 42 17 85
                                            68 92 110 4 20 -90 807 -237 1984 l-244 1950 -28 37 c-54 70 74 65 -1728 65
                                            -1353 -1 -1638 -3 -1664 -14z m3126 -311 c0 -12 430 -3452 435 -3483 l6 -32
                                            -1901 0 -1901 0 6 32 c5 31 435 3471 435 3483 0 3 657 5 1460 5 803 0 1460 -2
                                            1460 -5z"></path>
                                                <path d="M1695 3986 c-42 -18 -83 -69 -91 -112 -11 -58 2 -324 19 -384 43
                                            -154 110 -271 213 -374 71 -71 184 -147 262 -176 140 -53 160 -55 462 -55 302
                                            0 322 2 462 55 178 66 372 260 438 438 48 127 55 170 55 349 0 188 -3 198 -69
                                            247 -39 29 -133 29 -172 0 -64 -47 -68 -62 -75 -237 -5 -128 -11 -173 -27
                                            -214 -61 -160 -179 -267 -339 -308 -81 -21 -465 -21 -546 0 -160 41 -277 148
                                            -340 308 -16 42 -21 84 -26 214 -6 175 -11 190 -73 236 -33 25 -113 32 -153
                                            13z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <span className='navtop-action-cart'>my cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
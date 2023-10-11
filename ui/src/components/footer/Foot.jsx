import React, { Component } from 'react'

import './Foot.css'
import Foottop from './Foottop'

export default class Foot extends Component {
    render() {
        return (
            <footer className='foot'>
                <div className='container'>
                    <div className='foot-wrap'>
                        <div className='foot-contact-wrap'>
                            <div className='foot-header-wrap'><span>Contact Us</span></div>
                            <p className='foot-addr'>60 29th Street San Francisco, 94110 507-Union Trade Center, United States America</p>
                            <div className='foot-email-wrap'><span>hello@blocks.com</span></div>
                            <h3 className='foot-phone'>+8 520-150-001</h3>
                            <div className='foot-help-wrap'>
                                <h3>Online Chat <br /> Get Expert Help</h3>
                            </div>
                        </div>
                        <div className='foot-about-wrap'>
                            <div className='foot-header-wrap'><span>Our Company</span></div>
                            <ul className='foot-list'>
                                <li className='foot-list-item'>About Us</li>
                                <li className='foot-list-item'>Redeem Voucher</li>
                                <li className='foot-list-item'>Contact Us</li>
                                <li className='foot-list-item'>Latest News</li>
                                <li className='foot-list-item'>Shipping</li>
                                <li className='foot-list-item'>Payment</li>
                            </ul>
                        </div>
                        <div className='foot-products-wrap'>
                            <div className='foot-header-wrap'><span>Our Products</span></div>
                            <ul className='foot-list'>
                                <li className='foot-list-item'>Order Status</li>
                                <li className='foot-list-item'>Checkout</li>
                                <li className='foot-list-item'>My Account</li>
                                <li className='foot-list-item'>Locality</li>
                                <li className='foot-list-item'>Privacy Policy</li>
                                <li className='foot-list-item'>Contact Us</li>
                            </ul>
                        </div>
                        <div className='foot-download-wrap'>
                            <div className='foot-header-wrap'><span>Download App</span></div>
                            <div className='foot-stores-wrap'>
                                <img decoding="async" loading="lazy" width="139" height="49" src="https://demos.codezeel.com/wordpress/WCM05/WCM050115/wp-content/uploads/2023/03/google-play.png" alt=""></img>
                                <img decoding="async" loading="lazy" width="139" height="49" src="https://demos.codezeel.com/wordpress/WCM05/WCM050115/wp-content/uploads/2023/03/aap-store.png" alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
                <Foottop></Foottop>
            </footer>
        )
    }
}

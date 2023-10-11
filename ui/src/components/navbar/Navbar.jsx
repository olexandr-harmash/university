import React, { Component } from 'react'

import './Navbar.css'

import NavTop from './Navtop'
import Button from '../button/Button'
import Menu from '../menu/Menu'

export default class Navbar extends Component {

    render() {
        return (
            <><nav className='navbar'>
                <NavTop></NavTop>
                <div className='navbott'>
                    <div className='container'>
                        <div className='navbott-wrap'>
                            <div className='navbott-category-wrap'>
                                <div className='navbott-button'>
                                    <div className='navbott-button-wrap'>
                                        <Button type='common'>
                                            <div className='navbott-button-content-wrap'>
                                                <span className='navbott-button-icon'>
                                                    <svg aria-hidden="true" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Toggle Menu</title><path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
                                                    </svg>
                                                </span>
                                                <span>Shop By Categories</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className='navbot-menu-wrap'>
                                <Menu></Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </nav></>
        )
    }
}
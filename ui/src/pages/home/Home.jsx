import React, { Component } from 'react'

import Navbar from '../../components/navbar/Navbar.jsx';
import Foot from '../../components/footer/Foot.jsx';
import Popular from './popular/Popular.jsx';

export default class Home extends Component {
    render() {
        return (
            <>
                <Navbar></Navbar>
                <Popular></Popular>
                <Foot></Foot>
            </>
        )
    }
}

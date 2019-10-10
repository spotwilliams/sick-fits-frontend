import React, {Component} from 'react';
import styled, {ThemeProvider, injectGlobal} from "styled-components";
import Header from '../components/Header';
import Meta from '../components/Meta';

class Page extends Component {
    render() {
        return (
            <div>
                <Meta/>
                <Header/>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

export default Page;
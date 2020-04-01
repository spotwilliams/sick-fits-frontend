import React, {Component} from "react";
import {Query} from "react-apollo";
import styled from 'styled-components';
import Head from 'next/head';
import {SINGLE_ITEM_QUERY} from './queries/SINGLE_ITEM_QUERY';
import Item from "./Item";

const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    
    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
    
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;

class ShowItem extends Component {
    render() {
        return (
            <Query
                query={SINGLE_ITEM_QUERY}
                variables={{id: this.props.id}}>
                {({data, error, loading}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>error.message</p>;
                    const {item} = data;
                    return <SingleItemStyles>
                        <Head>
                            <title>Sick Fits | {item.title}</title>
                        </Head>
                        <img src={item.largeImage} alt={item.title} />
                        <div className="details">
                            <h2>Viewing {item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </SingleItemStyles>;
                }}
            </Query>
        )
            ;
    }
}

export default ShowItem;

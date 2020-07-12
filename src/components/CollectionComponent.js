import React, { Component } from 'react';
import '../App.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
//import { baseUrl } from '../shared/baseUrl';

const baseUrl = '../assets/images/';

const RenderCard = ({ item, isLoading, errMess }) => {
    if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else {
        return (
            <Card>
                <CardImg src={baseUrl + item.imagePath} alt={item.imageName} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                </CardBody>
            </Card>
        );
    }
}

const Collection = (props) => {
    console.log('check', props);
    return (
        <div className="container">
            <div className="row align-items-start">
                {
                    props.collection && props.collection.map((item) => {
                        return (
                            <div className="col-12 col-md m-1">
                                <RenderCard
                                    item={item}
                                // isLoading={props.collectionsLoading}
                                // errMess={props.collectionsErrMess}
                                />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}

export default Collection;
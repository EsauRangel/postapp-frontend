import PropTypes from "prop-types";
import React from 'react';
import { Card } from 'react-bootstrap';

export const CardContainer = ({children,title,id,styleBody={}}) => {
    return (
        <Card className="animate__animated animate__fadeIn center-card" id={id}>
            <Card.Header style={{textAlign: "center",fontSize: 20,}}>{title}</Card.Header>
            <Card.Body style={styleBody}>{children}</Card.Body>
        </Card>
    );
}



CardContainer.propTypes = {
    title: PropTypes.string.isRequired,
 };

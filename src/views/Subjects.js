import React from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {
    Row,
    Col,
} from "reactstrap";


const Subjects = () => {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <p>Hello World</p>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Subjects
import React from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader
} from "reactstrap";
import { useParams } from 'react-router';


const Subjects = () => {

    const {subjectName} = useParams();

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                                <h5 className="title">{subjectName}</h5>
                                <p className="category">
                                    Handcrafted by our friends from{" "}
                                    <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Row>

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Subjects
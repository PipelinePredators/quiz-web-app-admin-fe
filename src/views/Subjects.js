import React from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    Form,
    FormGroup,
    FormText,
    Button,
    Label,
    Input,

    CardHeader
} from "reactstrap";
import { useParams } from 'react-router';


const Subjects = () => {

    const { subjectName } = useParams();

    const onUploadExcelFile = (event) => {
        event.preventDefault();
        const inputFile = document.getElementById('excelFile');
        console.log('File', inputFile.files[0])
    }

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">{subjectName}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs={12}>
                                <Form>
                                    <FormGroup>
                                        <Label for="excelFile" style={{ 'fontSize': '1em' }}>
                                            File
                                        </Label>
                                        <Input
                                            id="excelFile"
                                            name="file"
                                            type="file"
                                            style={{ 'opacity': '1', 'position': 'relative' }}
                                        />
                                        <FormText>
                                            Please upload an excel sheet containing your questions.
                                        </FormText>
                                    </FormGroup>
                                    <Button onClick={(event) => { onUploadExcelFile(event) }}>
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                            <Col xs={12}>
                                <Table hover responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                First Name
                                            </th>
                                            <th>
                                                Last Name
                                            </th>
                                            <th>
                                                Username
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                1
                                            </th>
                                            <td>
                                                Mark
                                            </td>
                                            <td>
                                                Otto
                                            </td>
                                            <td>
                                                @mdo
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                2
                                            </th>
                                            <td>
                                                Jacob
                                            </td>
                                            <td>
                                                Thornton
                                            </td>
                                            <td>
                                                @fat
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                3
                                            </th>
                                            <td>
                                                Larry
                                            </td>
                                            <td>
                                                the Bird
                                            </td>
                                            <td>
                                                @twitter
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Subjects
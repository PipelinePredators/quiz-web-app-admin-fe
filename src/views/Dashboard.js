import React, { useEffect } from "react";
// react plugin used to create charts

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import Swal from "sweetalert2";


function Dashboard() {

  useEffect(()=>{
    notifyUser();
  })

  const notifyUser = ()=>{
    Swal.fire({
      title:'Info',
      text: 'Welcome to the admin dashboard. Please follow instructions to upload questions',
      confirmButtonText:'Ok',
    }).then((result)=>{
      if(result.isConfirmed){
        Swal.close();
      }
    })
  }

  return (
    <>
      <PanelHeader
        size="sm"
      />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">INSTRUCTIONS</CardTitle>
              </CardHeader>
              <CardBody>
                <ol>
                  <li>Create an excel stylesheet</li>
                  <li>Give it a column of name of Question, Option A, Option B, Option C, Option D and Answer</li>
                  <li>Save it</li>
                  <li>Select the subject you want to upload its questions</li>
                  <li>Click to choose the file</li>
                  <li>Navigate to the location of your file</li>
                  <li>Select your file</li>
                  <li>click submit after your file name has been populated</li>
                  <li>click Upload to upload questions</li>
                </ol>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;

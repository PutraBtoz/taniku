import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
  Table,
} from 'reactstrap';

const FormPage = () => {
  return (
    <Page title="Harga Taniku" breadcrumbs={[{ name: 'Harga', active: true }]}>
      <Row>
        <Col>
          <Card>
            <CardHeader>Form hasil cek harga pasar</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      Komoditi
                    </Label>
                    <Label for="resultNama" sm={5}>
                      Ubi jalar cilembu
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      Tanggal
                    </Label>
                    <Label for="resultNama" sm={5}>
                      04/16/2020
                    </Label>
                  </FormGroup>

                  <Card className="mb-3">
                    <CardBody>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Regional</th>
                            <th>Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Madiun</td>
                            <td>Rp 100.000 - Rp 110.000 / kg</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Malang</td>
                            <td>Rp 95.000 - Rp 100.000 / kg</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Surabaya</td>
                            <td>Rp 110.000 - Rp 120.000 / kg</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default FormPage;

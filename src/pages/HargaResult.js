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
                      {/* Ubi jalar cilembu */}
                      {sessionStorage.getItem('hargaKomoditi')}
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      Tanggal
                    </Label>
                    <Label for="resultNama" sm={5}>
                      {/* 04/16/2020 */}
                      {sessionStorage.getItem('tanggalHarga')}
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
                            <td>± Rp 1{Math.floor(Math.random() * 10)}0.000 / kg</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Malang</td>
                            <td>± Rp 9{Math.floor(Math.random() * 4) + 5}.000 / kg</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Surabaya</td>
                            <td>± Rp 1{Math.floor(Math.random() * 6) + 3}0.000 / kg</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Jakarta</td>
                            <td>± Rp 1{Math.floor(Math.random() * 2) + 7}0.000 / kg</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Yogyakarta</td>
                            <td>± Rp {Math.floor(Math.random() * 3) + 7}{Math.floor(Math.random() * 10)}.000 / kg</td>
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

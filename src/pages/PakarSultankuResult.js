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
    <Page title="PakarKu" breadcrumbs={[{ name: 'PakarKu', active: true }]}>
      <Row>
        <Col>
          <Card>
            <CardHeader>Form hasil Pakar</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      ID
                    </Label>
                    <Label for="resultNama" sm={5}>
                      KMD0123
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      Nama
                    </Label>
                    <Label for="resultNama" sm={5}>
                      Pak Pakar
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelKomoditi" sm={2}>
                      Komoditi
                    </Label>
                    <Label for="resultNama" sm={5}>
                      Jagung
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelMusim" sm={2}>
                      Musim
                    </Label>
                    <Label for="resultMusim" sm={5}>
                      Penghujan
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelTanah" sm={2}>
                      Kondisi Tanah
                    </Label>
                    <Label for="resultTanah" sm={5}>
                      Banyak mengandung air
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelCuaca" sm={2}>
                      Cuaca
                    </Label>
                    <Label for="resultCuaca" sm={5}>
                      Berkisar 25°C - 32°C
                    </Label>
                  </FormGroup>

                  <Card className="mb-3">
                    <CardHeader>Perawatan</CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Komoditi</th>
                            <th>Perawatan</th>
                            <th>Masa Panen</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Tomat</td>
                            <td>Kasih pupuk rutin 3 hari</td>
                            <td>3 bulan</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Kentang</td>
                            <td>Disiram rutin per 2 hari</td>
                            <td>3 bulan</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Kangkung</td>
                            <td>Petak diperbesar</td>
                            <td>3 bulan</td>
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

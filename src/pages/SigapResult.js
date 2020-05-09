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
            <CardHeader>Form hasil sigap</CardHeader>
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
                      Kisaran umur
                    </Label>
                    <Label for="resultNama" sm={5}>
                      9 bulan - 12 bulan
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      Kisaran suhu
                    </Label>
                    <Label for="resultNama" sm={5}>
                      24°C - 28°C
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      Hama
                    </Label>
                    <Label for="resultNama" sm={5}>
                      Ulat, burung, cacing
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      Penyakit
                    </Label>
                    <Label for="resultNama" sm={5}>
                      Jamur Akar Putih, Penyakit Hawar Bakteri, Penyakit layu bakteri, Bercak Coklat
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="labelNama" sm={2}>
                      Perawatan
                    </Label>
                    <Label for="resultNama" sm={5}>
                      Penyiraman, Penyiraman, Penyiangan gulma, Pembumbunan, Pengendalian hama dan penyakit
                    </Label>
                  </FormGroup>
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

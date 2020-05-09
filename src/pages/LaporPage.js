import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

class LaporPage extends React.Component {
  state = {
    startDate: new Date(),
    // agenda: Agenda
  };

  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  render() {
    return (
      <Page title="Lapor Taniku" breadcrumbs={[{ name: 'Lapor', active: true }]}>
        <Row>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Form lapor</CardHeader>
              <CardBody>
                <Form onSubmit={(e) => {e.preventDefault();}}>
                  <FormGroup row>
                    <Label for="exampleSelect" sm={3}>
                      Komoditi
                    </Label>
                    <Col sm={9}>
                      <Input type="select" name="komoditi">
                        <option>Ubi jalar cilembu</option>
                        <option>Ubi jalar ungu</option>
                        <option>Ubi jalar orange</option>
                        <option>Ubi jalar putih</option>
                        <option>Ubi jalar kuning</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleDate" sm={3}>
                      Usia tanaman
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="number"
                        name="usia"
                        placeholder="bulan"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleText" sm={3}>
                      Keadaan tanaman
                    </Label>
                    <Col sm={9}>
                      <Input type="textarea" name="text" placeholder="Jelaskan keadaan tanaman anda"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleFile" sm={3}>
                      Foto
                    </Label>
                    <Col sm={9}>
                      <Input type="file" name="file" />
                      <FormText color="muted">
                        Silahkan menambahkan foto untuk membantu kami menganalisa keadaan
                        tanaman anda.
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 10 }}>
                      <Button type='submit' onClick={this.toggle()}>Lapor</Button>
                    </Col>
                  </FormGroup>
                </Form>

                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle()}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle()}>Modal title</ModalHeader>
                  <ModalBody>
                    Laporan anda telah terkirim! Silahkan menunggu hasil pengecekkan kami.
                  </ModalBody>
                  <ModalFooter>
                    {/* <Button color="secondary" onClick={() => window.location='/kelola'}>
                      Lihat agenda
                    </Button>{' '} */}
                    <Button color="primary" onClick={this.toggle()}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Page>
    );
  };
};

export default LaporPage;

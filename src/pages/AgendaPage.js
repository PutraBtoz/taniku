import Page from 'components/Page';
import React from 'react';
import axios from 'axios';
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
import DatePicker from 'react-datepicker';
import { getUser } from '../utils/Common';

import 'react-datepicker/dist/react-datepicker.css';

const user = getUser();

class AgendaPage extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    title: '',
    modal_agenda: false,
    modal_alert: false,
  };
 
  handleChange = (where, date) => {
    this.setState({
      [where]: date
    });
  };

  handleChangeAgenda = (e) => {
    this.setState({
      title: e.target.value
    });
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
  
  handleSubmit = (e, toggleSuccess, toggleAlert) => {
    e.preventDefault();
    if(this.state.endDate >= this.state.startDate){
      axios.post('http://localhost:4000/api/tanam/' + user.id, { 
        startDate: this.state.startDate, 
        endDate: this.state.endDate,
        title: this.state.title,
      })
      .then(res => {
        toggleSuccess()
        console.log(res)
      })
      .catch(error => {
        console.log(error.response)
      });
    }else{
      toggleAlert()
    }
  }

  render() {
    return (
      <Page title="Agenda Taniku" breadcrumbs={[{ name: 'Agenda', active: true }]}>
        <Row>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Form Agenda</CardHeader>
              <CardBody>
                <Form onSubmit={(e) => this.handleSubmit(e, this.toggle('agenda'), this.toggle('alert'))}>
                  <FormGroup row>
                    <Label for="exampleName" sm={4}>
                      Nama
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        name="name"
                        value={user.name}
                        disabled
                        // placeholder="with a placeholder"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleDate" sm={4}>
                      Tanggal mulai
                    </Label>
                    <Col sm={8}>
                      <DatePicker 
                        className='form-control'
                        selected={this.state.startDate}
                        // minDate={new Date()}
                        onChange={(e) => this.handleChange('startDate', e)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleDate" sm={4}>
                      Tanggal selesai
                    </Label>
                    <Col sm={8}>
                      <DatePicker 
                        className='form-control'
                        selected={this.state.endDate}
                        // minDate={new Date()}
                        onChange={(e) => this.handleChange('endDate', e)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleText" sm={4}>
                      Agenda
                    </Label>
                    <Col sm={8}>
                      <Input value={this.state.title} onChange={(e) => this.handleChangeAgenda(e)} type="textarea" name="text" required/>
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 10 }}>
                      <Button type='submit'>Simpan</Button>
                    </Col>
                  </FormGroup>
                </Form>

                <Modal
                  isOpen={this.state.modal_agenda}
                  toggle={this.toggle('agenda')}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle('agenda')}>Agenda</ModalHeader>
                  <ModalBody>
                    Agenda berhasil ditambahkan!
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={() => this.props.history.push('/kelola')}>
                      Lihat agenda
                    </Button>{' '}
                    <Button color="primary" onClick={this.toggle('agenda')}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>

                <Modal
                  isOpen={this.state.modal_alert}
                  toggle={this.toggle('alert')}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle('alert')}>Alert!</ModalHeader>
                  <ModalBody>
                    Tanggal selesai tidak boleh kurang dari tanggal mulai!
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle('alert')}>
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

export default AgendaPage;

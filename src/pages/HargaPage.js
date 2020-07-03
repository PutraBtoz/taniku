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
} from 'reactstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

class AgendaPage extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:4000/api/komoditi`)
    .then(res => this.setState({komoditi: res.data}))
  }
  
  state = {
    startDate: new Date(),
    komoditi: []
  };
 
  handleChangeDate = date => {
    sessionStorage.setItem("tanggalHarga", date)
    this.setState({
      startDate: date
    });
  };

  handleChangeKomoditi = (e) => {
    sessionStorage.setItem("hargaKomoditi", e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/harga-result')
  }

  render() {
    return (
      <Page title="Harga Taniku" breadcrumbs={[{ name: 'Harga', active: true }]}>
        <Row>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Form cek harga pasar</CardHeader>
              <CardBody>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                  <FormGroup row>
                    <Label for="exampleSelect" sm={2}>
                      Komoditi
                    </Label>
                    <Col sm={10}>
                      <Input type="select" name="komoditi" onChange={(e) => this.handleChangeKomoditi(e)} >
                        {this.state.komoditi.map(komoditi => (
                          <option key={komoditi.id} value={komoditi.name}>{komoditi.name}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleDate" sm={2}>
                      Tanggal
                    </Label>
                    <Col sm={10}>
                      <DatePicker 
                        maxDate={new Date()}
                        className='form-control'
                        selected={this.state.startDate}
                        onChange={this.handleChangeDate}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 10 }}>
                      <Button type='submit'>Cek</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Page>
    );
  };
};

export default AgendaPage;

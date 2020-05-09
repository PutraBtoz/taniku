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
import Weather from '../components/Weather/containers/App/Weather';


class AgendaPage extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:4000/api/komoditi`)
    .then(res => this.setState({komoditi: res.data}))
  }
  
  state = {
    startDate: new Date(),
    isDisabled: true,
    weather: [],
    komoditi: [],
  };

  checkOption = () => {
    if(this.state.isDisabled === false){
      return false
    }else{
      return true
    }
  }
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  setEnabled = () => {
    this.setState({isDisabled: false})
  }
  setWeather = (data) => {
    this.setState({weather: data})
  }

  render() {
    return (
      <Page title="Sigap Taniku" breadcrumbs={[{ name: 'Sigap', active: true }]}>
        <Row>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Form sigap</CardHeader>
              <CardBody>
                <Form onSubmit={(e) => {e.preventDefault(); window.location='/sigap-result'}}>
                  <FormGroup row>
                    <Label for="exampleSelect" sm={2}>
                      Komoditi
                    </Label>
                    <Col sm={10}>
                      <Input type="select" name="komoditi">
                        {this.state.komoditi.map(komoditi => (
                          <option key={komoditi.id}>{komoditi.name}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleDate" sm={2}>
                      Usia tanaman
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="number"
                        name="usia"
                        placeholder="bulan"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label for="cuacaLabel">Cuaca</Label>
                    <Weather setEnabled={this.setEnabled} setWeather={this.setWeather} />
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 10 }}>
                      <Button type='submit' disabled={this.checkOption()}>Submit</Button>
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

import Page from 'components/Page';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Weather from '../components/Weather/containers/App/Weather';
import { getUser } from '../utils/Common';


const user = getUser();

const FormPage = (props) => {
  const [isDisabled, setEnabled] = useState(true);
  const [dataWeather, setWeather] = useState({});
  const [dataMusim, setDataMusim] = useState();
  const [descMusim, setDescMusim] = useState({
    status: false,
    value: "",
    name: "",
  });
  const [dataKetinggian, setDataKetinggian] = useState();
  const [descKetinggian, setDescKetinggian] = useState({
    status: false,
    value: "",
    name: "",
  });
  const [dataTanah, setDataTanah] = useState();
  const [descTanah, setDescTanah] = useState({
    status: false,
    name: "",
    value: "",
  });
  const [isLoaded, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const musim = await axios.get(
        `http://localhost:4000/api/musim`,
      );
      const ketinggian = await axios.get(
        `http://localhost:4000/api/ketinggian`,
      );
      const tanah = await axios.get(
        `http://localhost:4000/api/tanah`,
      );
      setDataMusim(musim.data);
      setDataKetinggian(ketinggian.data);
      setDataTanah(tanah.data);
      setLoading(true)
    };
    fetchData();
  }, []);

  const handleChange = (where, e) => {
    console.log(where, e.target.value)
    sessionStorage.setItem(where, e.target.value)
    if(where === 'valueMusim'){
      selectValue(setDescMusim, "nameMusim", e)
    }
    if(where === 'valueKetinggian'){
      selectValue(setDescKetinggian, "nameKetinggian", e)
    }
    if(where === 'valueKondisiTanah'){
      selectValue(setDescTanah, "nameKondisiTanah", e)
    }
  }

  const selectValue = (setData, where, e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var desc =  optionElement.getAttribute('desc');
    var name =  optionElement.getAttribute('name');
    sessionStorage.setItem(where, name)
    if(e.target.value !== 'pilih'){
      setData({
      status: true,
      value: desc,
      name: name,
      })
    }
    else{
      setData({
        status: false,
      })
    }
  }

  const checkOption = () => {
    if(isDisabled === false && 
      descMusim.status === true &&
      descKetinggian.status === true &&
      descTanah.status === true){
      return false
    }else{
      return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const weather = JSON.parse(sessionStorage.getItem('weather'));
    axios.post('http://localhost:4000/api/konsul', { 
      konselor: user.name, 
      musim: descMusim.name,
      ketinggian: descKetinggian.name,
      tanah: descTanah.name,
      suhu: Math.round(weather),
    })
    .then(res => {
      axios.post('http://localhost:4000/api/gis', { 
      name: dataWeather.name, 
      lng: dataWeather.coord.lon,
      lat: dataWeather.coord.lat,
      })
      .then(res => {
        props.history.push('/sultanku-result')
        console.log(res)
      })
      .catch(error => {
        console.log(error.response)
      });
      console.log(res)
      })
    .catch(error => {
      console.log(error.response)
    });
  }
  
  return (
    <Page title="SultanKu" breadcrumbs={[{ name: 'SultanKu', active: true }]}>
      <Row>
        <Col>
          <Card>
            <CardHeader>Form Konsultasi</CardHeader>
            <CardBody>
              <Form onSubmit={(e) => handleSubmit(e)}>
              {/* <Form onSubmit={(e) => {e.preventDefault(); window.location='/sultanku-result'}}> */}
                <Row>
                  <Col xl={6} lg={12} md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Nama</Label>
                      <Input
                        type="text"
                        name="name"
                        value={user.name}
                        disabled
                        // placeholder="with a placeholder"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Musim</Label>
                      <Input type="select" name="musim" onChange={(e) => handleChange("valueMusim", e)}>
                        <option value="pilih">Pilih keadaan musim</option>
                        {isLoaded && dataMusim.map(musim => (
                          <option key={musim.id} value={musim.value} desc={musim.description} name={musim.name}>{musim.name}</option>
                        ))}
                      </Input>
                      {descMusim.status && <Label for="exampleSelect">{descMusim.value}</Label>}
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Ketinggian ladang</Label>
                      <Input type="select" name="tanah" onChange={(e) => handleChange("valueKetinggian", e)}>
                      <option value="pilih">Pilih ketinggian ladang</option>
                        {isLoaded && dataKetinggian.map(ketinggian => (
                          <option key={ketinggian.id} value={ketinggian.value} desc={ketinggian.description} name={ketinggian.name}>{ketinggian.name}</option>
                        ))}
                      </Input>
                      {descKetinggian.status && <Label for="exampleSelect">{descKetinggian.value}</Label>}
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Kondisi tanah</Label>
                      <Input type="select" name="tanah" onChange={(e) => handleChange("valueKondisiTanah", e)}>
                      <option value="pilih">Pilih keadaan tanah</option>
                        {isLoaded && dataTanah.map(tanah => (
                          <option key={tanah.id} value={tanah.value} desc={tanah.description} name={tanah.name}>{tanah.name}</option>
                        ))}
                      </Input>
                      {descTanah.status && <Label for="exampleSelect">{descTanah.value}</Label>}
                    </FormGroup>
                  </Col>
                  <Col xl={6} lg={12} md={12}>
                    <FormGroup>
                      <Label for="cuacaLabel">Cuaca</Label>
                      <Weather setEnabled={setEnabled} setWeather={setWeather} />
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 10 }}>
                        <Button type='submit' disabled={checkOption()}>Cek</Button>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default FormPage;

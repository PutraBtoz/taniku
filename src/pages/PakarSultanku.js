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
import { getUser } from '../utils/Common';

const user = getUser();

const FormPage = () => {
  const [dataKomoditi, setDataKomoditi] = useState();
  const [dataMusim, setDataMusim] = useState();
  const [dataTanah, setDataTanah] = useState();
  const [dataHujan, setDataHujan] = useState();
  const [dataKetinggian, setDataKetinggian] = useState();
  const [isLoaded, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const komoditi = await axios.get(
        `http://localhost:4000/api/komoditi`,
      );
      const musim = await axios.get(
        `http://localhost:4000/api/musim`,
      );
      const tanah = await axios.get(
        `http://localhost:4000/api/tanah`,
      );
      const hujan = await axios.get(
        `http://localhost:4000/api/hujan`,
      );
      const ketinggian = await axios.get(
        `http://localhost:4000/api/ketinggian`,
      );
      setDataKomoditi(komoditi.data);
      setDataMusim(musim.data);
      setDataTanah(tanah.data);
      setDataHujan(hujan.data);
      setDataKetinggian(ketinggian.data);
      setLoading(true)
    };
    fetchData();
  }, []);
  return (
    <Page title="PakarKu" breadcrumbs={[{ name: 'PakarKu', active: true }]}>
      <Row>
        <Col>
          <Card>
            <CardHeader>Form Pakar</CardHeader>
            <CardBody>
              <Form onSubmit={(e) => {e.preventDefault(); window.location='/pakarku-result'}}>
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
                      <Label for="exampleSelect">Komoditi</Label>
                      <Input type="select" name="komoditi">
                        {isLoaded && dataKomoditi.map(komoditi => (
                          <option key={komoditi.id}>{komoditi.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Musim</Label>
                      <Input type="select" name="musim">
                        {isLoaded && dataMusim.map(musim => (
                          <option key={musim.id}>{musim.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Kondisi tanah</Label>
                      <Input type="select" name="tanah">
                        {isLoaded && dataTanah.map(tanah => (
                          <option key={tanah.id}>{tanah.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Curah hujan</Label>
                      <Input type="select" name="curah">
                        {isLoaded && dataHujan.map(hujan => (
                          <option key={hujan.id}>{hujan.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Ketinggian daerah</Label>
                      <Input type="select" name="ketinggian">
                        {isLoaded && dataKetinggian.map(ketinggian => (
                          <option key={ketinggian.id}>{ketinggian.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xl={6} lg={12} md={12}>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Suhu maksimal</Label>
                          <Input type="number" name="suhuMax" placeholder="°C" />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">Suhu minimal</Label>
                          <Input type="number" name="suhuMin" placeholder="°C" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <FormGroup>
                        <Label for="exampleEmail">Hama</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label check>
                          <Input type="checkbox" /> Ulat
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label check>
                          <Input type="checkbox" /> Burung
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label check>
                          <Input type="checkbox" /> Jangkrik
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <FormGroup>
                        <Label for="exampleEmail">Penyakit</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label check>
                          <Input type="checkbox" /> Bulai
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label check>
                          <Input type="checkbox" /> Hawar
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label check>
                          <Input type="checkbox" /> Turicium
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Pemanenan</Label>
                      <Input
                        type="text"
                        name="panen"
                        required
                        placeholder="bulan"
                      />
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 10 }}>
                        <Button type='submit'>Submit</Button>
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

import Page from 'components/Page';
import ReactDOM from "react-dom"
import React, { useReducer } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  CustomInput,
  Form,
} from 'reactstrap';
import {
  MdSearch,
} from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import { getColor } from 'utils/colors';
import { getUser } from '../utils/Common';
import XLSX from "xlsx"
import * as FileSaver from "file-saver"

// const doLog = (req) => {
//   console.log(req)
// }

const certainty = (cf1, cf2) => {
  if(cf1 >=0 && cf2 >=0){
    const combine = cf1 + cf2 * (1 - cf1);
    console.log("CONSOL 1")
    return combine;
  }
  else if(cf1<0 && cf2<0){
    const combine = cf1 + cf2 * (1 + cf1);
    console.log("CONSOL 3")
    return combine;
  }
  else if(cf1<0 || cf2<0 ){
    const combine = (cf1+cf2)/(1 - Math.min(Math.abs(cf1), Math.abs(cf2)));
    console.log(cf1, cf2, Math.abs(cf1), Math.abs(cf2), Math.min(Math.abs(cf1), Math.abs(cf2)))
    console.log("CONSOL 2")
    return combine;
  }
  else{
    console.log("CEK LAGI ALGORITMA")
    return null;
  }
}

const getSessionStorage = (request) => {
  return sessionStorage.getItem(request)
}

const certaintyCalculation = (v1, v2 , v3, v4, where) => {
  let combine1=0;
  let combine2=0;
  let combine3=0;
  
  //mengalikan faktor dari pakar dengan pilihan user
  let CFMusim = JSON.parse(getSessionStorage('valueMusim')) * v1;
  let CFTanah = JSON.parse(getSessionStorage('valueKondisiTanah')) * v2;
  let CFKetinggian = JSON.parse(getSessionStorage('valueKetinggian')) * v3;
  let CFWeather = JSON.parse(getSessionStorage('valueWeather')) * v4;
  combine1 = certainty(CFMusim, CFTanah);
  combine2 = certainty(combine1, CFKetinggian);
  combine3 = certainty(combine2, CFWeather);

  const result = parseFloat(combine3).toFixed(2)

  const totalPercentage = Math.round((result - (-1)) * 100) / (1 - (-1));
  sessionStorage.setItem("totalPercentage"+where, totalPercentage);

  getCountPercentage(CFMusim, CFTanah, CFKetinggian, CFWeather, where);
  
  return result;
}

const getCertaintyFactor = (v1, v2, v3, v4, where) => {
  const cf = certaintyCalculation(v1, v2, v3, v4, where);
  const totalPercentage = Math.round((cf - (-1)) * 100) / (1 - (-1))
  return totalPercentage
}

const getCountPercentage = (v1, v2, v3, v4, where) => {
  const total = v1 + v2 + v3 + v4;
  const maxPercentage = JSON.parse(sessionStorage.getItem("totalPercentage"+where))
  let MaxResult1 = Math.round((v1 / total) * 100);
  let MaxResult2 = Math.round((v2 / total) * 100);
  let MaxResult3 = Math.round((v3 / total) * 100);
  let MaxResult4 = Math.round((v4 / total) * 100);

  let result1 = Math.round((((v1 / total) * maxPercentage) * 100) / 100);
  let result2 = Math.round((((v2 / total) * maxPercentage) * 100) / 100);
  let result3 = Math.round((((v3 / total) * maxPercentage) * 100) / 100);
  let result4 = Math.round((((v4 / total) * maxPercentage) * 100) / 100);

  const resultPercentage = [result1, result2, result3, result4]
  const maxResultPercentage = [MaxResult1, MaxResult2, MaxResult3, MaxResult4]
  sessionStorage.setItem("percentage"+where, JSON.stringify(resultPercentage))
  sessionStorage.setItem("maxPercentage"+where, JSON.stringify(maxResultPercentage))
};

const genPieData = (where) => {
  let dataPie = JSON.parse(sessionStorage.getItem("percentage"+where))

  return {
    datasets: [
      {
        data: dataPie,
        backgroundColor: [
          getColor('primary'),
          getColor('secondary'),
          getColor('success'),
          getColor('info'),
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['Musim', 'Tanah', 'Ketinggian', 'Cuaca'],
  };
};


const user = getUser();

class FormPage extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:4000/api/komoditi`)
    .then(res => this.setState({komoditi: res.data}))
  }
  
  state = {
    startDate: new Date(),
    modal_info: false,
    modal_tanam: false,
    modal_tanam_parent: false,
    modal_export: false,
    selectedTanaman: '',
    selectedAnalisa: [],
    selectedId: '',
    totalPercentage: 0,
    maxPercentage: [],
    komoditi: [],
    filteredData: [],
    value: "",
    fileName: "",
    fileFormat: "xlsx",
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  toggle = (modalType, selected, id) => () => {
    const percentage = JSON.parse(sessionStorage.getItem("percentage"+id))
    const maxPercentage = JSON.parse(sessionStorage.getItem("maxPercentage"+id))
    const totalPercentage = JSON.parse(sessionStorage.getItem("totalPercentage"+id))
    console.log(percentage, maxPercentage, totalPercentage)
    if (!modalType) {
      return this.setState({
        modal_tanam: !this.state.modal_tanam,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
      selectedTanaman: selected,
      selectedId: id,
      selectedAnalisa: percentage,
      maxPercentage: maxPercentage,
      totalPercentage: totalPercentage
    });
  };

  toggleExport = () => {
    this.setState({ modal_export: !this.state.modal_export })
  }

  addTanam = (tanaman, toggle) => () => {
    axios.post('http://localhost:4000/api/tanam/' + user.id, { 
      startDate: this.state.startDate, 
      endDate: this.state.startDate,
      title: "Tanam " + tanaman,
    })
    .then(res => {
      toggle()
      console.log(res)
    })
    .catch(error => {
      console.log(error.response)
    });
  }

  handleFilter = e => {
    let data = this.state.komoditi
    let filteredData = []
    let value = e.target.value
    this.setState({ value })
    if (value.length) {
      filteredData = data.filter(col => {
        let startsWithCondition =
          col.name.toLowerCase().startsWith(value.toLowerCase()) ||
          col.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())

        let includesCondition =
          col.name.toLowerCase().includes(value.toLowerCase()) ||
          col.id
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())

        if (startsWithCondition) return startsWithCondition
        else if (!startsWithCondition && includesCondition)
          return includesCondition
        else return null
      })
      this.setState({ value, filteredData })
    }
  }

  handleExport = () => {
    this.toggle()
    let table = ReactDOM.findDOMNode(this.tableRef)
    let bookType = this.state.fileFormat.length ? this.state.fileFormat : "xlsx"
    let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet JS" })
    let wbout = XLSX.write(wb, { bookType, bookSST: true, type: "binary" })

    const s2ab = s => {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }
    let file =
      this.state.fileFormat.length && this.state.fileFormat.length
        ? `${this.state.fileName}.${this.state.fileFormat}`
        : this.state.fileName.length
        ? `${this.state.fileName}.xlsx`
        : this.state.fileFormat.length
        ? `excel-sheet.${this.state.fileFormat}`
        : "excel-sheet.xlsx"

    return FileSaver.saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      file
    )
  }

  render() {
    let array = this.state.value ? this.state.filteredData : this.state.komoditi
    let renderTableData = array.map((komoditi,i) => {
      return (
        <tr key={komoditi.id}>
          <th scope="row">{i + 1}</th>
          <td>{komoditi.name}</td>
          <th style={{textAlign: 'center'}}>
              <Doughnut data={genPieData(komoditi.id)} width={800}/>
              {getCertaintyFactor(
              komoditi.v_musim,
              komoditi.v_tanah,
              komoditi.v_tinggi,
              komoditi.v_suhu,
              komoditi.id)} %
          </th>
          <td>3 - 4 bulan</td>
            <td>30 - 31 ton/hektare</td>
            <td><Button type='button' color='info' onClick={this.toggle('analisa', komoditi.name, komoditi.id)}>Lihat</Button></td>
            <td><Button type='button' onClick={this.toggle('tanam_parent', komoditi.name, komoditi.id)}>Tanam</Button></td>
        </tr>
      )
    })
    return (
      <Page title="Hasil SultanKu" breadcrumbs={[{ name: 'SultanKu', active: true }]}>
        <Row>
          <Col>
            <Card>
              <CardHeader>Form hasil konsultasi</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup row>
                      <Label for="labelNama" sm={2}>
                        Nama
                      </Label>
                      <Label for="resultNama" sm={5}>
                        {user.name}
                      </Label>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="labelMusim" sm={2}>
                        Musim
                      </Label>
                      <Label for="resultMusim" sm={5}>
                        {getSessionStorage("nameMusim")}
                      </Label>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="labelKetinggian" sm={2}>
                        Ketinggian
                      </Label>
                      <Label for="resultKetinggian" sm={5}>
                        {getSessionStorage('nameKetinggian')}
                      </Label>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="labelTanah" sm={2}>
                        Kondisi Tanah
                      </Label>
                      <Label for="resultTanah" sm={5}>
                        {getSessionStorage("nameKondisiTanah")}
                      </Label>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="labelCuaca" sm={2}>
                        Cuaca
                      </Label>
                      <Label for="resultCuaca" sm={5}>
                        {Math.round(JSON.parse(getSessionStorage('weather')))}<span> °C</span>
                      </Label>
                    </FormGroup>


                    <Card className="mb-3">
                    <CardHeader className="d-flex flex-wrap justify-content-between mb-1">
                      <Label>Hasil</Label>
                      <div inline className="cr-search-form">
                        <MdSearch
                          size="20"
                          className="cr-search-form__icon-search text-secondary"
                          style={{top: 8}}
                        />
                        <Input
                          type="search"
                          className="cr-search-form__input"
                          value={this.state.value}
                          onChange={e => this.handleFilter(e)}
                          placeholder="Search..."
                        />
                      </div>
                      <Button onClick={this.toggleExport}>Export as CSV</Button>
                    </CardHeader>
                      <CardBody>
                        <Table innerRef={el => (this.tableRef = el)} responsive>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Komoditi</th>
                              {/* <th>Tingkat rekomendasi</th> */}
                              <th style={{textAlign: 'center'}}>Tingkat rekomendasi</th>
                              <th>Masa Panen</th>
                              <th>Hasil</th>
                              <th>Analisa</th>
                              <th>Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {renderTableData}
                          </tbody>
                        </Table>

                        <Modal
                          size="xl"
                          isOpen={this.state.modal_analisa}
                          toggle={this.toggle('analisa', this.state.selectedTanaman, this.state.selectedId)}
                          className={this.props.className}>
                          <ModalHeader toggle={this.toggle('analisa', this.state.selectedTanaman, this.state.selectedId)}>Analisa {this.state.selectedTanaman}</ModalHeader>
                          <ModalBody>
                            <Row>
                              <Col>
                                <Card className="mb-3">
                                  <CardHeader>Pembobotan Faktor</CardHeader>
                                  <CardBody>
                                    <Table responsive>
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Faktor</th>
                                        <th>Analisa</th>
                                        <th>Bobot Perolehan</th>
                                        <th>Bobot Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">1</th>
                                        <td>Musim</td>
                                        <td>{getSessionStorage("nameMusim")}</td>
                                        <td>{this.state.selectedAnalisa[0]} %</td>
                                        <td>{this.state.maxPercentage[0]} %</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">2</th>
                                        <td>Ketinggian</td>
                                        <td>{getSessionStorage("nameKetinggian")}</td>
                                        <td>{this.state.selectedAnalisa[2]} %</td>
                                        <td>{this.state.maxPercentage[2]} %</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">3</th>
                                        <td>Keadaan tanah</td>
                                        <td>{getSessionStorage("nameKondisiTanah")}</td>
                                        <td>{this.state.selectedAnalisa[1]} %</td>
                                        <td>{this.state.maxPercentage[1]} %</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">4</th>
                                        <td>Kisaran cuaca</td>
                                        <td>{Math.round(JSON.parse(getSessionStorage('weather')))}<span> °C</span></td>
                                        <td>{this.state.selectedAnalisa[3]} %</td>
                                        <td>{this.state.maxPercentage[3]} %</td>
                                      </tr>
                                      <tr>
                                        <th scope="row"></th>
                                        <td></td>
                                        <td>Total</td>
                                        <th>{this.state.totalPercentage} %</th>
                                        <th>100 %</th>
                                      </tr>
                                    </tbody>
                                    </Table>
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col>
                                <Card className="mb-3">
                                  <CardHeader>Syarat Tumbuh</CardHeader>
                                  <CardBody>
                                  Budidaya ubi cilembu cocok dilakukan di wilayah tropis panas
                                  dan lembab, curah hujan ideal untuk pertumbuhan yang optimal
                                  yaitu 800-1500 meter dari permukaan laut dengan suhu lingkungan
                                  22-27°C dan kelembaban udara 60-80%. Jenis tanah yang cocok
                                  yaitu tanah andosol, lempung liat berpasir, aluvial serta tanah yang
                                  mengandung hara organik. Budidaya ubi cilembu cocok dilakukan di
                                  daerah tropis yang panas dan lembab. Suhu ideal bagi tanaman ini 
                                  adalah 21-27°C dengan dengan curah hujan 750-1500 mm per tahun.
                                  Budidaya ubi cilembu memerlukan penyinaran matahari sekitar
                                  11-12 jam sehari. Budidaya ubi cilembu di dataran rendah hingga
                                  ketinggian 500 meter dari permukaan laut, produktivitasnya dapat
                                  optimal. Namun, tanaman ini masih bisa tumbuh dengan baik pada
                                  ketinggian di atas 1000 meter, hanya saja jangka waktu tanam hingga
                                  panen menjadi lebih panjang.
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.toggle('analisa', this.state.selectedTanaman, this.state.selectedId)}>
                              Close
                            </Button>
                          </ModalFooter>
                        </Modal>

                        <Modal
                          isOpen={this.state.modal_tanam_parent}
                          toggle={this.toggle('tanam_parent', this.state.selectedTanaman, this.state.selectedId)}
                          className={this.props.className}>
                          <ModalHeader toggle={this.toggle('tanam_parent', this.state.selectedTanaman, this.state.selectedId)}>Konfirmasi Tanam</ModalHeader>
                          <ModalBody>
                            Apakah anda yang akan menanam {this.state.selectedTanaman} ?
                            <Label>
                              Tanggal mulai tanam
                            </Label>
                            <Col sm={10}>
                              <DatePicker 
                                className='form-control'
                                selected={this.state.startDate}
                                minDate={new Date()}
                                onChange={this.handleChange}
                              />
                            </Col>
                            <Modal
                              isOpen={this.state.modal_tanam}
                              toggle={this.toggle('tanam', this.state.selectedTanaman, this.state.selectedId)}
                              className={this.props.className}>
                              <ModalHeader toggle={this.toggle('tanam', this.state.selectedTanaman, this.state.selectedId)}>Sukses Tanam</ModalHeader>
                              <ModalBody>
                                Tanaman {this.state.selectedTanaman} berhasil ditambahkan!
                              </ModalBody>
                              <ModalFooter>
                                <Button color="secondary" onClick={() => window.location='/kelola'}>
                                  Lihat agenda
                                </Button>{' '}
                                <Button color="primary" onClick={this.toggle('tanam', this.state.selectedTanaman, this.state.selectedId)}>
                                  Close
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="secondary" onClick={this.addTanam(this.state.selectedTanaman, this.toggle('tanam', this.state.selectedTanaman, this.state.selectedId))}>
                              Ya
                            </Button>{' '}
                            <Button color="primary" onClick={this.toggle('tanam_parent', this.state.selectedTanaman, this.state.selectedId)}>
                              Close
                            </Button>
                          </ModalFooter>
                        </Modal>

                        <Modal
                          isOpen={this.state.modal_export}
                          toggle={this.toggleExport}
                          className="modal-dialog-centered">
                          <ModalHeader toggle={this.toggleModal}>Export To Excel</ModalHeader>
                          <ModalBody>
                            <FormGroup>
                              <Input
                                type="text"
                                value={this.state.fileName}
                                onChange={e => this.setState({ fileName: e.target.value })}
                                placeholder="Enter File Name"
                              />
                            </FormGroup>
                            <FormGroup>
                              <CustomInput
                                type="select"
                                id="selectFileFormat"
                                name="customSelect"
                                value={this.state.fileFormat}
                                onChange={e => this.setState({ fileFormat: e.target.value })}>
                                <option>xlsx</option>
                                <option>csv</option>
                                {/* <option>txt</option> */}
                              </CustomInput>
                            </FormGroup>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.handleExport}>
                              Export
                            </Button>
                            <Button color="flat-danger" onClick={this.toggleExport}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>

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
};

export default FormPage;

import Page from 'components/Page';
import ReactDOM from "react-dom"
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CustomInput,
} from 'reactstrap';
import {
  MdSearch,
} from 'react-icons/md';
import XLSX from "xlsx"
import * as FileSaver from "file-saver"
import axios from 'axios';


class FormPage extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:4000/api/konsultasi`)
    .then(res => this.setState({konsultasi: res.data}))
    axios.get(`http://localhost:4000/api/musim`)
    .then(res => this.setState({musim: res.data}))
    axios.get(`http://localhost:4000/api/ketinggian`)
    .then(res => this.setState({ketinggian: res.data}))
    axios.get(`http://localhost:4000/api/tanah`)
    .then(res => this.setState({tanah: res.data}))
  }

  state = {
    musim: [],
    ketinggian: [],
    tanah: [],
    modal_edit: false,
    modal_export: false,
    konsultasi: [],
    filteredData: [],
    selectedData: {},
    value: "",
    fileName: "",
    fileFormat: "xlsx",
    username: "",
    email: "",
    name: "",
    password: "",
    isAdmin: 1,
  };

  toggle = (modalType, selected) => () => {
    if (!modalType) {
      return this.setState({
        modal_edit: !this.state.modal_edit,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
      username: "",
      email: "",
      name: "",
      password: ""
    });

    if(selected){
      this.setState({selectedData: selected})
    }
  };

  handleFilter = e => {
    let data = this.state.konsultasi
    let filteredData = []
    let value = e.target.value
    this.setState({ value })
    if (value.length) {
      filteredData = data.filter(col => {
        let startsWithCondition =
        col.id
          .toString()
          .toLowerCase()
          .startsWith(value.toLowerCase()) ||
        col.konselor.toLowerCase().startsWith(value.toLowerCase()) ||
        col.musim.toLowerCase().startsWith(value.toLowerCase()) ||
        col.ketinggian.toLowerCase().startsWith(value.toLowerCase()) ||
        col.tanah.toLowerCase().startsWith(value.toLowerCase()) ||
        col.suhu.toLowerCase().startsWith(value.toLowerCase())

        let includesCondition =
        col.id
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        col.konselor.toLowerCase().includes(value.toLowerCase()) ||
        col.musim.toLowerCase().includes(value.toLowerCase()) ||
        col.ketinggian.toLowerCase().includes(value.toLowerCase()) ||
        col.tanah.toLowerCase().includes(value.toLowerCase()) ||
        col.suhu.toLowerCase().includes(value.toLowerCase())

        if (startsWithCondition) return startsWithCondition
        else if (!startsWithCondition && includesCondition)
          return includesCondition
        else return null
      })
      this.setState({ value, filteredData })
    }
  }

  toggleExport = () => {
    this.setState({ modal_export: !this.state.modal_export })
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

  handleSave = (toggle) => {
    axios.put("http://localhost:4000/api/update-konsultasi/" + this.state.selectedData.id, {
      musim: this.state.selectedData.musim,
      ketinggian: this.state.selectedData.ketinggian,
      tanah: this.state.selectedData.tanah,
      suhu: this.state.selectedData.suhu,
    })
    .then(response => {
      toggle()
      axios.get(`http://localhost:4000/api/konsultasi`)
      .then(res => this.setState({konsultasi: res.data}))
    })
    .catch(response => {
      console.log(response)
    })
  }

  handleDelete = (toggle) => {
    axios.delete("http://localhost:4000/api/delete-konsultasi/" + this.state.selectedData.id)
    .then(response => {
      toggle()
      axios.get(`http://localhost:4000/api/konsultasi`)
      .then(res => this.setState({konsultasi: res.data}))
    })
    .catch(response => {
      console.log(response)
    })
  }

  handleAdd = (toggle) => {
    if(this.state.username === '' || this.state.email === '' || this.state.name === '' || this.state.password === ''){
      alert("Data tidak boleh kosong!")
    } else {
      axios.post("http://localhost:4000/api/add-user", {
        username: this.state.username,
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        isAdmin: this.state.isAdmin
      })
      .then(response => {
        toggle()
        console.log(response)
        axios.get(`http://localhost:4000/api/konsultasi`)
        .then(res => this.setState({konsultasi: res.data}))
      })
      .catch(response => {
        console.log(response)
      })
    }
  }

  handleChange = (e) => {
    this.setState({isAdmin: e.target.value})
  }

  handleChange = (where, e) => {
    if(where === 'valueMusim'){
      this.setState({ selectedData: {...this.state.selectedData, musim: e.target.value }})
    }
    if(where === 'valueKetinggian'){
      this.setState({ selectedData: {...this.state.selectedData, ketinggian: e.target.value }})
    }
    if(where === 'valueKondisiTanah'){
      this.setState({ selectedData: {...this.state.selectedData, tanah: e.target.value }})
    }
  }

  render() {
    let array = this.state.value ? this.state.filteredData : this.state.konsultasi
    let renderTableData = array.map((user ,i) => {
      return (
        <tr key={user.id}>
          <th scope="row">{i + 1}</th>
          <td>{user.konselor}</td>
          <td>{user.musim}</td>
          <td>{user.ketinggian}</td>
          <td>{user.tanah}</td>
          <td>{user.suhu} °C</td>
          <td>
            <Button type='button' onClick={this.toggle('edit', user)}>Ubah</Button>
            <Button className="ml-1" color="danger" type='button' onClick={this.toggle('delete', user)}>Hapus</Button>
          </td>
        </tr>
      )
    })
    return (
      <Page title="List Konsultasi" breadcrumbs={[{ name: 'Konsultasi', active: true }]}>
        <Row>
          <Col>
            <Card>
              <CardHeader className="d-flex flex-wrap justify-content-between mb-1">
                <Label>User List</Label>
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
                      <th>Konselor</th>
                      <th>Musim</th>
                      <th>Ketinggian</th>
                      <th>Tanah</th>
                      <th>Suhu</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableData}
                  </tbody>
                  {/* <tfoot>
                    <Button color="primary" type='button' onClick={this.toggle('add')}>Tambah Konsultasi</Button>
                  </tfoot> */}
                </Table>

                <Modal
                  isOpen={this.state.modal_edit}
                  toggle={this.toggle('edit')}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle('edit')}>Ubah data</ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="exampleEmail">Konselor</Label>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={this.state.selectedData.konselor}
                        placeholder="konselor"
                        disabled
                        onChange={e => this.setState({ selectedData: {...this.state.selectedData, konselor: e.target.value }})}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Musim</Label>
                      <Input type="select" name="komoditi" defaultValue={this.state.selectedData.musim} onChange={(e) => this.handleChange("valueMusim", e)}>
                        {this.state.musim.map(musim => (
                          <option key={musim.id} value={musim.name}>{musim.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Ketinggian</Label>
                      <Input type="select" name="komoditi" defaultValue={this.state.selectedData.ketinggian} onChange={(e) => this.handleChange("valueKetinggian", e)}>
                        {this.state.ketinggian.map(ketinggian => (
                          <option key={ketinggian.id} value={ketinggian.name}>{ketinggian.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Tanah</Label>
                      <Input type="select" name="komoditi" defaultValue={this.state.selectedData.tanah} onChange={(e) => this.handleChange("valueKondisiTanah", e)}>
                        {this.state.tanah.map(tanah => (
                          <option key={tanah.id} value={tanah.name}>{tanah.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Suhu</Label>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={this.state.selectedData.suhu}
                        placeholder="suhu"
                        onChange={e => this.setState({ selectedData: {...this.state.selectedData, suhu: e.target.value }})}
                      />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => this.handleSave(this.toggle('edit'))}>
                      Simpan
                    </Button>
                    <Button color="primary" onClick={this.toggle('edit')}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>

                <Modal
                  isOpen={this.state.modal_delete}
                  toggle={this.toggle('delete')}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle('delete')}>Hapus data</ModalHeader>
                  <ModalBody>
                    Apakah anda yakin untuk menghapus data ini ?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => this.handleDelete(this.toggle('delete'))}>
                      Yes
                    </Button>
                    <Button color="secondary" onClick={this.toggle('delete')}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* <Modal
                  isOpen={this.state.modal_add}
                  toggle={this.toggle('add')}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle('add')}>Tambah data</ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={this.state.username}
                        placeholder="username"
                        onChange={e => this.setState({ username: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={this.state.email}
                        placeholder="Email"
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={this.state.name}
                        placeholder="Name"
                        onChange={e => this.setState({ name: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Password</Label>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={this.state.password}
                        placeholder="Password"
                        onChange={e => this.setState({ password: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Hak Akses</Label>
                      <Input type="select" name="previlage" onChange={this.handleChange}>
                        <option value={1}>Admin</option>
                        <option value={0}>Petani</option>
                      </Input>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => this.handleAdd(this.toggle('add'))}>
                      Simpan
                    </Button>
                    <Button color="primary" onClick={this.toggle('add')}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal> */}

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
      </Page>
    );
  };
};

export default FormPage;

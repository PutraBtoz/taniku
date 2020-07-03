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
    axios.get(`http://localhost:4000/api/penyakit`)
    .then(res => this.setState({penyakit: res.data}))
  }

  state = {
    modal_edit: false,
    modal_export: false,
    penyakit: [],
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
    console.log(modalType);
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
    let data = this.state.penyakit
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

  render() {
    let array = this.state.value ? this.state.filteredData : this.state.penyakit
    let renderTableData = array.map((user ,i) => {
      return (
        <tr key={user.id}>
          <th scope="row">{i + 1}</th>
          <td>{user.name}</td>
          <td>{user.ciri}</td>
          <td>{user.pengendalian}</td>
          {/* <td>{user.name}</td> */}
          {/* <td>
            <Button type='button' onClick={this.toggle('edit', user)}>Ubah</Button>
            <Button className="ml-1" color="danger" type='button' onClick={this.toggle('delete', user)}>Hapus</Button>
          </td> */}
        </tr>
      )
    })
    return (
      <Page title="List penyakit" breadcrumbs={[{ name: 'Users', active: true }]}>
        <Row>
          <Col>
            <Card>
              <CardHeader className="d-flex flex-wrap justify-content-between mb-1">
                <Label>penyakit List</Label>
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
                      <th>Nama penyakit</th>
                      <th>Ciri</th>
                      <th>Penanganan</th>
                      {/* <th>Name</th>
                      <th>Aksi</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableData}
                  </tbody>
                  {/* <tfoot>
                    <Button color="primary" type='button' onClick={this.toggle('add')}>Tambah User</Button>
                  </tfoot> */}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  };
};

export default FormPage;

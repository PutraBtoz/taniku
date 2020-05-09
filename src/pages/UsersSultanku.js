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
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';


class FormPage extends React.Component {
  state = {
    startDate: new Date(),
    modal_edit: false,
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
    });
  };

  render() {
    return (
      <Page title="Users" breadcrumbs={[{ name: 'Users', active: true }]}>
        <Row>
          <Col>
            <Card>
              <CardHeader>Users List</CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>admin</td>
                      <th>123456</th>
                      <td>admin@gmail.com</td>
                      <td>Admin</td>
                      <td><Button type='button' onClick={() => console.log("Rubah")}>Ubah</Button></td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>tani</td>
                      <th>123456</th>
                      <td>tani@gmail.com</td>
                      <td>Tani</td>
                      <td><Button type='button' onClick={() => console.log("Rubah")}>Ubah</Button></td>
                    </tr>
                  </tbody>
                </Table>

                <Modal
                  isOpen={this.state.modal_analisa}
                  toggle={this.toggle('analisa')}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle('analisa')}>Analisa {this.state.selectedTanaman}</ModalHeader>
                  <ModalBody>
                    Update berhasil!
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle('analisa')}>
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

export default FormPage;

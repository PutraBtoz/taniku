import Image1 from 'assets/img/bg/TKI-Sumbangan-Ketela.jpg';
import Image2 from 'assets/img/bg/Manfaat-Ubi-Jalar-Ungu.jpeg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import bg3Image from 'assets/img/bg/background_640-3.jpg';
import user1Image from 'assets/img/users/100_1.jpg';
import { UserCard } from 'components/Card';
import Page from 'components/Page';
import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';

const CardPage = () => {
  return (
    <Page title="Berita Taniku" breadcrumbs={[{ name: 'berita', active: true }]}>
      <Row>
        <Col md={6} sm={6} xs={12} className="mb-3">
          <Card>
            <CardImg top src={Image1} />
            <CardBody>
              <CardTitle>TKI Malaysia Sumbang Ubi Jalar 1 Ton untuk Sesama Pekerja</CardTitle>
              <CardText>
                Sejumlah Tenaga Kerja Indonesia (TKI) yang bekerja di kebun Sungai Pelek Sepang, Negara Bagian Selangor, Malaysia menyumbangkan ubi jalar sebanyak satu ton untuk teman-temannya sesama pekerja terdampak isolasi wilayah atau Perintah Kawalan Pergerakan (PKP) dalam mencegah virus Covid-19.
              </CardText>
              <CardLink tag="a" href="#">
                Read More
              </CardLink>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} sm={6} xs={12} className="mb-3">
          <Card>
            <CardImg top src={Image2} />
            <CardBody>
              <CardTitle>Ubi Ungu Lancarkan Sirkulasi Darah</CardTitle>
              <CardText>
                Asupan bermanfaat bagi kesehatan cukup beragam jenisnya, bahkan mudah ditemukan di pasaran dan harganya terjangkau. Sebagian lagi mudah juga dibudidayakan di kebun atau pekarangan rumah, sehingga sewaktu-waktu membutuhkan tinggal mengambil atau memanen. Satu di antaranya ubi jalar yang dapat dimanfaatkan bagian umbi maupun daun-daunnya
              </CardText>
              <CardLink tag="a" href="#">
                Read More
              </CardLink>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default CardPage;

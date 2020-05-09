import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import ReactTooltip from "react-tooltip";
import { getColor } from 'utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    axios.get(`http://localhost:4000/api/gis`)
    .then(res => this.setState({dataGis: res.data}))
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  state = {
    content: "",
    dataGis: []
  }

  handleContent = (city) => {
    this.setState({content: city})
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Sigap"
              subtitle="This month"
              number="26"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Lapor"
              subtitle="This month"
              number="12"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Visitors"
              subtitle="This month"
              number="500"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Users"
              subtitle="This month"
              number="20"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>

        </Row>

        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            {/* <Card>
              <CardHeader>
                Total Revenue{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card> */}
            <Card>
              <CardHeader>
                Geographic Information System - Data Pelaporan Konsultasi
              </CardHeader>
              <CardBody>
                <MapWithBubbles setTooltipContent={this.handleContent} dataGis={this.state.dataGis} />
                <ReactTooltip id="map">{this.state.content}</ReactTooltip>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <CardGroup style={{ marginBottom: '1rem' }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            title="50+ Likes"
            subtitle="Post you like"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="10+ Comments"
            subtitle="New Comments"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdShare}
            title="30+ Shares"
            subtitle="New Shares"
          />
        </CardGroup>

        <Row>
        <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Total Consul</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Malang{' '}
                  <Badge color="secondary">30 result</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Madiun{' '}
                  <Badge color="secondary">20 result</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Surabaya{' '}
                  <Badge color="secondary">20 result</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Jakarta{' '}
                  <Badge color="secondary">10 result</Badge>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
          <Col md="8" sm="12" xs="12">
              <Card>
                <CardHeader>New Products</CardHeader>
                <CardBody>
                  {productsData.map(
                    ({ id, image, title, description, right }) => (
                      <ProductMedia
                        key={id}
                        image={image}
                        title={title}
                        description={description}
                        right={right}
                      />
                    ),
                  )}
                </CardBody>
              </Card>
            </Col>
        </Row>
          {/* <Col md="8" sm="12" xs="12">
            <Card>
              <CardHeader>New Users</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'date',
                    'participation',
                    '%',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col> */}


          {/* <Row>
            <Col lg={4} md={4} sm={12} xs={12}>
              <Card>
                <Line
                  data={getStackLineChart({
                    labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                    ],
                    data: [0, 13000, 5000, 24000, 16000, 25000, 10000],
                  })}
                  options={stackLineChartOptions}
                />
                <CardBody
                  className="text-primary"
                  style={{ position: 'absolute' }}
                >
                  <CardTitle>
                    <MdInsertChart /> Sales
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4} md={4} sm={12} xs={12}>
              <Card>
                <Line
                  data={getStackLineChart({
                    labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                    ],
                    data: [10000, 15000, 5000, 10000, 5000, 10000, 10000],
                  })}
                  options={stackLineChartOptions}
                />
                <CardBody
                  className="text-primary"
                  style={{ position: 'absolute' }}
                >
                  <CardTitle>
                    <MdInsertChart /> Revenue
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <Card>
                <Line
                  data={getStackLineChart({
                    labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                    ],
                    data: [0, 13000, 5000, 24000, 16000, 25000, 10000].reverse(),
                  })}
                  options={stackLineChartOptions}
                />
                <CardBody
                  className="text-primary"
                  style={{ position: 'absolute', right: 0 }}
                >
                  <CardTitle>
                    <MdInsertChart /> Profit
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row> */}

        {/* <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: secondaryColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col>

          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Map with bubbles
              </CardHeader>
              <CardBody>
                <MapWithBubbles />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <CardDeck style={{ marginBottom: '1rem' }}>
          <Card body style={{ overflowX: 'auto','paddingBottom':'15px','height': 'fit-content','paddingTop': 'inherit'}}>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
            />
          </Card>

          <Card body style={{ overflowX: 'auto','paddingBottom':'15px','height': 'fit-content','paddingTop': 'inherit'}}>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
              reversed
            />
          </Card>
        </CardDeck>

        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="gradient-secondary"
              header="Announcement"
              avatarSize={60}
              name="Jamy"
              date="1 hour ago"
              text="Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy euismod tinciduntut laoreet doloremagna"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Support Tickets</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <TodosCard todos={todosData} />
          </Col>
        </Row> */}
      </Page>
    );
  }
}
export default DashboardPage;

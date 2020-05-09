import Page from 'components/Page';
import UserEvent from 'assets/calendar/user-calendar.json';
import React from 'react';
import axios from 'axios';
import { Col, Row } from 'reactstrap';
import { getColor } from 'utils/colors';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss' ;
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';
import { getUser } from '../utils/Common';

const localizer = momentLocalizer(moment)

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

const user = getUser();

class KelolaPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    axios.get(`http://localhost:4000/api/agenda/` + user.id)
    .then(res => this.setState({agenda: res.data}))
  }

  state = {
    agenda: []
  };

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="KelolaPage"
        title="Kelola"
        breadcrumbs={[{ name: 'kelola', active: true }]}
      >

        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Calendar
              onSelectEvent={(e) => console.log(e)}
              selectable
              popup
              localizer={localizer}
              events={this.state.agenda}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              views={['month', 'agenda']}
              components={{
                month: {
                  dateHeader: ({ date, label }) => {
                    let highlightDate =
                      this.state.agenda.find(event =>
                        moment(date) < today.setHours(0,0,0,0)
                        )
                    return (
                      <h5 style={highlightDate ? { color: "grey" } : null}>{label}</h5>
                    );
                  },
                  // dateCellWrapper: ({children, range, value}) => {
                  //   let highlightDate =
                  //     this.state.agenda.find(event =>
                  //       moment(value) < today.setHours(0,0,0,0)
                  //       )
                  //   return (
                  //     <div style={highlightDate ? { color: "grey" } : null}>{children}</div>
                  //   );
                  // }
                }
              }}
            />
          </Col>
        </Row>
      </Page>
    );
  }
}
export default KelolaPage;

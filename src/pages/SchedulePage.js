import ScheduleContainer from "../containers/ScheduleContainer"
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router";
function SchedulePage() {
    const {id} = useParams();
    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <ScheduleContainer id = {id}/>
                </Col>
            </Row>
        </Container>
    )
}

export default SchedulePage;
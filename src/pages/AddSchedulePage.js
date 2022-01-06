import AddScheduleContainer from "../containers/AddScheduleContainer"
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router";
function AddSchedulePage() {
    const {computerId} = useParams();
    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <AddScheduleContainer computerId = {computerId}/>
                </Col>
            </Row>
        </Container>
    )
}

export default AddSchedulePage;
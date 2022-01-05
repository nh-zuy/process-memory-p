import DashboardContainer from "../containers/DashboardContainer";

import { Container, Row, Col } from "reactstrap";

function DashboardPage() {
    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <DashboardContainer />
                </Col>
            </Row>
        </Container>
    );
}

export default DashboardPage;
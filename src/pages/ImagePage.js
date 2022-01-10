import ImageContainer from "../containers/ImageContainer";

import { Container, Row, Col } from "reactstrap";

function ImagePage() {
    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <ImageContainer />
                </Col>
            </Row>
        </Container>
    );
}

export default ImagePage;
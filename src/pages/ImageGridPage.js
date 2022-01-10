import ImageGridContainer from "../containers/ImageGridContainer";

import { Container, Row, Col } from "reactstrap";

function ImageGridPage() {
    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <ImageGridContainer />
                </Col>
            </Row>
        </Container>
    );
}

export default ImageGridPage;
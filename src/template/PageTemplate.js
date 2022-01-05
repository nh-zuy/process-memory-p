import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import { Container } from "reactstrap";

import Footer from "./../partials/Footer";

function PageTemplate({header, page}) {
    return (
        <Fragment>
            {header}

            <main>
                <Container>
                    {page}
                </Container>
            </main>

            <footer>
                <Footer />
            </footer>
        </Fragment>
    );
}
import { Component } from 'react';
import {
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Button,
} from 'reactstrap';

import firebase from "./../firebase";
import { getDatabase, ref, child, get } from "firebase/database";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            computerId: '',
            parentKey: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        this.setState({
            [name]: value,
        });
    };

    async submitForm(e) {
        e.preventDefault();
        
        let data = null;
        const dbRef = ref(getDatabase(firebase));
        await get(child(dbRef, `users/${this.state.computerId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
            }
        }).catch((error) => {
            console.error(error);
        });
        
        if (data.parentKey === this.state.parentKey) {
            this.props.setLogin(data);
        }
    }

    render() {

        return (
            <div className="login">
                <h2>Đăng nhập</h2>
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup>
                        <Label>Computer ID</Label>
                        <Input
                            type="text"
                            name="computerId"
                            id="computerId"
                            value={this.state.computerId}
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                        />
                    </FormGroup>
                    <FormFeedback>
                        {this.state.error}
                    </FormFeedback>
                    <FormGroup>
                        <Label for="examplePassword">Parent Key</Label>
                        <Input
                            type="password"
                            name="parentKey"
                            id="parentKey"
                            value={this.state.parentKey}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </FormGroup>
                    <Button color="primary">Đăng nhập</Button>
                </Form>
            </div>
        );
    }
}

export default LoginPage;
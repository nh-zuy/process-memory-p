import { useState } from "react";
import { FormGroup, Label, Input, Form, FormText, Button } from "reactstrap";

import { getDatabase, ref, push, child, update} from "firebase/database";
import firebase from "../firebase";

function AddScheduleContainer(props) {
    const [schedule, setSchedule] = useState({});

    const handleInputChange = (event) => {
        const key = event.target.id;
        switch (key) {
            case "F":
                Object.assign(schedule, {"f": event.target.value});
                break;
            case "T":
                Object.assign(schedule, {"t": event.target.value});
                break;
            case "D":
                Object.assign(schedule, {"d": event.target.value});
                break;
            case "I":
                Object.assign(schedule, {"i": event.target.value});
                break;
            case "S":
                Object.assign(schedule, {"s": event.target.value});
                break;
            default:
                break;
        }
        
        setSchedule(schedule);
    }

    const handleSubmit = () => {
        const db = getDatabase(firebase);
        const newScheduleKey = push(child(ref(db), 'schedules/' + props.computerId)).key;
        const updates = {};
        updates['schedules/' + props.computerId + "/" + newScheduleKey] = schedule;
        update(ref(db), updates);
        alert("Thêm thành công.");
    }

    return (
        <Form method="post">
            <h1 className="text-center">Thời gian biểu</h1>
            <FormText>
                <h3 className="text-center">Lịch sử dụng máy tính trong ngày</h3>
            </FormText>
            
            <FormGroup>
                <Label for="F">
                Giờ bắt đầu
                </Label>
                <Input
                id="F"
                name="f"
                placeholder="datetime placeholder"
                type="time"
                defaultValue={schedule.f}
                onChange={handleInputChange}
                />
            </FormGroup>

            <FormGroup>
                <Label for="T">
                Giờ kết thúc
                </Label>
                <Input
                id="T"
                name="t"
                placeholder="datetime placeholder"
                type="time"
                defaultValue={schedule.t}
                onChange={handleInputChange}
                />
            </FormGroup>


            <FormGroup>
                <Label for="D">
                Thời gian sử dụng
                </Label>
                <Input
                id="D"
                name="d"
                placeholder="0"
                type="number"
                defaultValue={schedule.d}
                onChange={handleInputChange}
                />
            </FormGroup>


            <FormGroup>
                <Label for="I">
                Thời gian nghỉ
                </Label>
                <Input
                id="I"
                name="i"
                placeholder="0"
                type="number"
                defaultValue={schedule.i}
                onChange={handleInputChange}
                />
            </FormGroup>


            <FormGroup>
                <Label for="S">
                Tổng thời gian
                </Label>
                <Input
                id="S"
                name="s"
                placeholder="0"
                type="number"
                defaultValue={schedule.s}
                onChange={handleInputChange}
                />
            </FormGroup>
            
            <FormGroup>
                <Button className="mr-5 btn btn-success" onClick={() => handleSubmit()}>Thêm</Button>
                <input type="reset" className="btn btn-danger"/>
            </FormGroup>
        </Form>
    )
}

export default AddScheduleContainer;
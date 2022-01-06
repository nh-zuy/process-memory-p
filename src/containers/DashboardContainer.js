import React, { Fragment, useEffect, useState } from "react";
import { Table, Button } from "reactstrap";

import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebase from "./../firebase";

function DashboardContainer() {
    const [schedules, setSchedules] = useState({});
    const [computerId, setComputerId] = useState(null);

    function objectToArray(obj) {
        const keys = Object.keys(obj);
        const map = new Map();
        for(let i = 0; i < keys.length; i++){
           map.set(keys[i], obj[keys[i]]);
        };
        return Array.from(map, ([index, value]) => ({index, value}));
     };

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('login'));
        const computerId = login.computerId;
        setComputerId(computerId);

        const db = getDatabase(firebase);
        const starCountRef = ref(db, 'schedules/' + computerId);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setSchedules(data);
            console.log(objectToArray(data));
        });
    }, []);

    const handleDelete = (computerID, index) => {
        const db = getDatabase(firebase);
        const starCountRef = ref(db, 'schedules/' + computerID + "/" + index);
        remove(starCountRef);
    }

    return (
        <Fragment>
            <h1 className="text-center ">Khung Giờ Sử Dụng Máy Tính</h1>
            <a className="ml-5 btn btn-success" href={"/schedules/" + computerId + "/add"}>Thêm khung giờ</a>
            <Table responsive>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Giờ bắt đầu
                        </th>
                        <th>
                            Giờ kết thúc
                        </th>
                        <th>
                            Thời gian sử dụng
                        </th>
                        <th>
                            Thời gian nghỉ
                        </th>
                        <th>
                            Tổng thời gian
                        </th>
                        <th>#</th>
                    </tr>
                </thead>

                <tbody>
                    {schedules && objectToArray(schedules).map((schedule, index) => (
                        <tr key={index} >
                            <th scope="row">
                                {index}
                            </th>
                            <td>
                                {schedule.value.f}
                            </td>
                            <td>
                                {schedule.value.t}
                            </td>
                            <td>
                                {schedule.value.d}
                            </td>
                            <td>
                                {schedule.value.i}
                            </td>
                            <td>
                                {schedule.value.s}
                            </td>
                            <td>
                                <a className="mr-5 btn btn-warning" href={"/schedule/" + computerId + "/" + schedule.index}>Cập nhật</a>
                                <Button className="ml-5 btn btn-danger" onClick={() => handleDelete(computerId, schedule.index)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Fragment>
    )
}

export default DashboardContainer;
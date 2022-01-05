import React, { Fragment, useEffect, useState } from "react";
import { Table, Button } from "reactstrap";

import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebase from "./../firebase";

function DashboardContainer() {
    const [schedules, setSchedules] = useState([]);
    const [computerId, setComputerId] = useState(null);

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('login'));
        const computerId = login.computerId;
        setComputerId(computerId);

        const db = getDatabase(firebase);
        const starCountRef = ref(db, 'schedules/' + computerId);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setSchedules(data);
            console.log(data);
        });
    }, []);

    const handleDelete = (computerID, index) => {
        const db = getDatabase(firebase);
        const starCountRef = ref(db, 'schedules/' + computerID + "/" + index);
        remove(starCountRef);
    }

    return (
        <Fragment>
            <h1 className="text-center ">Danh sách các máy quản lí.</h1>

            <Table responsive>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Máy
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
                    {schedules && schedules.map((schedule, index) => (
                        <tr key={index} >
                            <th scope="row">
                                {index}
                            </th>
                            <td>
                                {index}
                            </td>
                            <td>
                                {schedule.f}
                            </td>
                            <td>
                                {schedule.t}
                            </td>
                            <td>
                                {schedule.d}
                            </td>
                            <td>
                                {schedule.i}
                            </td>
                            <td>
                                {schedule.s}
                            </td>
                            <td>
                                <a className="mr-5 btn btn-warning" href={"/schedule/" + computerId + "/" + index}>Cập nhật</a>
                                <Button className="ml-5 btn btn-danger" onClick={() => handleDelete(computerId, index)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Fragment>
    )
}

export default DashboardContainer;
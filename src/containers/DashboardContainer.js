import React, { Fragment, useEffect, useState } from "react";
import { Table, Button } from "reactstrap";

import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebase from "./../firebase";

function DashboardContainer() {
    const [schedules, setSchedules] = useState({});
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

    const handleDelete = (id) => {
        const db = getDatabase(firebase);
        const starCountRef = ref(db, 'schedules/' + id);
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
                    {schedules && <tr key={1} >
                        <th scope="row">
                            1
                        </th>
                        <td>
                            1
                        </td>
                        <td>
                            {schedules.f}
                        </td>
                        <td>
                            {schedules.t}
                        </td>
                        <td>
                            {schedules.d}
                        </td>
                        <td>
                            {schedules.i}
                        </td>
                        <td>
                            {schedules.s}
                        </td>
                        <td>
                            <a className="mr-5 btn btn-warning" href={"/schedule/" + computerId}>Cập nhật</a>
                            <Button className="ml-5 btn btn-danger" onClick={() => handleDelete(computerId)}>Xóa</Button>
                        </td>
                    </tr>}

                </tbody>
            </Table>
        </Fragment>
    )
}

export default DashboardContainer;
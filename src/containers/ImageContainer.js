import React, { Fragment, useEffect, useState } from "react";
import { Table, Button } from "reactstrap";

import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import firebase from "../firebase";

function ImageContainer() {
    const [folders, setFolders] = useState([]);
    const [images, setImages] = useState([]);
    const [computerId, setComputerId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const login = JSON.parse(localStorage.getItem('login'));
        const computerId = login.computerId;
        setComputerId(computerId);

        const db = getStorage(firebase, "gs://process-memory-management.appspot.com");
        const imagesRef = ref(db, 'images/' + computerId);
        let folderPaths = [];
        let imagePaths = [];
        await listAll(imagesRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    folderPaths.push(folderRef);
                });

                res.items.forEach((itemRef) => {
                    imagePaths.push(itemRef);
                });
            }).catch((error) => {
                console.log(error);
            });
        setFolders(folderPaths);
        setImages(imagePaths);
    }

    const handleDelete = (path) => {
        console.log(path);
        const db = getStorage(firebase, "gs://process-memory-management.appspot.com");
        const imagesRef = ref(db, path);
        listAll(imagesRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    deleteObject(ref(db, itemRef._location.path));
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    //setInterval(fetchData, 5000);

    return (
        <Fragment>
            <h1 className="text-center ">Nhật ký ảnh</h1>

            <Table responsive>
                <thead>
                    <tr>
                        <th colSpan={1}>ID</th>
                        <th>
                            Ngày
                        </th>
                        <th>Hosting</th>
                        <th>Đường dẫn</th>
                        <th>#</th>
                    </tr>
                </thead>

                <tbody>
                    {folders && folders.map((folder, index) => (
                        <tr key={index} >
                            <th scope="row" colSpan={1}>
                                {index}
                            </th>
                            <td >
                                <a href={folder._location.path}>{folder.name}</a>
                            </td>
                            <td>
                                {folder.bucket}
                            </td>
                            <td>{folder._location.path}</td>
                            <td>
                                <a href={folder._location.path} className="btn btn-primary">Xem</a>
                                <Button className="ml-5 btn btn-danger" onClick={() => handleDelete(folder._location.path)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}

                    {images && images.map((image, index) => (
                        <tr key={index} >
                            <th scope="row" colSpan={1}>
                                {index}
                            </th>
                            <td >
                                <a href={image._location.path}>{image.name}</a>
                            </td>
                            <td>
                                {image.bucket}
                            </td>
                            <td>{image._location.path}</td>
                            <td>
                                <a href={""} className="btn btn-primary">Xem</a>
                                <Button className="ml-5 btn btn-danger" onClick={() => handleDelete(image._location.path)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Fragment>
    )
}

export default ImageContainer;
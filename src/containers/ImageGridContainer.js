import React, { Fragment, useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { motion } from 'framer-motion';

import { getStorage, ref, listAll, deleteObject, getDownloadURL } from "firebase/storage";
import firebase from "../firebase";

import ImageGrid from "../components/ImageGrid";
import Modal from "./../components/Modal";

function ImageGridContainer() {
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const db = getStorage(firebase, "gs://process-memory-management.appspot.com");
        const imagesRef = ref(db, window.location.pathname);
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
        setImages(imagePaths);

        imagePaths.forEach((image, index) => {
            downloadImage(index, image);
        })
    }

    const downloadImage = (index, image) => {
        const db = getStorage(firebase, "gs://process-memory-management.appspot.com");
        const pathReference = ref(db, image._location.path);
        getDownloadURL(pathReference).then((url) => {
            const img = document.getElementById(index);
            img.setAttribute("src", url);
        });
    }

    //setInterval(fetchData, 5000);

    return (
        <Fragment>
            <h1 className="text-center ">Ảnh Ghi Hình</h1>

            <div className="img-grid">
                {images && images.map((image, index) => (
                    <motion.div
                        className="img-wrap"
                        key={index}
                        layout
                        whileHover={{ opacity: 1 }}
                        onClick={() => setSelectedImg(image)}
                    >
                        <motion.img
                            id={index}
                            src=""
                            key={index}
                            alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
            </div>

            {selectedImg && (
                <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
        </Fragment>
    )
}

export default ImageGridContainer;
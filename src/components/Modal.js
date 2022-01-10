import React from 'react';
import { motion } from 'framer-motion';

import firebase from "../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Modal = ({ setSelectedImg, selectedImg }) => {
    const downloadImage = async (image) => {
        const db = getStorage(firebase, "gs://process-memory-management.appspot.com");
        const pathReference = ref(db, image._location.path);
        getDownloadURL(pathReference).then((url) => {
            const img = document.getElementById("modal");
            img.setAttribute("src", url);
        })
    }

    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }

    downloadImage(selectedImg);

    return (
        <motion.div className="backdrop" onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.img 
                alt="enlarged pic"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                id="modal"
            />
        </motion.div>
    )
}

export default Modal;
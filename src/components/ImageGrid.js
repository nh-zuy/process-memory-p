import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';

import firebase from "../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ImageGrid = ({ setSelectedImg, images }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const queries = images.map(image => downloadImage(image));
        setData(data);
        console.log(queries);
    }, []);

    const downloadImage = async (image) => {
        const db = getStorage(firebase, "gs://process-memory-management.appspot.com");
        const pathReference = ref(db, image._location.path);
        const url = await getDownloadURL(pathReference);
        return url;
    }

    return (
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
                        src={data[index]} 
                        key={index} 
                        alt="uploaded pic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;
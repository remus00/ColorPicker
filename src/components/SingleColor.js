import React, {useState, useEffect} from "react";
import { rgbToHex } from "../utils/helpers.js";

const SingleColor = ({rgb, type, weight}) => {
    const [message, setMessage] = useState(false)
    const copiaColore = () =>{
        navigator.clipboard.writeText(rgbToHex(...rgb)) //per copiare negli appunti
        .then(() => setMessage(true))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(false)
        }, 3000);
        return () => clearTimeout(timer)
    }, [message])
    return <article onClick={copiaColore}
                className={`single-color ${type}`}
                style={{backgroundColor: rgbToHex(...rgb)}}>
                <h5>{rgbToHex(...rgb)}</h5>
                {
                    message && <p>Colore Copiato</p>
                }
            </article>;
};

export default SingleColor;

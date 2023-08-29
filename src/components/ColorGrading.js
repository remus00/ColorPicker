import React, { useState, useEffect } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";
import { v4 as uuidv4 } from "uuid";


const ColorGrading = () => {
    const [isError, setIsError] = useState(false);

    const [selectedColor, setSelectedColor] = useState([]);

    const [colorInput, setColorInput] = useState({
        color: '',
        qty: 10
    });

    // const color = new Values('hsl(204deg 100% 50% / 1)')
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(colorInput.color && colorInput.qty){
            const {color, qty} = colorInput;
            try {
                setColorInput({qty: 10, color: ""})
                setSelectedColor(
                    new Values(color).all(Math.round(100/parseInt(qty, 10))*2)
                )
            } catch (error) {
                setIsError(true);
            }

        }
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
        if(isError){
            setIsError(false);
        }
        const {name, value} = e.target;
        setColorInput({...colorInput, [name]: value})
    }

    useEffect(() => {
        setColorInput({qty: 10, color: ""})
        setSelectedColor(
            new Values("#1194ec").all(Math.round(100/10)*2)
        )
    }, [])

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input 
                        type="text" 
                        name="color" 
                        id="color" 
                        value={colorInput.color} 
                        maxLength={7}
                        onChange={handleChange}
                        className="input"
                        placeholder="Insert hex #color"
                        >
                    </input>
                    <input 
                        type="number" 
                        name="qty" 
                        id="qty" 
                        value={colorInput.qty}
                        max={100}
                        min={5}
                        step={5}
                        onChange={handleChange}
                        className="input">
                    </input>
                </div>
                <button className="btn btn-selector" type="submit">Create</button>
            </form>
            <section className="color-section">

            {isError ? (<h4 className="section-center">Nessun colore inserito</h4>
                    ) : selectedColor.length > 0 ? (
                    selectedColor.map(el => <SingleColor key={uuidv4} {...el}/>)
                    ) : (
                        <h4>Loading...</h4>
                    )
            }
            </section>
        </>
    )
};

export default ColorGrading;

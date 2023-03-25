import { useState, useEffect } from "react";
import Radio from "./Radio";
import Input from "./Input";
import { RADIOQUESTIONS, INPUTFIELDS } from "../data";
import ReviewForm from "./ReviewForm";

const styles = {
    hide: "hide",
    show: "show"
}

const Checklist = () => {

    useEffect(() => { }, []);

    const [isReview, setIsReviewed] = useState(false);

    const [checklist, setCheckList] = useState({
        input: [""],
        textarea: ""
    });

    // One function to watch the changes for all input types.
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        let newArray = [...checklist.input]
        newArray[index] = value;
        setCheckList({ ...checklist, [name]: newArray });
    }

    const handleChangeTextArea = (e) => {
        const { value } = e.target;
        setCheckList({ ...checklist, textarea: value });
    }

    //Displays review component.
    const review = (e) => {
        e.preventDefault();
        setIsReviewed(!isReview);
    }

    // Maps through the array and creates an input component with the array element.
    const mappedInputs = INPUTFIELDS.map((inputName, index) =>
        <div key={index}>
            <Input
                labelName={inputName}
                index={index}
                value={checklist.input[index]}
                type="text"
                forName="inputField"
                name="input"
                handleChange={handleChange}
            />
            <br />
        </div>
    );

    return (
        <div className="flex center column form">
            <form onSubmit={(e) => review(e)} className={isReview ? styles.hide : styles.show}>
                <h1>Student Progress Report</h1>
                {mappedInputs}
                <div className="textarea left">
                    <p className="font-weight">Goals, Achievements, Comments</p>
                    <textarea name="textarea" onChange={(e) => handleChangeTextArea(e)}>
                    </textarea>
                </div>
                <br />
                <button>Review</button>
            </form>
            {isReview ? <ReviewForm checklist={checklist} review={review} /> : ""}
        </div>
    );
}

export default Checklist;
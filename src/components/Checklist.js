import { useState, useEffect } from "react";
import Radio from "./Radio";
import Input from "./Input";
import {  RADIOQUESTIONS, INPUTFIELDS} from "../data";
import ReviewForm from "./ReviewForm";

const styles = {
    hide: "hide",
    show: "show"
}

const Checklist = () => {

    useEffect(() => { }, []);

    const [isReview, setIsReviewed] = useState(false);

    // const styles = clicked ? {display: "none"} : {display: "inline-block"};

    const [checklist, setCheckList] = useState({
        input: [""],
        radio: [""],
    });

    // One function to watch the changes for all input types.
    const handleChange = (e, index) => {
        let newArray
        const { name, value } = e.target;

        if (name === "textbox" || name === "team" || name === "manager") return setCheckList({ ...checklist, [name]: value });
        if (name.includes("time")) return setCheckList({ ...checklist, [name]: value });

        if (name === "empName") {
            newArray = [...checklist.employees];
            newArray[index].empName = value;
            return setCheckList({ ...checklist, employees: newArray });
        } else if (name === "title") {
            newArray = [...checklist.employees];
            newArray[index].title = value;
            return setCheckList({ ...checklist, employees: newArray })
        } else if (name === "consent") {
            newArray = [...checklist.employees];
            newArray[index].consent = value;
            return setCheckList({ ...checklist, employees: newArray })
        } else if (name === "radio") {
            newArray = [...checklist.radio];
        } else if (name === "input") {
            newArray = [...checklist.input];
        }
        newArray[index] = value;
        setCheckList({ ...checklist, [name]: newArray });
    }

    const handleChangeEmployee = (e, index) => {
        const { name, value } = e.target;
        setCheckList({ ...checklist, [name]: value });
    }

    // Adds empty element into employees array for new input.
    const handleAdd = (e) => {
        e.preventDefault();
        setCheckList({ ...checklist, employees: [...checklist.employees, { empName: "", title: "", consent: "" }] });
    }

    //Removes element from employees array.
    const handleRemove = (e, index) => {
        e.preventDefault();
        const filteredArray = checklist.employees.filter((employee, i) => i !== index);
        setCheckList({ ...checklist, employees: filteredArray });
    }

    //Displays review component.
    const review = (e) => {
        e.preventDefault();
        setIsReviewed(!isReview);
    }

    // Maps through the employees and creates an input component.
    // const mappedEmployees = checklist.employees.map((employee, index) =>
    //     <div key={index}>
    //         <Input
    //             labelName="Employee:"
    //             index={index}
    //             type="text"
    //             forName="employeesField"
    //             name="empName"
    //             value={checklist.employees[index].empName}
    //             handleChange={handleChange}
    //         />
    //         <Input
    //             labelName="Title:"
    //             index={index}
    //             type="text"
    //             forName="employeesField"
    //             name="title"
    //             value={checklist.employees[index].title}
    //             handleChange={handleChange}
    //         />
    //         <p>
    //             Acknowledgement: by clicking "yes" on the acknowledgment box, I hereby confirm that the information provided above is accurate, correct and can be used by the company at the company's descretion.
    //         </p>
    //         <Input
    //             labelName="Acknowledgement:"
    //             index={index}
    //             type="checkbox"
    //             forName="employeesField"
    //             name="consent"
    //             value="yes"
    //             handleChange={handleChange}
    //         />
    //         <button className="btnLeft" onClick={(e) => handleRemove(e, index)}>Remove</button>
    //     </div>

    // );

    // Maps through the array and creates an input component with the array element.
    const mappedInputs = INPUTFIELDS.map((inputName, index) =>
        <div key={index}>
            <Input
                labelName={inputName}
                index={index}
                value={checklist.input[index] ? checklist.input[index] : ""}
                type={inputName === "Date" ? "date" : "text"}
                forName="inputField"
                name="input"
                handleChange={handleChange}
            />
            <br />
        </div>

    );

    const mappedRadio = RADIOQUESTIONS.map((question, index) =>
        <div key={index}>
            <Radio
                radioQuestion={question}
                index={index}
                handleChange={handleChange}
            />
            <br />
        </div>
    );

    return (
        <div className="flex center column form">
            <form onSubmit={(e) => review(e)} className={isReview ? styles.hide : styles.show}>
                {mappedInputs}
                <h2>Radio Questions</h2>
                {mappedRadio}
                <br />
                <button>Review</button>
            </form>
            {isReview ? <ReviewForm checklist={checklist} review={review} /> : ""}
        </div>
    );
}

export default Checklist;
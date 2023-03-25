import { RADIOQUESTIONS, INPUTFIELDS } from "../data";
import { useState } from "react";
// import emailjs from '@emailjs/browser';

let templateParams = {}

const ReviewForm = (props) => {

    const { checklist, review } = props;
    const [success, setSuccess] = useState("");

    // Creates an object from state nested arrays for email.js templateParams
    const arrayToObject = (array, stateArray) => {
        for (let i = 0; i < array.length; i++) {
            templateParams[array[i].split(" ").join("_")] = stateArray[i] ? String(stateArray[i]) : ""
        }
    }

    // Creates key pair values for object to send to emailjs
    arrayToObject(INPUTFIELDS, checklist.input);
    templateParams.textarea = checklist.textarea;

    //Sends templateParams values as an object to be used as an email.
    // const sendEmail = (e) => {
    //     e.preventDefault();
    //     emailjs.send('serviceId', 'templateId', templateParams, "")
    //         .then((result) => {
    //             if (result.text === "OK") setSuccess("Sent!");
    //         }, (error) => {
    //             setSuccess("Form was not sent! Please try again.");
    //         });
    // };

    const mappedInputFieldNames = INPUTFIELDS.map((inputNames, index) =>
        <div>
            <h3>{inputNames}</h3>
            <p>{checklist.input[index]}</p>
        </div>
    );

    return (
        <div className="left">
            <h1>Review Progress Report</h1>
            <hr/>
            <br />
            {mappedInputFieldNames}
            <br/>
            <p className="font-weight">Goals, Achievements, Comments</p>
            <p className="white">{checklist.textarea}</p>
            <br />
            {/* <button onClick={(e) => sendEmail(e)}>Send Form</button> */}
            <button onClick={(e) => review(e)}>Edit</button>
            <p className="error">{success}</p>
        </div>
    )
}

export default ReviewForm;
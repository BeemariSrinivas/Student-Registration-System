//gets student data from localstorage and converts to array of objects
let records = JSON.parse(localStorage.getItem("studentData")) || [];

//stops auto submit of form
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
});

document.getElementById("Submit").addEventListener("click", addEntry);

//loads previously saved student data from localstorage on website reload
window.addEventListener("load",()=>{
    const stored = localStorage.getItem("studentData");
    if(stored){
        const allRecord = JSON.parse(stored);
        allRecord.forEach((record)=>{
            newRecord(record.sName,record.sID,record.sGrade,record.sEmail,record.sContact);
        });
    }
});

//gets new record data
function addEntry() {
    const studentName = document.getElementById("name").value;
    const studentID = document.getElementById("ID").value;
    const studentGrade = document.getElementById("Grade").value;
    const studentEmail = document.getElementById("email").value;
    const studentContactNo = document.getElementById("Contact.No").value;

    if ((studentName !== "") && (studentID > 0) && (studentGrade > 0) && (studentEmail !== "") && (studentContactNo > 0)) {
        newRecord(studentName,studentID,studentGrade,studentEmail,studentContactNo);
        addRecord(studentName,studentID,studentGrade,studentEmail,studentContactNo);
    } else {
        alert("Enter all details before submitting");
    }
}

//display all the records
function newRecord(studentName,studentID,studentGrade,studentEmail,studentContactNo){
    const new_record = document.createElement("div");
        const studName = document.createElement("span");
        const studID = document.createElement("span");
        const studGrade = document.createElement("span");
        const studEmail = document.createElement("span");
        const studContactNo = document.createElement("span");
        const edit = document.createElement("button");
        const deleteElement = document.createElement("button");

        studName.innerText = studentName;
        studID.innerText = studentID;
        studGrade.innerText = studentGrade;
        studEmail.innerText = studentEmail;
        studContactNo.innerText = studentContactNo;
        edit.innerText = "Edit";
        deleteElement.innerText = "Delete";

        new_record.appendChild(studName);
        new_record.appendChild(studID);
        new_record.appendChild(studGrade);
        new_record.appendChild(studEmail);
        new_record.appendChild(studContactNo);
        new_record.appendChild(edit);
        new_record.appendChild(deleteElement);
        new_record.classList.add("new_record_style");
        edit.classList.add("edit_element");
        deleteElement.classList.add("delete_element");

        document.getElementById("record").appendChild(new_record);

        //allows the displayed records to update
        edit.addEventListener("click",function(event){
            const editElement = event.target;
            const parent = editElement.parentElement;
            const spans = parent.querySelectorAll("span");
            const Editable = spans[0].contentEditable;
            if(Editable==="true"){
                edit.innerText = "Edit";
                spans.forEach(span => {
                    span.contentEditable = false;
                    span.style.backgroundColor = "";
                });
            }
            else{
                edit.innerText="Save";
                spans.forEach((span)=>{
                    span.contentEditable=true;
                    span.style.backgroundColor = "rgb(180, 180, 75)"
                });
                spans[0].focus();
            }
            updatedRecord(spans[0].innerText,spans[1].innerText,spans[2].innerText,spans[3].innerText,spans[4].innerText);
        });
        //allows to delete displayed data
        deleteElement.addEventListener("click",function(event){
            const delElement = event.target;
            const parent = delElement.parentElement;
            const spans = parent.querySelectorAll("span");
            parent.remove();
            deleteRecord(spans[1].innerText);
        });
}

//add new record to local storage
function addRecord(studentName,studentID,studentGrade,studentEmail,studentContactNo){
    const record ={
        sName : studentName,
        sID : studentID,
        sGrade : studentGrade,
        sEmail : studentEmail,
        sContact : studentContactNo
    };
    records.push(record);
    localStorage.setItem("studentData",JSON.stringify(records));
}

//update edited record in local storage
function updatedRecord(studentName,studentID,studentGrade,studentEmail,studentContactNo){
    records.forEach((record)=>{
        if(record.sID===studentID){
            record.sName = studentName;
            record.sID = studentID;
            record.sGrade = studentGrade;
            record.sEmail = studentEmail;
            record.sContact = studentContactNo;
        }
    });
    localStorage.setItem("studentData",JSON.stringify(records));
}

//removes deleted record from local storage
function deleteRecord(id){
    records = records.filter((record)=>record.sID!==id);
    localStorage.setItem("studentData",JSON.stringify(records));
}
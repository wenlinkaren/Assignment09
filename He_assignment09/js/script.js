// CREATE AN ARRAY OF EMPLOYEES
let employeesArr = [
    {ID: 10000001, Name: 'Daisy', Ext: 1000, Email: 'daisy@gmail.com', Department: 'Administrative'},
    {ID: 20000002, Name: 'Lily', Ext: 2000, Email: 'lily@gmail.com', Department: 'Engineering'},
    {ID: 30000003, Name: 'Rose', Ext: 3000, Email: 'rose@gmail.com', Department: 'Executive'},
    {ID: 40000004, Name: 'Jasmine', Ext: 4000, Email: 'jasmine@gmail.com', Department: 'Marketing'},
    {ID: 50000005, Name: 'Poppy', Ext: 5000, Email: 'poppy@gmail.com', Department: 'Sales'},
]
let employee;
let form;
let empTable;
let storage;
let count;
// GET DOM ELEMENTS
const $ = function(id) {
    return window.document.getElementById(id);
};
form     = $('addForm');
empTable = $('employees');

const displayList = () => {
    // CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
    // IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED 
    if (employeesArr.length === 0) {
        storage = JSON.parse(localStorage.getItem('employeesArr') || '[]');  
        if (storage.length > 0) {
            employeesArr = storage.split(' | ');
        }    
    } 
    if (employeesArr.length > 0) {  
        storage = JSON.parse(localStorage.getItem('employeesArr'));       
    }
};

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
window.addEventListener('load', () => {
    buildGrid();
    displayList();

    // ADD EMPLOYEE
    form.addEventListener('submit', (e) => {
        // PREVENT FORM SUBMISSION
        e.preventDefault();
        // GET THE VALUES FROM THE TEXT BOXES
        let empID       = $('id').value;
        let empName     = $('name').value;
        let empExt      = $('extension').value;
        let empEmail    = $('email').value;
        let empDept     = $('department').value;
        let deleteBtn   = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger delete';
        deleteBtn.appendChild(document.createTextNode('X'));
        // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
        let newEmployee = {ID: empID, Name: empName, Ext: empExt, Email: empEmail, Department: empDept};
        // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
        employeesArr.push(newEmployee);
        // BUILD THE GRID
        buildGrid();
        let tdBtn = document.createElement('td');
        tdBtn.appendChild(deleteBtn);
        let trDelete = document.getElementsByTagName('tr');
        for (let row of trDelete ) {
            row.appendChild(tdBtn);   
        } 
        // RESET THE FORM
        form.reset();
        // SET FOCUS BACK TO THE ID TEXT BOX
        $('id').focus();
    });

    // DELETE EMPLOYEE
    empTable.addEventListener('click', (e) => {
        // CONFIRM THE DELETE
        if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure you want to delete this employee?'))
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
            empTable.deleteRow(e.target.parentNode.parentNode.rowIndex);
            // REMOVE EMPLOYEE FROM ARRAY
            employeesArr.splice(employeesArr.length - 1, 1);
            localStorage.removeItem('employeesArr', employeesArr[employeesArr.length - 1]);
            // BUILD THE GRID
            buildGrid();
        }
    });
});
// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    let list = document.getElementsByTagName('tbody')[0];
    list.parentNode.removeChild(list); 
    // REBUILD THE TBODY FROM SCRATCH
    let tbBody = document.createElement('tbody');
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    employeesArr.forEach((employee) => {
        let tr = document.createElement('tr');
        Object.values(employee).forEach((cell) => {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode((cell)));
            tr.appendChild(td);
        });
        tbBody.appendChild(tr);
    });
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbBody);
    // UPDATE EMPLOYEE COUNT
    count = empTable.rows.length - 1;
    $('empCount').value = `(${count})`;
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employeesArr', JSON.stringify(employeesArr));
};
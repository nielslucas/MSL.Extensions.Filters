let table = document.getElementById("astromons-table");
let tableContent = Array.prototype.slice.call(table.getElementsByTagName('tr'));
    tableContent.shift();

let headerRow = table.getElementsByTagName('tr')[0];
let headerColumns = headerRow.getElementsByTagName('th');

let elementHeader = headerColumns[3];
let typeHeader = headerColumns[4];
let variantSkill = headerColumns[5];
let normalSkill = headerColumns[6];
let activeSkill = headerColumns[7];

let elements = [];
let types = [];
let variantSkills = [];
let normalSkills = [];
let activeSkills = [];

let filters = [];

GatherOptionsForSelects();
CreateFilterRow(table);

function GatherOptionsForSelects() {
    tableContent.forEach(tr => {
        const tds = tr.getElementsByTagName('td');
    
        GetColumnsValues(tds, 3, elements);
        GetColumnsValues(tds, 4, types);
        GetColumnsValues(tds, 5, variantSkills);
        GetColumnsValues(tds, 6, normalSkills);
        GetColumnsValues(tds, 7, activeSkills);
    });

    elements = elements.sort();
    types = types.sort();
    variantSkills = variantSkills.sort();
    normalSkills = normalSkills.sort();
    activeSkills = activeSkills.sort();
}

function GetColumnsValues(tds, index, myArray) {
    const element = tds[index].textContent.slice(0, -1);

    if(myArray.indexOf(element) === -1) {
        myArray.push(element);
    }
}

function CreateFilterRow(table) {
    const div = document.createElement('tr');
    div.innerHTML += `<td>*</td>`;
    div.innerHTML += `<td>*</td>`;
    div.innerHTML += `<td>*</td>`;
    div.innerHTML += `<td id='filter3'></td>`;
    div.innerHTML += `<td id='filter4'></td>`;
    div.innerHTML += `<td id='filter5'></td>`;
    div.innerHTML += `<td id='filter6'></td>`;
    div.innerHTML += `<td id='filter7'></td>`;
    div.innerHTML += `<td>*</td>`;
    div.innerHTML += `<td>*</td>`;
    div.innerHTML += `<td>*</td>`;
    div.innerHTML += `<td>*</td>`;    
    
    table.insertBefore(div, table.childNodes[0])

    const elementsFilterLoc = document.getElementById('filter3');
    const typesFilterLoc = document.getElementById('filter4');
    const variantFilterLoc = document.getElementById('filter5');
    const normalFilterLoc = document.getElementById('filter6');
    const activeFilterLoc = document.getElementById('filter7');

    CreateSelect(elementsFilterLoc, 3, elements);
    CreateSelect(typesFilterLoc, 4, types);
    CreateSelect(variantFilterLoc, 5, variantSkills);
    CreateSelect(normalFilterLoc, 6, normalSkills);
    CreateSelect(activeFilterLoc, 7, activeSkills);
}

function CreateSelect(myParent, index, options) {
    var selectList = document.createElement("select");
    selectList.id = index;
    selectList.onchange=function(){AddFilter(index, this)}

    myParent.appendChild(selectList);


    var elOption = document.createElement("option");
    elOption.value = "";
    elOption.text = "";
    selectList.appendChild(elOption);

    options.forEach(option => {
        var elOption = document.createElement("option");
        elOption.value = option;
        elOption.text = option;
        selectList.appendChild(elOption);
    });

    return selectList;
}

function AddFilter(index, element) {

    if(element.value == "") {
        delete filters[index]
    } else {
        filters[index] = element.value;
    }

    console.log(filters);

    FilterTableContent(filters);
}

function FilterTableContent(filters) {
    tableContent.forEach(tr => {
        const tds = tr.getElementsByTagName('td');

        let show = true;

        for (var key in filters) {
            if (!filters.hasOwnProperty(key)) return;

            const value = filters[key];
            const tdValue = tds[key].textContent.slice(0, -1);

            if(tdValue != value) {
                show = false;
            }
        }

        const display = show == true ? 'revert' : 'none';
        tr.style['display'] = display;
    });
}


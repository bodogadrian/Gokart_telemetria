function tablesearch(){
    let input,filter,table,tr,td,i,txtValue;

    input = document.getElementById("myInput")
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable")
    tr = table.getElementsByTagName("tr")

    for(let i=0;i<tr.length;i++){
        td = tr[i].getElementsByTagName("td")[1]
        if(td){
            txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none"
            }
        }
    }
}


const name = JSON.parse(localStorage.getItem("users"))
function secondtime(time){
     m = Math.trunc(time / 60) % 60;
     s = Math.trunc(time) % 60;
     ms = Math.trunc(time * 1000) % 100;

     return `${m || '--'}:${s.toString().length === 1 ? `0${s}` : s || '--'}.${ms || '--'}`;
}
console.log(name.length)
buildTable(name)
function buildTable(data){
  let table = document.getElementById("mytable");

  for(let i=0; i<data.length;i++){
    let row = `<tr>
                  <td>${i+1}</td>
                  <td>${data[i].username}</td>
                  <td>${secondtime(data[i].fastest)}</td>
                  <td>${secondtime(data[i].average)}</td>
                </tr>`
            table.innerHTML += row;
  }
}
function secondtime(time){
    m = Math.trunc(time / 60) % 60;
    s = Math.trunc(time) % 60;
    ms = Math.trunc(time * 1000) % 100;

    return `${m || '--'}:${s.toString().length === 1 ? `0${s}` : s || '--'}.${ms || '--'}`;
}

const users = JSON.parse(localStorage.getItem("users"))

buildTable(users)

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
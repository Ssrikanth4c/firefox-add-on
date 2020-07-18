const input= document.querySelector('input[type="file"]')
let jsonData=undefined
let str=''
input.addEventListener('change', e=>{
    const reader= new FileReader()
    /*  A handler for the load event. 
    This event is triggered each time the reading operation 
    is successfully completed.
    */
   reader.onload=()=>{
        jsonData=JSON.parse(reader.result)
        console.log(jsonData)
        let columnData=Object.keys(jsonData[0])
        str+=columnData.join(',')+'\r\n'
        console.log(columnData)
        //values of objects only
        for(let i=0; i<jsonData.length; i++){
            str+=Object.values(jsonData[i])+'\r\n'
        }
    }
    reader.readAsText(input.files[0])
    // console.log(jsonData)
}, false)

const download=()=>{
    let blob= new Blob(
        [str],{type: 'text/csv;charset=utf-8;'}
    );
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, 'csv.csv');
    }else{
        let link= document.createElement('a');
        if(link.download!==undefined){
            let url= URL.createObjectURL(blob)
            link.setAttribute('href',url)
            link.setAttribute('download','csv.csv');
            link.style.visibility='hidden';
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link)
        }
    }
    console.log(str)
}

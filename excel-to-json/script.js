const input= document.querySelector('input[type="file"]')
let csvData=undefined
let jsonData=[]
input.addEventListener('change', e=>{
    const reader= new FileReader()
    /*  A handler for the load event. 
    This event is triggered each time the reading operation 
    is successfully completed.
    */
   reader.onload=()=>{
        csvData=reader.result
        let items= csvData.trim().split('\r\n')
        let headers= items.shift().split(',')
        console.log(csvData)
        console.log(items)
        items.map(item=>{
            let obj={}
            let currentItem=item.trim().split(',')
            headers.forEach((header, ind) => {
                obj[header]=currentItem[ind]
            });
            jsonData.push(obj)
        })
        console.log(headers)
        jsonData=JSON.stringify(jsonData)
        console.log(jsonData)
    }
    reader.readAsText(input.files[0])
    
}, false)

const download=()=>{
    let blob= new Blob(
        [jsonData],{type: 'application/json'}
    );
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, 'jsonData.json');
    }else{
        let link= document.createElement('a');
        if(link.download!==undefined){
            let url= URL.createObjectURL(blob)
            link.setAttribute('href',url)
            link.setAttribute('download','jsonData.json');
            link.style.visibility='hidden';
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link)
        }
    }
}

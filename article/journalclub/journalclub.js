function renderHTMLFromJson(id){
    fetch(`${id}.json`)
    .then((response) => response.json())
    .then((dataJson) => {
        //渲染数据到HTML
        document.getElementById('title').innerText ='Journal Club: ' + dataJson.title
        document.getElementById('report-reporter').innerText = dataJson.speaker
        document.getElementById('report-time').innerText = dataJson.startTime + '~' + dataJson.endTime
        document.getElementById('report-location').innerText = dataJson.room
        dataJson.pptname ? document.querySelector('#report-document>a').setAttribute('href','./files/'+dataJson.pptname) : document.querySelector('#report-document').innerText=''
        document.getElementById('paper-title').innerText = dataJson.paperTitle
        document.getElementById('paper-doi').setAttribute('href',dataJson.paperLink) 
        document.getElementById('paper-doi').innerText = dataJson.paperLink.split('/').slice(-1)
        document.getElementById('paper-abstract').innerText = dataJson.paperAbstract
    });



}
function renderHTMLFromJson(id){
    fetch(`news.json`)
    .then((response) => response.json())
    .then((dataJson) => {
        data = dataJson.filter(e=>e.id==id)[0]
        //渲染数据到HTML
        document.getElementById('title').innerText = data.title
        document.getElementById('content').innerHTML = data.content
    });
}

//发送图片，如果成功，返回图片存储名
function addImages(){
    const images = document.getElementById('news_imgs').files
    var formData = new FormData()
    for(let i=0;i<images.length;i++){
        formData.append('imgs', images[i])
    }
    xhttp = new XMLHttpRequest()
    xhttp.open('POSt', localStorage.getItem('apiURL')+'/addData/addNewImages',true)
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            response = JSON.parse(this.response)
            if(response.status){
            return  alert(response.message)
            }else{
                console.log(response.data)
                showFileLink(response.data)
            } 
        }
    }
    xhttp.setRequestHeader('Authorization',localStorage.getItem('token'))
    xhttp.send(formData)

}

function showFileLink(data){
    const content = data.map((element, index)=>`
        <label for="img${index}">${element.originalname}</label>
        <input id="img${index}" type="text" onclick="copyLink(this)" value="<img src='${element.link}' alt=''>">
    `)
    document.getElementById('imgs_link').innerHTML = content.join('\n')
}


function copyLink(linkDiv){
    linkDiv.select()
    document.execCommand("copy")
    // alert('复制成功')

}

//发送添加数据请求
function addNewsData(form_id){
    const form = document.forms[form_id]
    const formData =
    `title=${encodeURIComponent(form['news_title'].value)}&`+
    `time=${form['news_time'].value}&`+
    `link=${form['news_link'].value}&`+
    `content=${encodeURIComponent(form['news_content'].value)}&`

    xhttp = new XMLHttpRequest()
    xhttp.open('POST',localStorage.getItem('apiURL')+'/addData/addNews',true)
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            response = JSON.parse(this.response)
            if(response.status){
            return  alert(response.message)
            }else{
                alert(response.message)
            } 
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('Authorization',localStorage.getItem('token'))
    xhttp.send(formData);
}

//发送数据成功之后
//时间输入样式
document.getElementById('jc_startTime').addEventListener('click',function(){
    this.type='datetime-local'
});
document.getElementById('jc_endTime').addEventListener('click',function(){
    this.type='datetime-local'
});


function addJClubData(form_id){
    //获取表单中的数据
    const form = document.forms[form_id]
    const form_data = 
            `title=${encodeURIComponent(form['jc_title'].value)}&`+
            `startTime=${form['jc_startTime'].value}&`+
            `endTime=${form['jc_endTime'].value}&`+
            `speaker=${encodeURIComponent(form['jc_speaker'].value)}&`+
            `room=${encodeURIComponent(form['jc_room'].value)}&`+
            `paperTitle=${encodeURIComponent(form['jc_paper_title'].value)}&`+
            `paperLink=${encodeURIComponent(form['jc_paper_link'].value)}&`+
            `paperAbstract=${encodeURIComponent(form['jc_paper_abstract'].value)}`

    console.log(form_data)
    //发送请求
    xhttp = new XMLHttpRequest()
    xhttp.open('POST',localStorage.getItem('apiURL')+'/addData/addJClub',true)
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
    xhttp.send(form_data);
}

var searchJClubResult;
var renderId;

function getJClubData(form_id){
    const form = document.forms[form_id]
    var speakerString =  '%'+form['search_speaker'].value //%作为名字检索的通配符
    //获得的时间只有年份和月数
    var startTimeIncompleteString = form['search_startTime'].value.replace(/-/g,'/')
    var endTimeIncompleteString = form['search_endTime'].value.replace(/-/g,'/')
    //将日期补充天数和时间
    var startTimeString = startTimeIncompleteString!='' ?  (new Date(startTimeIncompleteString)).toLocaleString() : '2022-1-1 0:00:00'
    var  endTimeString = endTimeIncompleteString!='' ? ((endTimeIncompleteString)=>{
        endTimeValue = new Date(endTimeIncompleteString)
        endTimeValue.setMonth(endTimeValue.getMonth()+1)
        return endTimeValue.toLocaleString()
    })(endTimeIncompleteString) : (new Date()).toLocaleString()
    const form_data=`speaker=${encodeURIComponent(speakerString)}&`+
                    `startTime=${encodeURIComponent(startTimeString)}&`+
                    `endTime=${encodeURIComponent(endTimeString)}`
    //发送请求
    xhttp = new XMLHttpRequest()
    xhttp.open('POST',localStorage.getItem('apiURL')+'/getData/searchJClub',true)
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            response = JSON.parse(this.response)
            if(response.status){
            return  alert(response.message)
            }else{
               searchJClubResult = response.data;
               console.log(searchJClubResult)
               renderToWebList(searchJClubResult)
               console.log('render finished!')
            } 
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(form_data);
    

}

function renderToWebList(searchJClubData){
    console.log('start render......')
    //将数据按照开始时间递减顺序排序
    searchJClubData.sort((a,b)=>{
        const aTime = new Date(a.startTime)
        const bTime = new Date(b.startTime)
        return bTime.getTime() - aTime.getTime() 
    })

    const renderContent = searchJClubData.map(element=>`
        <li class="element" id=${element.id}>
            <div class="startTime">${element.startTime.split(' ')[0]}</div>
            <div class="speaker">${element.speaker}</div>
            <div class="title">${element.title.length<55 ? element.title : element.title.slice(0,56)+'...'}</div>  
        </li>  
    `)

    document.getElementById("dataRender").innerHTML = renderContent.join('\n')
    console.log('添加事件')
    var elements = document.getElementById('dataRender').getElementsByClassName('element')
    for (let i =0;i<elements.length;i++){
        elements[i].addEventListener('click',function(){
            renderId = this.id
            elementData = searchJClubData.filter(e => e.id==renderId)[0]
            console.log(elementData)
            var displayJClubForm = document.getElementById('displayJClub_form')
            //点击更改信息页各项信息
            displayJClubForm.jc_title.value= elementData.title
            displayJClubForm.jc_startTime.value= elementData.startTime
            displayJClubForm.jc_endTime.value= elementData.endTime
            displayJClubForm.jc_speaker.value= elementData.speaker
            displayJClubForm.jc_room.value= elementData.room
            displayJClubForm.jc_paper_title.value= elementData.paperTitle
            displayJClubForm.jc_paper_link.value= elementData.paperLink
            displayJClubForm.jc_paper_abstract.value= elementData.paperAbstract
        })
    }
};

(function deleteJCLubData(){
    var button = document.getElementById('delete')
    button.addEventListener('click',function(){
       if(renderId && confirm('确定删除数据？')){
        const message = `将要删除 '${searchJClubResult.filter(e => e.id = renderId)[0].speaker}' 的 '${searchJClubResult.filter(e => e.id = renderId)[0].title}' ` 
        if(confirm(message)){            
            xhttp = new XMLHttpRequest()
            xhttp.open('POST',localStorage.getItem('apiURL')+'',true)
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status ==200){
                    response = JSON.parse(this.response)
                    if(response.status){
                    return  alert(response.message)
                    }else{
                        alert('删除成功！')
                        renderId = null;
                        document.getElementById(`${renderId}`).remove()

                    } 
                }
            }
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.setRequestHeader('Authentication', localStorage.token)
            xhttp.send(renderId);
        }

       }else if(!renderId){
        alert('请选择删除项')
       }

    })
})();

(function updateJClubData(){
    var button = document.getElementById('submit')
    console.log(button)
    button.addEventListener('click',function(){
        if(renderId && confirm('确认提交修改后的数据？')){
            const form = document.forms['displayJClub_form']
            const form_data =
                    `id=${renderId}&`
                    `title=${encodeURIComponent(form['jc_title'].value)}&`+
                    `startTime=${form['jc_startTime'].value}&`+
                    `endTime=${form['jc_endTime'].value}&`+
                    `speaker=${encodeURIComponent(form['jc_speaker'].value)}&`+
                    `room=${encodeURIComponent(form['jc_room'].value)}&`+
                    `paperTitle=${encodeURIComponent(form['jc_paper_title'].value)}&`+
                    `paperLink=${encodeURIComponent(form['jc_paper_link'].value)}&`+
                    `paperAbstract=${encodeURIComponent(form['jc_paper_abstract'].value)}`
            //发送请求
            xhttp = new XMLHttpRequest()
            xhttp.open('POST',localStorage.getItem('apiURL')+'',true)
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status ==200){
                    response = JSON.parse(this.response)
                    if(response.status){
                    return  alert(response.message)
                    }else{
                        alert("更新成功！")
                        var updatedElement = document.getElementById(`${renderId}`)
                        updatedElement.startTime = form['jc_startTime'].value
                        updatedElement.speaker = form['jc_speaker'].value
                        updatedElement.title = form['jc_title'].value
                    } 
                }
            }
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.setRequestHeader('Authorization',localStorage.getItem('token'))
            xhttp.send(form_data);
        }else if(!renderId){
            alert('请选择需要修改的项')
        }

    })
})();

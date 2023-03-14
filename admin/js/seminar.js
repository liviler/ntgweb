function addSeminarDataWithFile(form_id){
    const form = document.forms[form_id]
    var formData = new FormData()
    formData.append('title',form['seminar_title'].value)
    formData.append('reporter',form['seminar_reporter'].value)
    formData.append('inviter',form['seminar_inviter'].value)
    formData.append('startTime',form['seminar_startTime'].value)
    formData.append('endTime',form['seminar_endTime'].value)
    formData.append('room',form['seminar_room'].value)
    formData.append('img',form['seminar_imgs'].files[0])
    formData.append('ppt',form['seminar_ppt'].files[0])
    //发送请求
    xhttp = new XMLHttpRequest()
    xhttp.open('POST',localStorage.getItem('apiURL')+'/addData/addSeminarWithFile',true)
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
    // xhttp.setRequestHeader('Content-Type', 'multipart/form-data');
    xhttp.setRequestHeader('Authorization',localStorage.getItem('token'))
    xhttp.send(formData);
}

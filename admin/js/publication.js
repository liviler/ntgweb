function addPublicationData(form_id){
    const form = document.forms[form_id]
    var formData = new FormData()
    formData.append('year',form['year'].value)
    formData.append('title',form['title'].value)
    formData.append('author',form['author'].value)
    formData.append('journal',form['journal'].value)
    formData.append('arxiv',form['arxiv'].value)
    formData.append('doi',form['doi'].value)
    formData.append('pdf',form['pdf'].files[0])
    //发送请求
    xhttp = new XMLHttpRequest()
    xhttp.open('POST',localStorage.getItem('apiURL')+'/addData/addPublicationDataWithFile',true)
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
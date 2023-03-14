function addConferenceData(form_id){
    console.log("发送数据")
    const form = document.forms[form_id]
    const form_data = 
            `title=${encodeURIComponent(form['title'].value)}&`+
            `startTime=${form['startTime'].value}&`+
            `endTime=${form['endTime'].value}&`+
            `location=${form['location'].value}&`+
            `link=${encodeURIComponent(form['link'].value)}`

    //发送请求
    xhttp = new XMLHttpRequest()
    xhttp.open('POST',localStorage.getItem('apiURL')+'/addData/addConference',true)
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

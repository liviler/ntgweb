window.addEventListener('load',function(){

    const apiURL = `http://${document.domain}:3333`

    function journalclubRender(){
        function render(data){
            var journalclubList = document.getElementById('journalclubList')
            data.sort((a,b)=>{
                var aTime = new Date(a.startTime)
                var bTime = new Date(b.startTime)
                return bTime.getTime() - aTime.getTime()

            })

            var renderContentsArray =  data.map(e=>`
                <li>
                    <a href="/article/journalclub/${e.id}.html" >
                        <div class="time">${e.startTime.slice(0,10)}</div>
                        <div class="content">${e.title.length < 58 ? e.title : e.title.slice(0,58) + '...'}</div>
                    </a>
                </li>
            `)
            journalclubList.innerHTML = renderContentsArray.join('\n')
        }

        fetch('/article/journalclub/journalclub.json')
        .then((response) => response.json())
        .then((json) => render(json));

        console.log("render journalclub successful!")
        // var xhttp = new XMLHttpRequest()
        // console.log(apiURL+'/getData/searchJClub')
        // xhttp.open('POST',apiURL+'/getData/searchJClub')
        // xhttp.onreadystatechange = function(){
        //     if(this.readyState == 4 && this.status ==200){
        //         response = JSON.parse(this.response)
        //         if(response.status){
        //         return  alert(response.message)
        //         }else{
        //         render(response.data)
        //         } 
        //     }
        // }
        // xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // xhttp.send('speaker=%&startTime=2020:01:01 00:00:00&endTime=2100:01:01 00:00:00')//具有有效的时间
    }

    journalclubRender();
})
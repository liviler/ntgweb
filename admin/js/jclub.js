
//创建年份标签
const startYear = 2021
const nowYear = new Date().getFullYear()



//获取jClub数据
var jClubData = [
    {
        title: 'Shape Changes in the Mirror Nuclei 70Kr and 70Se',
        startTime: '2022-12-19 19:00',
        endTime:'2022-12-19 21:00',
        speaker:'吴先业',
        room:'天琴中心2316',
        link:'./articles/journal-club20221205.html'
    },

    {
        title:'Symmetry Restoration in Hartree-Fock-Bogoliubov Based Theories',
        startTime: '2022-12-12 19:30',
        endTime: '2022-12-12 21:00',
        speaker:'林炜',
        room:'天琴中心2316',
        link:'./articles/journal-club20221128.html'

    }
]

serverURL = 'http://127.0.0.1:3333'
//数据按照不同的年份来获取
function getDataFromServer(from_yymmdd,to_yymmdd){
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST',serverURL+'/getData/jclub',true);
    xhttp.onreadystatechange = function(){
        if(this.readyState ==4 && this.status ==200){
            // return this.responseText
            console.log('from getDataFromServer',this.response)
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`from_yymmdd=${from_yymmdd}&to_yymmdd=${to_yymmdd}`);
}
getDataFromServer('2022-1-1','2022-7-1')

//将数据渲染到页面
function render(jClubData){
    //按照starTime对数据进行降序排序
    jClubData.sort((a, b)=>{
        const bTime = new Date(b.startTime)
        const aTime = new Date(a.startTime)
    return  bTime.getTime() - aTime.getTime()
    })

    //将数据渲染到html页面中
    const content =  jClubData.map(element=> `
    <div>
    <a href="${element.link}">
    <div class="title">${element.title}</div>
    <div class="time">${element.startTime}-${element.endTime.split(" ")[1]}</div>
    <div class="speaker">${element.speaker}</div>
    <div class="location">${element.room}</div>
    </a>
    </div>
    `)
    document.getElementById('test').innerHTML = content.join('') 
}


//添加jClub数据
function addJClubData(form_id){
    //获取表单中的数据
    const form = document.forms[form_id]
    const form_data =  `title=${form['jc_title'].value}&startTime=${form['jc_startTime'].value}&endTime=${form['jc_endTime'].value}&speaker=${form['jc_speaker'].value}&room=${form['jc_room'].value}`
    console.log(form_data)
    //发送请求
    xhttp = new XMLHttpRequest()
    xhttp.open('POST',serverURL+'/updateData/addJClub',true)
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            console.log(this.response)
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(form_data);
}



// 获取时间输入框的元素
var datetimeInput = document.getElementById('jc_startTime');
var datetimeInput2 = document.getElementById('jc_endTime');

// 当用户点击 label 标签时，将焦点设置到时间输入框上
document.querySelector('label[for="jc_startTime"]').addEventListener('click', function() {  
    datetimeInput.type= "datetime-local"
    datetimeInput2.type = "datetime-local"
    // datetimeInput.click();
    datetimeInput2.click();
});



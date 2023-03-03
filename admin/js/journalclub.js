console.log(document.getElementById('jc_startTime'),'yes')
document.getElementById('jc_startTime').addEventListener('click',function(){
    this.type='datetime-local'
});
document.getElementById('jc_endTime').addEventListener('click',function(){
    this.type='datetime-local'
});
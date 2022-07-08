window.addEventListener('load',function(){
    function newLabel(){
        var journalclub_ul = document.querySelector('.journalclub ul');
        var conference_ul= document.querySelector('.conference ul');
        var seminar_ul = document.querySelector('.seminar ul');
        cur_time=new Date();//获取当前时间

        //journalclub的new判断
        for(var i=0; i< journalclub_ul.children.length;i++){
            li = journalclub_ul.children[i];
            li_time = li.querySelector('.time').innerText;//获得li中的时间
            li_time=new Date(li_time);//字符转化为时间
            if(li_time.getTime() > cur_time.getTime()){
                li.className='new';
            }
        
        }
        //conference的new判断
        for(var i=0; i< conference_ul.children.length;i++){
            li = conference_ul.children[i];
            li_time_YM= li.querySelector('.time .year-month').innerText;//获得年月份
            li_time_D= li.querySelector('.time .day').innerText.split("~")[1];//获得天数
            li_time=new Date(li_time_YM + '-' + li_time_D);//字符转化为时间
            if(li_time.getTime() > cur_time.getTime()){
                li.className='new';
            }
        
        }
        //seminar的new判断
        for(var i=0; i< seminar_ul.children.length;i++){
            li = seminar_ul.children[i];
            li_time = li.querySelector('.time').innerText;//获得li中的时间
            li_time=new Date(li_time);//字符转化为时间
            if(li_time.getTime() > cur_time.getTime()){
                li.className='new';
            }
        
        }
    }
    

    function researchPlay(){
    //--------------------------------------------
    //-----------------Research Topics轮播效果------------
    //--------------------------------------------
    var research_img_list = document.createElement("div");
    research_img_list.className='img-list';//为div添加类名
    var research_img_list_ul = document.createElement('ul');
    research_img_list_ul.className='imgs'; 
    research_img_list.appendChild(research_img_list_ul);
    
    var research_bottom_list =document.createElement('ul')
    research_bottom_list.className="bottoms";
    research_img_list.appendChild(research_bottom_list);
    
    var research=document.querySelector("main .research");
    var research_text_list =document.querySelector(".research .text-list");
    var research_text_list_ul =document.querySelector(".research .text-list ul");
    
    research_text_list.parentNode.insertBefore(research_img_list,research_text_list);
    research_text_list_ul_lis = research_text_list_ul.getElementsByTagName("li");
    
    var research_img_list_ul_li_width = document.querySelector('.research .img-list').offsetWidth;
    //添加img-list
    img_num=5;//展示图片的个数
    for(var i=0; i< img_num; i++){
        var li_node_i=research_text_list_ul_lis[i].cloneNode(true);//要克隆不然会将本体元素复制过去
        research_img_list_ul.appendChild(li_node_i);//appendChild会把所选的标签移动(添加)到另一个标签。
    }

    function animate(obj,target,callback){
        clearInterval(obj.timer)
        obj.timer = setInterval(function(){
            var step =(target - obj.offsetLeft)/10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
            if(callback){
                callback();
            } 
        }
        obj.style.left = obj.offsetLeft + step +'px';
        },30);
    }

    index=0;
    for(var i=0; i<img_num;i++){
        //设置图片索引号
        research_img_list_ul.children[i].setAttribute('index',i);
        // 根据图片数量的多少添加底部按钮的数量
        var li = document.createElement('li');
        research_bottom_list.appendChild(li);
        //设置底部按钮索引号
        li.setAttribute('index',i);

        // 为底部按钮设置监听行为
        li.addEventListener('click',function(){
            // 通过排他,为点击的按钮设置selected
            for(var j=0;j<img_num;j++){
                research_bottom_list.children[j].className='';
                research_text_list_ul.children[j].className='';
            }
            this.className='selected';

            research_text_list_ul.children[index].className='active';

            //通过获得底部按钮的索引号来对banner-list的left值进行调整
            index = this.getAttribute('index');
            animate(research_img_list_ul,-index * research_img_list_ul_li_width);
        });
    }

    research_bottom_list.children[index].className="selected";
   
    //复制第一个到最后一个
    var first = research_img_list_ul.children[0].cloneNode(true);
    research_img_list_ul.appendChild(first);

    //图片切换
    var num;
    function autoPlay_research_img( ){
        //目前位置
        research_img_list_ul.style.left= -index * research_img_list_ul_li_width+'px';

        num = index;
        index++;
        num++;
        if(index == img_num){
            index=0;
        }

        for(var i =0;i<img_num;i++){
            research_bottom_list.children[i].className = '';
            research_text_list_ul.children[i].className='';
        }
        research_bottom_list.children[index].className = 'selected';
        research_text_list_ul.children[index].className='active';
        // research_img_list_ul.style.left = -index * research_img_list_ul_li_width+'px';

        animate(research_img_list_ul,-num * research_img_list_ul_li_width);
    }

    //自动轮播
    var research_timer;
    function research_playTimer(){
        research_timer = this.setInterval(function(){
        autoPlay_research_img();
    },2000);
    }

    
    function sider_hover( hover_num){
        index = hover_num;
        //图片显示正常
        animate(research_img_list_ul,-hover_num * research_img_list_ul_li_width);
        //下方按钮显示正常
        for(var j=0;j<img_num;j++){
            research_bottom_list.children[j].className='';
            research_text_list_ul.children[j].className='';
        }
        research_bottom_list.children[hover_num].className='selected';

    }

    research.onmouseenter = function () {
         clearInterval(research_timer);
         for(var i =0;i<img_num;i++){
            research_text_list_ul.children[i].setAttribute('index',i);
            research_text_list_ul.children[i].onmouseenter = function(){
                sider_hover(this.getAttribute('index'));
            };

         }

    }
    research.onmouseleave = function () {
        research_playTimer();
    }

    }


    
    function sparePlay(){

        //--------------------------------------------
        //-----------------Spare Time轮播效果------------
        //--------------------------------------------
        var spareTime=document.querySelector('.spare-time');
        var spareTime_ul = document.querySelector('.spare-time ul');
        var spareTime_ul_li_width =document.querySelector('.spare-time>ul>li').offsetWidth;
        var spareTime_left_arrow = document.querySelector('.spare-time .arrows.left');
        var spareTime_right_arrow = document.querySelector('.spare-time .arrows.right');
        
        function animate(obj,target,callback){
            clearInterval(obj.timer)
            obj.timer = setInterval(function(){
                var step =(target - obj.offsetLeft)/10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(obj.offsetLeft == target){
                clearInterval(obj.timer);
                if(callback){
                    callback();
                } 
            }
            obj.style.left = obj.offsetLeft + step +'px';
            },30);
        }

        // 根据图片数量的多少设置banner-list的宽度
        spareTime_ul.style.width = (spareTime_ul.children.length) * spareTime_ul_li_width +  (spareTime_ul.children.length + 1) * 20  + "px"
        //鼠标移入箭头出现，鼠标移除箭头消失
        spareTime.addEventListener('mouseenter',function(){
            spareTime_left_arrow .style.display = 'block';
            spareTime_right_arrow.style.display = 'block';
        });

        spareTime.addEventListener('mouseleave',function(){
            spareTime_left_arrow.style.display = 'none';
            spareTime_right_arrow.style.display = 'none';
        });



        var index=0;
        //右侧按钮的功能
        spareTime_right_arrow.addEventListener('click',function(){
            index++;
            if(index==spareTime_ul.children.length-3){
                index=0;
            }

            animate(spareTime_ul,-index * (spareTime_ul_li_width + 20));
        })

        spareTime_left_arrow.addEventListener('click',function(){
            if(index==0){
                index=spareTime_ul.children.length-3;
            }
            index--;
            animate(spareTime_ul,-index * (spareTime_ul_li_width + 20));
        });

        //自动轮播
        var spareTime_timer;
        function spareTime_playTimer(){
            spareTime_timer = this.setInterval(function(){
            spareTime_right_arrow.click();
        },2000);

        }
        spareTime.onmouseenter = function () {
        clearInterval(spareTime_timer);
        }
        spareTime.onmouseleave = function () {
            spareTime_playTimer();
        }
    }

    newLabel();
    researchPlay();
    sparePlay();

})

window.onload = content;


function content()
{
    
    //  Avak Yeramian
    //
    //  GNU GENERAL PUBLIC LICENSE Version 3
    //
    // The GNU General Public License is a free, copyleft license for software and other kinds of works.

    //  The licenses for most software and other practical works are designed to take away your freedom to share and change the works.
    //  By contrast, the GNU General Public License is intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users. We, the Free Software Foundation, use the GNU General Public License for most of our software; it applies also to any other work released this way by its authors. You can apply it to your programs, too.
    //
    
    /* -- useless/20 -- */
    
    var document = window.document;
    var alert = window.alert;
    var screen = window.screen;
    var console = window.console;
    var body = document.body;
    var navigator = window.navigator;
    var location = window.location;
    
    if(document.getElementById("countdownClock")){
        var countdownClock_div = document.getElementById("countdownClock");
        
        if(location.search){
            var param_array = cleanLocationSearch(location.search);
            var param_object = getParam(param_array);
            displayCountdownClock(param_object);
            var settings = elemCreate("a",{href:"#",id:"settings"},"Settings");
            settings.onclick = function(){
                console.log(param_array);
                var date = param_array[0].split("=")[1];
                var time = param_array[1].split("=")[1].replace("h",":")
                editClock(date,time,param_object.message)
            }
            countdownClock_div.append(settings);
        }else{
            editClock(null,null,null);
        }
        
    }
    
    function editClock(date,time,message){
        countdownClock_div.innerHTML = "";

        var form = elemCreate("form",{action:"#"},"");

        var h1 = elemCreate("h1",{},"Settings");
        form.append(h1);

        var date_label = elemCreate("label",{for:"date"},"Date");
        form.append(date_label);
        var date_input = elemCreate("input",{type:"date",name:"date",id:"date"},"");
        date_input.required = true;
        form.append(date_input);
        if(date){
            date_input.value = date;
        }

        var time_label = elemCreate("label",{for:"time"},"Time");
        form.append(time_label);
        var time_input = elemCreate("input",{type:"time",name:"time",id:"time"},"");
        time_input.required = true;
        form.append(time_input);
        if(time){
            time_input.value = time;
        }

        var message_label = elemCreate("label",{for:"message"},"Message");
        form.append(message_label);
        var message_input = elemCreate("input",{type:"text",name:"message",id:"message",placeholder:"a message"},"");
        message_input.required = true;
        form.append(message_input);
        if(message){
            message_input.value = message;
        }

        var apply_button = elemCreate("button",{id:"apply",type:"button"},"Apply");
        apply_button.onclick = function (){
            if ( form.checkValidity() ){
                var date = document.getElementById("date").value;
                var time = (document.getElementById("time").value).replace(":","h");
                var message = window.btoa(document.getElementById("message").value);
                var param = "date="+date+"&time="+time+"&message="+message;

                window.location.replace(location.protocol + '//' + location.host + location.pathname+"?"+param);
            }
        }
        form.append(apply_button);

        countdownClock_div.append(form);
    }

    /*
        Return a clean array form "?param=aaaa&dfsddf=dqdqz"
    */
    function cleanLocationSearch(search){
        var param = search.split("&");
        param[0] = param[0].slice(1);
        return param;
    }

    /*
        Return a clean object with a date & a message decoded
    */
    function getParam(param_array){
        var param_object = {};
        var time,date;
        for(var ite in param_array){
            var tempParam = (param_array[ite]).split("=")[0];
            var tempValue = (param_array[ite]).split("=")[1];

            if(tempParam=="message"){
                param_object.message = window.atob(tempValue);
            }else if(tempParam=="time"){
                time = tempValue;
            }else if(tempParam=="date"){
                date = tempValue;
            }                    
        }
        date = date.split("-");
        time = time.split("h");

        var date_Date = new Date(date[0],date[1],date[2],time[0],time[1],0,0);
        param_object.date=date_Date;

        return param_object;
    }

    /*
        Return time difference with current date 
    */
    function timeDifferenceNow(date){
        var now = new Date().getTime();
        var futur = date.getTime();
        var diff = now - futur;
        //snowman carl method
        var delta = Math.abs(diff)/1000;
        var r = {};
        var s = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        Object.keys(s).forEach(function(key){
            r[key] = Math.floor(delta / s[key]);
            delta -= r[key] * s[key];
        });

        // for example: {year:0,month:0,week:1,day:2,hour:34,minute:56,second:7}
        return r;
    }
    
    /*
        Display the Countdown clock
    */
    function displayCountdownClock(param_object){
        countdownClock_div.innerHTML = "";
        var clock_div = elemCreate("div",{id:"clock_div"},"");
        countdownClock_div.append(clock_div);
        var message_h1 = elemCreate("em",{id:"message"},param_object.message);
        clock_div.append(message_h1);
        var remaining_h1 = elemCreate("h1",{id:"remaining"},"");
        clock_div.append(remaining_h1);
        setInterval(function(){ 
            var t = timeDifferenceNow(param_object.date);
            var textRemaining = "";
            if(t.year==0){
                if(t.month==0){
                    if(t.week==0){
                        if(t.day==0){
                            textRemaining = t.hour + " Hrs " + t.minute + " Mins " + t.second + " Secs";                             
                        }else{
                            textRemaining = t.day + " Days " + t.hour + " Hrs " + t.minute + " Mins " + t.second + " Secs"; 
                        }
                    }else{
                        textRemaining = t.week + " Weeks " + t.day + " Days " + t.hour + " Hrs " + t.minute + " Mins " + t.second + " Secs"; 
                    }
                }else{
                    textRemaining = t.month + " Mths " + t.week + " Weeks " + t.day + " Days " + t.hour + " Hrs " + t.minute + " Mins " + t.second + " Secs"; 
                }
                 
            }else{
                textRemaining = t.year + " Yrs " + t.month + " Mths " + t.week + " Weeks " + t.day + " Days " + t.hour + " Hrs " + t.minute + " Mins " + t.second + " Secs";
            }
            remaining_h1.innerHTML = textRemaining;
            
        }, 1000);
    }

    /*
        Shortcut function to create dom element more quickly
    */
    function elemCreate(type,dicoAtt,text){
        var dom = document.createElement(type);
        for(var key in Object.keys(dicoAtt)){
            dom.setAttribute(Object.keys(dicoAtt)[key],dicoAtt[Object.keys(dicoAtt)[key]]);//piece of shit
        }
        dom.innerHTML = text;
        return dom;
    }
}
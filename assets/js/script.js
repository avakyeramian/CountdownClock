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
            var search = location.search;
            console.log(search);
        }else{
            editClock(null,null,null);
        }
                
        function editClock(date,time,message){
            countdownClock_div.innerHTML = "";
            
            var form = elemCreate("form",{action:"#"},"");
            
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
            
            var Apply_button = elemCreate("button",{id:"apply"},"Apply");
            form.append(Apply_button);
            
            countdownClock_div.append(form);
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
}
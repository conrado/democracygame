var debug = false;
/*if ( debug == true ) {
    $.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
            alert(textStatus);
            alert(errorThrown);
            alert(XMLHttpRequest.responseText);
        }
    });
}*/

//$.ajaxSetup({cache:true, ifModified: true});

$(document).ready(function(){

    getIssueList('new');
    getIssueList('popular');
    getIssueList('controversial');
    $(".issuehead").live("click", function() {
        $("div.body").hide();
        $("div.abstainvotes").hide();
    });

});
    //var lala = $.getJSON('/ajax/issues/new/', null, null);
    //alert(lala.responseText);
    //var lala = eval ( response );
/*
    $("div.folder").each(function() {
        var folder = $(this).attr("id");
        $(this).find("div.issue").each( function() {
            var my_vote = parseInt($("#my_vote", this).val());
            var my_issue = parseInt($("#my_vote_issue", this).val());
            var my_privacy = parseInt($("#my_vote_privacy", this).val());

            render_bars(my_issue, null);
            render_abs(my_issue, my_vote);

            $("td.for", this).mouseup(function(){
                process_vote(my_issue, 1);
            });
            $("td.abstain", this).mouseup(function(){
                var body = $("#"+folder+my_issue).find("div.abstainvotes");
                body.slideToggle();
                //process_vote(my_issue, 17);
            });
            $("td.against", this).mouseup(function(){
                process_vote(my_issue, -1);
            });
            $("#"+folder+"-un-"+my_issue).mouseup(function() {
                process_vote(my_issue, 10);
            });
            $(".abstainvotes", this).find("#unconvincing").mouseup(function() {
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#unconvincing").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 10);
            });
            $(".abstainvotes", this).find("#notpolitical").mouseup(function() {
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#notpolitical").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 11);
            });
            $(".abstainvotes", this).find("#cantagree").mouseup(function() {
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#cantagree").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 12);
            });
            $(".abstainvotes", this).find("#needsmorework").mouseup(function() {
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#needsmorework").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 13);
            });
            $(".abstainvotes", this).find("#badlyworded").mouseup(function() {
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#badlyworded").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 14);
            });
            $(".abstainvotes", this).find("#duplicate").mouseup(function() {
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#duplicate").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 15);
            });
            $(".abstainvotes", this).find("#unrelated").mouseup(function() {
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#unrelated").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 16);
            });
            $(".abstainvotes", this).find("#needtoknowmore").mouseup(function(){
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#needtoknowmore").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 17);
            });
            $(".abstainvotes", this).find("#askmelater").mouseup(function() {
                var body = $("#"+folder).find(".abs-"+my_issue);
                body.slideToggle();
                $(".abs-"+my_issue).each(function() {
                    $(this).children().css({'background-color' : '#9ef8fb'});
                });
                $(".abs-"+my_issue).find("#askmelater").css({'background-color' : '#4cf5fb'});
                process_vote(my_issue, 18);
            });
        });
    });
    // hide all issue bodies
    $("div.body").each(function() {
	    $(this).hide();
    });
    $("div.folder").each(function() {
        $(this).hide();
    });
    $("div.abstainvotes").each(function() {
        $(this).hide();
    });
    //hook the mouseup events to each title
    $("div.issue").children("div.title").mouseup(function(){
    
        //find the body whose title was clicked
        var body = $(this).parent().children("div.body");

        //slide the panel
        body.slideToggle();
    });
    $("div.myissues").mouseup(function() {
        var body = $(this).parent().find("#myissue");
        body.slideToggle();
    });
    $("div.hotissues").mouseup(function() {
        var body = $(this).parent().find("#hotissue");
        body.slideToggle();
    });
    $("div.newissues").mouseup(function() {
        var body = $(this).parent().find("#newissue");
        body.slideToggle();
    });
    $("div.genissues").mouseup(function() {
        var body = $(this).parent().find("#genissue");
        body.slideToggle();
    });
});
*/
function process_vote(issue, new_vote) {
    console.log("issue: " + issue);
    console.log("new_vote: " + new_vote);
    $old_vote_txt = $("div.i-"+issue).find("#my_vote").val();
    if($old_vote_txt == "None") {
        old_vote = -10;
    }
    else {
        old_vote = parseInt($old_vote_txt);
    }
    console.log(old_vote);
    if(old_vote == new_vote) {
        return
    }
    if(old_vote!=new_vote) {
        $.post('/ajax/vote/cast/', {
            issue : issue,
            vote : new_vote,
            keep_private : false
        }, function(data) {
            if(data.status=="success"){
            // fix layouts here
                $("div.i-"+issue).find("#my_vote").html(""+new_vote);
                render_bars(issue, new_vote);
            } else if(data.status=="debug") {
                if(debug) {
                    alert(data.error);
                }
            } else {
                handle_errors(data.error);
            }
        }, "json");
    }
}

function render_abs(issue, vote) {
    $(".abs-"+issue).each(function() {
        $(this).children().css({'background-color' : '#9ef8fb'});
    });
    if (vote == 10) {
    $(".abs-"+issue).find("#unconvincing").css({'background-color' : '#4cf5fb'});
    }
    if (vote == 11) {
    $(".abs-"+issue).find("#notpolitical").css({'background-color' : '#4cf5fb'});
    }
    if (vote == 12) {
    $(".abs-"+issue).find("#cantagree").css({'background-color' : '#4cf5fb'});
    }
    if (vote == 13) {
    $(".abs-"+issue).find("#needsmorework").css({'background-color' : '#4cf5fb'});
    }
    if (vote == 14) {
    $(".abs-"+issue).find("#badlyworded").css({'background-color' : '#4cf5fb'});
    }
    if (vote == 15) {
    $(".abs-"+issue).find("#duplicate").css({'background-color' : '#4cf5fb'});
    }
    if (vote == 16) {
    $(".abs-"+issue).find("#unrelated").css({'background-color' : '#4cf5fb'});
    }
    if (vote == 17) {
    $(".abs-"+issue).find("#needtoknowmore").css({'background-color' : '#4cf5fb'});
    }
    if (vote == 18) {
    $(".abs-"+issue).find("#askmelater").css({'background-color' : '#4cf5fb'});
    }
}

function render_bars(issue, new_vote){
    var old_vote = parseInt($(".i-"+issue).find("#my_vote").val());
    console.log(old_vote);
    // reset the bar colors to their unvoted colors
    $(".i-"+issue).find("td.for").css({'background-color' : '#a1f2a3'});
    $(".i-"+issue).find("td.abstain").css({'background-color' : '#9ef8fb'});
    $(".i-"+issue).find("td.against").css({'background-color' : '#f99f9b'});
    if(new_vote==null) {
    // first page render, set voted color, if any
        if(old_vote ==1) {
            $(".i-"+issue).find("td.for").css({'background-color' : '#49f24d'});
        }
        if(old_vote >=10) {
            $(".i-"+issue).find("td.abstain").css({'background-color' : '#4cf5fb'});
        }
        if(old_vote ==-1) {
            $(".i-"+issue).find("td.against").css({'background-color' : '#f9645e'});
        }
    }
    // get vote totals
    var vfor = parseInt($(".i-"+issue).find("td.for").html());
    var vabs = parseInt($(".i-"+issue).find("td.abstain").html());
    var vaga = parseInt($(".i-"+issue).find("td.against").html());
    //alert (vfor+" "+vabs+" "+vaga);
    // update vote totals, subtract from old vote totals and reset colors.
    if(new_vote == 1) {
        $(".i-"+issue).find("td.for").css({'background-color' : '#49f24d'});
        vfor += 1;
        if(old_vote >=10) {
            vabs -= 1;
        }
        if(old_vote ==-1) {
            vaga -= 1;
        }
    }
    if(new_vote >= 10) {
        $(".i-"+issue).find("td.abstain").css({'background-color' : '#4cf5fb'});
        vabs += 1;
        if(old_vote ==1) {
            vfor -= 1;
        }
        if(old_vote ==-1) {
            vaga -= 1;
        }
        if(old_vote >= 10) {
            vabs -= 1;
        }
    }
    if(new_vote == -1) {
        $(".i-"+issue).find("td.against").css({'background-color' : '#f9645e'});
        vaga += 1;
        if(old_vote ==1) {
            vfor -= 1;
        }
        if(old_vote >=10) {
            vabs -= 1;
        }
    }
    if(new_vote != null) {
        $(".i-"+issue).find("div.for").html(""+vfor);
        $(".i-"+issue).find("div.abstain").html(""+vabs);
        $(".i-"+issue).find("div.against").html(""+vaga);
        $(".i-"+issue).find("#my_vote").val(new_vote);
    }
    var total = vfor + vabs + vaga;
    var per = new Array();
    per['for'] = vfor / total;
    per['abs'] = vabs / total;
    per['aga'] = vaga / total;
    var biggest = "none";
    var big = 0;
    for (var i in per) {
        if(per[i] > big) {
            big = per[i];
            biggest = i;
        }
    }
    for (var i in per) {
        if(per[i] < 0.1) {
            per[biggest] -= (0.1 - per[i]);
            per[i] = 0.1;
        }
    }
    for (var i in per) {
        per[i] = per[i]*100;
    }
    $(".i-"+issue).find("div.for").width(per['for']+"%");
    $(".i-"+issue).find("div.abstain").width(per['abs']+"%");
    $(".i-"+issue).find("div.against").width(per['aga']+"%");
}

function handle_errors(error) {
    if(error == "Must be logged in.") {
        window.location = "/login/";
    }
    if(error == "Must have access token.") {
        window.location = "/oauth/auth/";
    }
}
function getIssueList(sortorder) {
    $.getJSON("/ajax/issues/"+sortorder+"/", function(data) {
        for( var i in data ) {
            id = url2id(data[i][0]);
            // get the issue content
            $.get("/issue/"+id+"/", function(issue) {
                $(issue).appendTo("div#"+sortorder);
                issueid = $("div.votes",issue).attr('id').replace(/vote/i,"");
                // get user's current vote.
                $.get("/myvote/"+issueid+"/", function (myvote) {
                    issueid = $("#my_vote_issue",myvote).attr('value');
                    $ordercontainer = $("div#"+sortorder);
                    $ordercontainer.find("#vote"+issueid).append(myvote);
                    // hook the vote clicks
                    $("div.for").die("click");
                    $("div.for").live("click", function(){
                        isv = $(this).parent().find("#my_vote_issue").attr("value");
                        process_vote(isv, 1);
                    });
                    $("div.against").die("click");
                    $("div.against").live("click", function(){
                        isv = $(this).parent().find("#my_vote_issue").attr("value");
                        process_vote(isv, -1);
                    });
                });
                // hook click event to title
                $("div.title").die("click");
                $("div.title").live("click", function(){
                    //find the body whose title was clicked
                    var body = $(this).parent().children("div.body");
                    //slide the panel
                    body.slideToggle();
                });
                // hook click event to abstain vote button 
                $("div.abstain").die("click");
                $("div.abstain").live("click", function(){
                    //find the body whose title was clicked
                    var body = $(this).parent().parent().parent().children("div.abstainvotes");
                    //slide the panel
                    body.slideToggle();
                });
            });
        }
    });
    $("div.abstainvotes").hide();
    $("div#"+sortorder)
        .hide();
    $("div."+sortorder).mouseup(function() {
        var body = $(this).parent().find("div#"+sortorder);
        body.slideToggle();
    });
}

function url2id(url) {
    return url.split(/\//)[4];
}


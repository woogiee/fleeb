$(function(){ 
    $(".switch").bootstrapSwitch({ 
        state: getState($(this))
    });

    $(".switch").on("switchChange.bootstrapSwitch", function(evt, state) {

        var light = $(this).data("switch");
        var st = state ? "on" : "off";
        var url = "http://localhost:3000/switches/trigger/" + light + "/" + st;

        $.get(url, function(data) {
            console.log(data);
        });
    });

    function getState(light) {
        console.log(light);
        $.get("http://localhost:3000/switches/status/" + light, function(data) {
            return data.state;
        });
    }
});
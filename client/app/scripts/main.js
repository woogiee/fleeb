$(function(){ 
    $('.switch').bootstrapSwitch({ 
        onInit: function(el, evt) {
            var $light = $(evt.target);

            $.get('http://localhost:3000/switches/status/' + $light.data("switch"), function(data) {
                $light.bootstrapSwitch('state', data.state);
            });
        }
    });

    $('.switch').on('switchChange.bootstrapSwitch', function(evt, state) {

        var light = $(this).data('switch');
        var st = state ? 'on' : 'off';
        var url = 'http://localhost:3000/switches/trigger/' + light + '/' + st;

        $.get(url, function(data) {
            console.log(data);
        });
    });
});
$(document).ready(function(){
    jQuery.fn.anim_progressbar = function (aOptions) {
        // def values
        var iCms = 1000;
        var iMms = 60 * iCms;
        var iHms = 3600 * iCms;
        var iDms = 24 * 3600 * iCms;

        // def options
        var aDefOpts = {
            start: new Date(), // now
            finish: new Date().setTime(new Date().getTime() + 60 * iCms), // now + 60 sec
            interval: 100
        }
        var aOpts = jQuery.extend(aDefOpts, aOptions);
        var vPb = this;
        return this.each(
            function() {
                var iDuration = aOpts.finish - aOpts.start;
                $(vPb).children('.pbar').progressbar();
                var vInterval = setInterval(
                    function(){
                        var iLeftMs = aOpts.finish - new Date(); // left time in MS
                        var iElapsedMs = new Date() - aOpts.start, // elapsed time in MS
                            iPerc = (iElapsedMs > 0) ? iElapsedMs / iDuration * 1000 : 0; // percentages
                        if ($(vPb).attr("data-type") == "%") {
                            $(vPb).children('.pbar').children('.ui-progressbar-value').css('width', iPerc + '%').html('<span style="vertical-align:-webkit-baseline-middle; margin-right:10px;color:#064203;">' + iPerc.toFixed(0) + '%</span>');
                        } else {
                            var progress = $(vPb).attr("progress-value");
                            $(vPb).children('.pbar').children('.ui-progressbar-value').css('width', iPerc + '%').html('<span style="vertical-align:-webkit-baseline-middle; margin-right:10px;color:#064203;">' + iPerc.toFixed(0) * progress + '万</span>');
                        }                        
                        // in case of Finish
                        if (iPerc >= $(vPb).attr("data-value")) {
                            clearInterval(vInterval);
                        }
                    } ,aOpts.interval
                );
            });
    }

    // from second #5 till 15
    var iNow = new Date().setTime(new Date().getTime() + 1 * 1000); // now plus 5 secs
    var iEnd = new Date().setTime(new Date().getTime() + 15 * 1000); // now plus 15 secs
    // default mode
    $('#progress1').anim_progressbar({ start: iNow, finish: iEnd, interval: 1 });
    $('#progress2').anim_progressbar({ start: iNow, finish: iEnd, interval: 1 });
    // we will just set interval of updating to 1 sec
    $('#progress3').anim_progressbar({ start: iNow, finish: iEnd, interval: 1 });
    $('#progress4').anim_progressbar({start: iNow, finish: iEnd, interval: 1});
});

//点击在地图显示
function DisplayMap() {
    window.parent.OpenDialog('/WEB_PC/main/zdgc_tip.html');
}
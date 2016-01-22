var enabled = false;

$(document).ready(function() {
    $("body").mouseup(function(e) {
        if (!wb_popover_lock && enabled) {
            var selection = window.getSelection().toString();
            if (isEnglish(selection)) {
                chrome.runtime.sendMessage({
                    type:'trans',
                    data:selection
                }, function (response) {
                    popover(response);
                });
            }
        }
    });
    $("body").mousedown(function(e) {
        if (!wb_popover_lock) {
            chrome.storage.local.get('enabled', function (item) {
                enabled = item.enabled;
            });
            hidePopover(e);
        }
    });
});

function isEnglish(a) {
    for (var b = 0; b < a.length; b++) if (a.charCodeAt(b) > 126) return !1;
    return !0
}

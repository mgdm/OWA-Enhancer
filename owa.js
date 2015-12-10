(function() {
    function mark() {
        var sender = window.prompt("Enter sender or subject");
        var rows = document.querySelectorAll('.cntnt tr');

        for (var i = 0; i < rows.length; i++) {
            var checkboxNode = rows[i].children[3];
            if (!checkboxNode) continue;
            checkboxNode = checkboxNode.children[0];

            var senderNode = rows[i].children[4];
            var subjectNode = rows[i].children[5];
            var regex = new RegExp(sender, "i");

            if (senderNode && senderNode.textContent.match(regex)) {
                checkboxNode.checked = 'checked';
                markRow(checkboxNode.value);
            }

            if (subjectNode && subjectNode.textContent.match(regex)) {
                checkboxNode.checked = 'checked';    
                markRow(checkboxNode.value);
            }
        }
    }

    function markUnreadMessages() {
        var rows = document.querySelectorAll('tr[style*="font-weight:bold"]');

        for (var i = 0; i < rows.length; i++) {
            var checkboxNode = rows[i].children[3];
            if (!checkboxNode) continue;
            checkboxNode = checkboxNode.children[0];

            checkboxNode.checked = 'checked';
            markRow(checkboxNode.value);
        }
    }
    function markRow(value) {
        var injectedCode = '(function() { var node = document.querySelector(\'input[value="' + value + '"]\'); node.onclick.apply(node); })();';
        var script = document.createElement('script');
        script.appendChild(document.createTextNode(injectedCode));
        document.body.appendChild(script);
        script.parentNode.removeChild(script);
    }

    var checkButton = document.getElementById('lnkHdrcheckmessages');
    checkButton = checkButton.parentNode;
    var container = checkButton.parentNode;

    var markButton = document.createElement('a');
    markButton.className = "btn";
    markButton.innerHTML = 'Select messages';
    markButton.onclick = mark;

    var markUnread = document.createElement('a');
    markUnread.className = "btn";
    markUnread.innerHTML = "Select unread";
    markUnread.onclick = markUnreadMessages;

    var markContainer = document.createElement('td');
    markContainer.style['white-space'] = 'nowrap';
    markContainer.appendChild(markButton);

    var markUnreadContainer = document.createElement('td');
    markUnreadContainer.style['white-space'] = 'nowrap';
    markUnreadContainer.appendChild(markUnread);

    container.insertBefore(markContainer, checkButton);
    container.insertBefore(markUnreadContainer, checkButton);
})();

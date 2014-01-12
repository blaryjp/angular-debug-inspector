// Shortcut
function _id (id) {
    return document.getElementById(id);
}

var aceObj = window.ace.edit(_id('tree')),
    aceSession = aceObj.getSession();

aceObj.setTheme("ace/theme/<%= theme %>");
aceSession.setMode("ace/mode/json");

var currentUID = 0,
    uid_count = 0,
    currentContext = {},
	currentScope = {},
    currentElt = {},
    watchPerf = {},
    hoverScopeElt = null,
    intv,
    currentMode = 'scope';


/*=============================
=             MODE            =
===============================*/

function switchMode (mode) {
    currentMode = mode;

    aceSession.setValue('');
    _id('adi').classList.remove('mode-s');
    _id('adi').classList.remove('mode-bc');
    _id('adi').classList.remove('mode-p');

    switch (mode) {
    case 'scope':

        _id('adi').classList.add('mode-s');

        _id('apply').title = 'Apply in scope';

        if (currentScope[currentUID]) {
            render(currentElt[currentUID], currentScope[currentUID], true);
            aceObj.focus();
            _id('apply').style.display = 'block';
        } else {
            _id('header').querySelector('h1').textContent = 'No scope';
            _id('apply').style.display = 'none';
        }

        break;
    case 'bc':

        _id('adi').classList.add('mode-bc');

        _id('apply').title = 'Broadcast in the selected scope';

        _id('header').querySelector('h1').textContent = 'Broadcast';
        _id('apply').style.display = 'block';
        _id('bc-msg').value = '';
        _id('bc-msg').focus();

        if (currentScope[currentUID]) {
            _id('bc-s-l').textContent = 'Scope ' + currentScope[currentUID].$id;
            _id('bc-s').disabled = false;
        } else {
            _id('bc-s-l').textContent = 'No scope';
            _id('bc-s').disabled = true;
        }

        break;
    case 'perf':

        _id('adi').classList.add('mode-p');

        _id('header').querySelector('h1').textContent = 'Watch perf';
        _id('apply').style.display = 'none';

        updateWatchPerfView();
    break;
    }
    window.dispatchEvent(new Event('resize'));  // This updates the Ace editor scroll
}

_id('mode-s').addEventListener('click', function () {
    switchMode('scope');
});
_id('mode-bc').addEventListener('click', function () {
    switchMode('bc');
});
_id('mode-p').addEventListener('click', function () {
    switchMode('perf');
});


/*=======================================
=            SCOPE SELECTION            =
=======================================*/

_id('select').addEventListener('click', function () {
    currentContext[currentUID].select();
});


/*==============================
=            RENDER            =
==============================*/

function render (elt, $scope, forceRefresh) {

    if (!forceRefresh && currentScope[currentUID] && $scope.$id === currentScope[currentUID].$id) {
        return;
    }

    currentElt[currentUID] = elt;
    currentScope[currentUID] = $scope;

	switch (currentMode) {
    case 'scope':
        var models = currentContext[currentUID].getScopeLocals($scope),
            val = JSON.stringify(models, null, 2/*debug.options.indent*/);

        if (val === '{}') {
            val = '{\n  \n}';
        }

        // Set ACE editor content
    	aceSession.setValue(val);

        // Fold lines if too longer
        if (val.length > 200) {
            aceSession.foldAll(1, aceSession.getLength());
        }

        _id('header').querySelector('h1').textContent = 'Scope ' + $scope.$id;
        _id('apply').style.display = 'block';

        break;
    case 'bc':
        _id('bc-s-l').textContent = 'Scope ' + $scope.$id;
        _id('bc-s').disabled = false;
        break;
    }

};

window.onSelectScope = function (elt, $scope) {
	render(elt, $scope);
};
window.onHoverScope = function (elt, $scope) {
	render(elt, $scope);
};


/*=========================================
=            APPLY / BROADCAST            =
=========================================*/

function applyInScope () {

    if (currentMode === 'scope') {
        try {
            currentContext[currentUID].executeInScope(currentScope[currentUID], JSON.parse(aceSession.getValue()));
        } catch(e) {
            alert('Error: JSON invalid or scope unreachable.')
        }
    } else if (currentMode === 'bc') {
        var msg = _id('bc-msg').value.trim();
            params = aceSession.getValue(),
            dest = document.querySelector('input[name=bc]:checked').value;

        if (!dest) {
            alert('Error: Please select a destination.')
            return;
        }
        if (msg === '') {
            alert('Error: Please enter a message.')
            return;
        }

        try {
            params = eval(params);
        } catch(e) {
            alert('Error: Params format is incorrect.');
            return;
        }

        currentContext[currentUID].broadcastInScope((dest === 'scope' ? currentScope[currentUID] : currentContext[currentUID].getRootScope()), msg, params);

        // Clear
        // _id('bc-msg').value = '';
        _id('bc-msg').focus();
        // aceSession.setValue('');
    }
}

_id('apply').addEventListener('click', applyInScope);

window.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.keyCode === 13) {    // CTRL+ENTER
        applyInScope();
    }
});


/*==================================
=            WATCH PERF            =
==================================*/

function updateWatchPerfView () {
    if (currentMode === 'perf') {
        var html = '';

        watchPerf[currentUID].cache.forEach(function (item) {
            html += '<div>';
            html += '<div class="wname">' + item.name + '</div>';
            html += '<div class="muted">' + item.percent + '% | ' + item.time.toPrecision(3) + 'ms</div>';
            html += '<div class="progress">';
            html += '<div style="width:' + item.percent + '%"></div>';
            html += '</div>';
            html += '</div>';
        });

        _id('perf').innerHTML = html;
    }
}

function getWatchPerf () {
    var data = currentContext[currentUID].getWatchPerf();

    if (data && data.length) {

        data.forEach(function (info) {

            watchPerf[currentUID].total += info.time;

            if (watchPerf[currentUID].items[info.name]) {
                watchPerf[currentUID].items[info.name].time += info.time;
            } else {
                watchPerf[currentUID].items[info.name] = info;
                watchPerf[currentUID].cache.push(info);
            }
        });

        // recalculate all percentages
        watchPerf[currentUID].cache.forEach(function (item) {
            item.percent = (100 * item.time / watchPerf[currentUID].total).toPrecision(3);
        });

        // sort by percentages reverse
        watchPerf[currentUID].cache.sort(function (a, b) {
            if (a.time > b.time) {
                return -1;
            } else if (a.time < b.time) {
                return 1;
            } else {
                return 0;
            }
        });

        updateWatchPerfView();
    }
}

function poll () {
    if (intv) {
        intv = clearInterval(intv);
    }
    intv = window.setInterval(function() {
        getWatchPerf();
    }, 500);
}


/*=================================
=            View mgmt            =
=================================*/

window.registerView = function (context) {
	uid_count++;
	currentUID = uid_count.toString();
    currentContext[currentUID] = context.__adiDebug;
    currentContext[currentUID].setUID(currentUID);
    watchPerf[currentUID] = {
        total: 0,
        items: {},
        cache: []
    };
    poll();
}
window.setView = function (uid) {
    if (uid !== currentUID) {
        currentUID = uid;
        // Ensure disable selection when switching view
        if (currentContext[currentUID]) {
            currentContext[currentUID].stopSelect();
        }
        switchMode(currentMode);    // Refresh view
        poll();
    }
}
window.unsetView = function (uid) {
    delete currentContext[uid];
    delete currentScope[uid];
    delete currentElt[uid];
    delete watchPerf[uid];
}


/*============================
=            INIT            =
============================*/

// Disable ADI in all views when closing window
window.addEventListener('beforeunload', function () {
    for (var uid in currentContext) {
        if (currentContext.hasOwnProperty(uid)) {
            try {
               currentContext[uid].disable();
            } catch(e) {}
        }
    }
});

window.registerView(window.opener);
window.initialized = true;

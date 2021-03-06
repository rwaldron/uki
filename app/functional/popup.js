uki({ view: 'Box', rect: '1000 400', anchors: 'left top', childViews: [
    { view: 'Button', rect: '10 370 100 24', anchors: 'left top', text: 'Left Bottom', id: 'left_bottom' },
    { view: 'Button', rect: '200 370 100 24', anchors: 'left top', text: 'Right Bottom', id: 'right_bottom' },
    { view: 'Button', rect: '10 10 100 24', anchors: 'left top', text: 'Left Top', id: 'left_top' },
    { view: 'Button', rect: '200 10 100 24', anchors: 'left top', text: 'Rigth Top', id: 'right_top' },
    { view: 'Box', rect: '400 0 400 400', anchors: 'left top', childViews: [
        { view: 'Button', rect: '70 310 100 24', anchors: 'left top', text: 'Left Bottom', id: 'h_left_bottom' },
        { view: 'Button', rect: '200 310 100 24', anchors: 'left top', text: 'Right Bottom', id: 'h_right_bottom' },
        { view: 'Button', rect: '70 70 100 24', anchors: 'left top', text: 'Left Top', id: 'h_left_top' },
        { view: 'Button', rect: '200 70 100 24', anchors: 'left top', text: 'Rigth Top', id: 'h_right_top' }
    ] }
] }).attachTo( document.getElementById('test'), '1000 400' );

uki('Button').click(function() {
    var button = this;
    uki('Popup').grep(function(e) { return e.relativeTo() == button; }).toggle();
});

uki({ view: 'Popup', rect: '120 120', anchors: 'left bottom', shadow: 'theme(shadow-big)', relativeTo: uki('#left_bottom')[0] })[0].show();
uki({ view: 'Popup', rect: '120 120', anchors: 'left top', visible: true, relativeTo: uki('#left_top')[0] }).attachTo( window );
uki({ view: 'Popup', rect: '120 120', anchors: 'right bottom', relativeTo: uki('#right_bottom')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'right top', relativeTo: uki('#right_top')[0] }).show();

uki({ view: 'Popup', rect: '120 120', anchors: 'left bottom', horizontal: true, relativeTo: uki('#h_left_bottom')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'left top', horizontal: true, relativeTo: uki('#h_left_top')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'right bottom', horizontal: true, relativeTo: uki('#h_right_bottom')[0] }).show();
uki({ view: 'Popup', rect: '120 120', anchors: 'right top', horizontal: true, relativeTo: uki('#h_right_top')[0] }).show();
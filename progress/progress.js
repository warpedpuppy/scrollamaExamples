// using d3 for convenience
var scrolly = d3.select('#scrolly');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

function handleStepProgress(response) {
    console.log(response)
    var el = d3.select(response.element);

    var val = el.attr('data-step');
    var rgba = 'rgba(' + val + ', ' + response.progress + ')';
    el.style('background-color', rgba);
    el.select('.progress').text(d3.format('.1%')(response.progress))
}

function resize() {
    var min = window.innerHeight * 0.5
    var h = min + Math.random() * window.innerHeight * 0.25
    step.style('height', Math.floor(h) + 'px')
    scroller.resize()
}

function init() {
    // 1. setup the scroller with the bare-bones settings
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
            step: '#scrolly article .step',
            progress: true,
            debug: true,
        })
        .onStepProgress(handleStepProgress);

    // setup resize event
    resize()
    window.addEventListener('resize', resize);
}

// kick things off
init();
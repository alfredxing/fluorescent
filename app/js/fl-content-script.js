document.addEventListener("mouseup", function() {
    var classApplier = rangy.createClassApplier("test");
    var highlighter = rangy.createHighlighter();

    highlighter.addClassApplier(classApplier);

    highlighter.highlightSelection("test");
    console.log(highlighter.serialize());
});

var fluorescent = (function(){
    function Annotation(doc, characterRange, classApplier, converter, id, containerElementId) {
        if (id) {
            this.id = id;
            nextHighlightId = Math.max(nextHighlightId, id + 1);
        } else {
            this.id = nextHighlightId++;
        }
        this.characterRange = characterRange;
        this.doc = doc;
        this.classApplier = classApplier;
        this.converter = converter;
        this.containerElementId = containerElementId || null;
        this.applied = false;
    }
}());
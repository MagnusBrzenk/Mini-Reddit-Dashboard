# LineChart

This is a component for drawing a set of simple line graphs using d3. The react and d3 logic has been carefully separated; you just supply data and presentation parameters as specified by the types given in IProps.

## Approach

This component uses the super-simple approach of simply redrawing from scratch the entire SVG whenever the props and/or window size get updated. As such, all of the d3 logic is placed in a single separate function that gets recalled on updated events. If you want to preserve existing lines and have a new line added to the graph in an animated manner, then you'd probably want to migrate the d3 logic from the simple function to its own class (with vars for state preservation, update methods, etc.)

## React

The react component returned always resizes to 100% width/height of its container. It receives props for data and presentation parameters with lots of options and nice defaults. The idea is to create an interface where you don't need to worry about the internal d3 logic.

An attempt was made to make the react component nothing more than a single-element DIV wherein d3 can weave its SVG magic (and so all of the serious work would be carried out in the d3 function). However, it felt a bit nicer to be able to break out the bulk of the dynamically determined CSS into a styled-JSX block, rather than add it all in-line with the d3 `.style()` method. As a result, the chart logic is somewhat spread between the two.

## d3

The d3 is separated into its own function. Each time it is called, it removes an already-existing SVG if present, and just draws everything from scratch. The d3 logic is fairly well annotated because, frankly, it's got a bit of a learning curve (and is easy to forget).

### d3 Gotchas

#### Key Functions

Lost some time with the d3 key function because I figured you could just use the Array.forEach() indices to compute unique keys. However, this doesnt work because of the problem shown in the following example. Suppose you have two lines to draw, A and B, with data points in two separate arrays within our array of type `IDataPoint[][]`. Suppose we use a key of the form `'key-' + i1 + '-' + i2` where `i1` and `i2` are indices for the outer and inner array respectively.

When we loop through the items in the outer array, we first generate dots for line A. No problem. But when we come to the second array and we do `selactAll(.dot)` items, d3 _first_ goes through existing `.dot` elements (i.e. items from first array) and have keys applied to them of the form `key-1-0`, etc. Having gone through the existing keys, it will go through the second array as part of a new key-function process and apply keys that are also of the form `key-1-0`, etc. It will then use these two sets of keys, compare them, and come to the conclusion that the keys are the same in both sets, and so it wont create new dots. Lesson: you can't use the array forEach indices to add dots to your data points in this set up. However, stringifiying the coordinates of the points works finr for these purposes.

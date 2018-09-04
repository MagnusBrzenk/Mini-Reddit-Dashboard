# PieChart

## What's This?

This is a simple PieChart with smooth transitioning for d3 v5 adapted from [this basic demo](https://bl.ocks.org/adamjanes/5e53cfa2ef3d3f05828020315a3ba18c)

## Design

### Overview

As with the `LineChart` component (and as ever), we've been very intentional about separating `react` from `d3`. Unlike `LineChart`, we've implemented d3 via a class so that we have continuity in the chart between updates to the data channeled in through `props`. This very slightly increases the complexity of the react-d3 ecosystem, but is really the way to go in general in order to faciliatate smooth transitions.

### Data Format

The data is simply an array of numbers representing relative arc size.

## Misc Notes

### SVG Shadows

These proved to be tricky. After some trial-and-error, here are some important lessons for creating shadows on any of your svg shapes.

First, safari will freak out unless you apply `filterUnits="userSpaceOnUse"` to your filter tag. ([This answer](https://stackoverflow.com/a/47946201/8620332) was super helpful!) As explained in the [official documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/filterUnits), `userSpaceOnUse` causes the attributes for the filter tag to use the coordinate system of, in this case, the circle element that uses the filter. (In this case, the filter seems to apply correctly to the circle in all browsers by simply not specifying any coord-relevant attributes.)

To summarize, the following procedure seems to work:

1. Add a `defs` tag as a child of your SVG with a `filter` tag wherein you need to specify:
    1. The various properties of your drop shadow
    2. An `id` to be referenced by the element you wish to apply the shadow to;
2. Apply a `filter` attribute referencing the filterId to-be-applied.

For example:

```xml
<svg>
    <defs>
        <filter id="drop-shadow-filter-id8" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0px" dy="0px" stdDeviation="5" flood-color="rgba(0,0,0,1.75)" flood-opacity="1"> </feDropShadow>
        </filter>
    </defs>
    ...
    <circle cx="247.5px" cy="195px" r="145px" fill="#252A3F" filter="url(#drop-shadow-filter-id8)"></circle>
    ...
</svg>
```

NOTE: unfortunately, Firefox seems to misalign shadows on this approach by a couple of pxls -- haven't investigated why yet.

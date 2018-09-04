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

To add shadows to any of your SVG shapes, you need to follow this procedure:

1. Add a `defs` tag as a child of your SVG with a `filter` tag wherein you need to specify:
    1. The various properties of your drop shadow
    2. An `id` to be referenced by the element you wish to apply the shadow to
2. Apply a `filter` attribute referencing the filter to-b-applied.

For example:

```xml
<svg>
    <defs>
       <filter id="basic-shadow" x="0" y="0" width='100', height='100'>
           <feOffset result="offOut" in="SourceAlpha" dx="-5" dy="-5" />
           <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
           <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
    </defs>
    ...
    <circle filter="url(#basic-shadow)">
        <!-- circle params -->
    </circle>
    ...
</svg>
```

A working example the shadow can be found in this d3 PieChart code, with the size of the shadow parameterized to fit around the circle.

import * as d3 from "d3";
import { LineChart } from "./";
import PREZ from "__UTILS/frontendPresentation";
type IDataPoint = LineChart.IDataPoint;
type IChartParams = LineChart.IChartParams;
type Id3Selection = d3.Selection<d3.BaseType, {}, HTMLElement, any>;

/**
 * ~~~~~~~~~~~~~~~~~~~~~ Function to Draw a Simple Line Chart in D3 ~~~~~~~~~~~~~~~~~~~~~
 *
 * d3 code modifies DOM directly; to ensure robust separation from react, we make sure
 * everything is contained within a single DIV referenced by a unique id. Styles for the
 * chart are given in the parent component using styled-jsx to ensure they are kept local
 * to this component. Only styles that concern line colors are applied here with d3
 * operations because it's the easiest way to associate each dataset with a color.
 *
 * Types can be tricky with d3, so in places where it's unlikely to matter, we've had to
 * resort to using 'any'
 *
 * NOTE: this interface !!REQUIRES!! that there be at least one non
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @param svgDivWrapperId
 * @param plottingData
 * @param params
 */
export function drawD3Chart(svgDivWrapperId: string, datasets: IDataPoint[][], params: IChartParams) {
    //Check that datasets has at least one non-empty array of valid type IDataPoint[]
    const bValidDataInput = datasets.find(el => !!el.length);
    if (!bValidDataInput)
        throw new Error(
            "A totally empty set of data points got through -- that is not permitted with this d3-plotting interface interface!"
        );

    // Reset SVG space
    const svgWrapperDiv = document.getElementById(svgDivWrapperId);
    if (!!svgWrapperDiv)
        svgWrapperDiv.childNodes.forEach(function(thisChildNode, key, parent) {
            svgWrapperDiv.removeChild(thisChildNode);
        });

    //If bBinCentering, then shift graph over half a binWidth
    if (!!params.bBinCentering) {
        datasets = datasets.map(dataset => {
            if (!dataset.length) return [];
            const binWidth = dataset[1].x - dataset[0].x;
            return dataset.map(el => ({ x: el.x + binWidth / 2, y: el.y }));
        });
    }

    // Dynamically parametrize size of chart based on container DIV
    // Calc Height, Width & Margins
    const svgDivWrapper = document.getElementById(svgDivWrapperId);
    const wrapperWidth = !!svgDivWrapper ? svgDivWrapper!.offsetWidth : 20;
    const wrapperHeight = !!svgDivWrapper ? svgDivWrapper!.offsetHeight : 20;
    const margin = { top: 50, right: 50, bottom: !!params.xAxisLabel ? 70 : 50, left: !!params.yAxisLabel ? 70 : 50 };
    const width = wrapperWidth - margin.left - margin.right;
    const height = wrapperHeight - margin.top - margin.bottom;

    // Calc graph limits (i.e. maximum value from array of arrays of numbers)
    // Calc maxY
    const maxYs: number[] = datasets.map(dataset => Math.ceil(Math.max.apply(null, dataset.map(el => el.y))));
    const maxY = Math.ceil(Math.max.apply(null, maxYs.map(el => el)));

    // Calc maxX. Note: This logic also rounds x up to beginning of next binWidth
    const binWidth: number = (arr => arr![1].x - arr![0].x)(datasets.find(el => !!el.length)); //Find a non-empty dataset (supposed to be guaranteed by earlier logic)
    const maxXs: number[] = datasets.map(dataset =>
        Math.ceil(Math.max.apply(null, dataset.map(el => Math.ceil(el.x / binWidth) * binWidth)))
    );
    const maxX = Math.ceil(Math.max.apply(null, maxXs.map(el => el)));

    // Get array of colors for lines in graph
    const colorPallete = PREZ.qualitativeColorPalette;

    // -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - \\
    //                                                            \\
    //                      Begin d3-ing !!!                      \\
    //                                                            \\
    // -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - \\

    // Create a linear-scale function mapping our data ranges to the plotting area
    // (Let's call these the 'data space' and 'physical space' respectively
    const xScale = d3
        .scaleLinear()
        .domain([0, maxX]) //Data space
        .range([0, width]); //Physical space
    const yScale = d3
        .scaleLinear()
        .domain([0, maxY]) //Data space
        .range([height, 0]); //Physical space

    //Select the SVG wrapper div
    const svgWrapper: Id3Selection = d3.select("#" + svgDivWrapperId);

    //Create our main svg, and append a group positioned within the defined margins
    const mainSvgGroup: Id3Selection = svgWrapper
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Create X axis using axisBottom configuration
    //If number of ticks isn't specified then let d3 decide; if it's <0, then determine based on wrapper width
    let xAxisFunction: any = d3.axisBottom(xScale);
    if (!!params.numXTicks) {
        const numXTicks = params.numXTicks < 0 ? Math.ceil(width / 50) : params.numXTicks;
        xAxisFunction = xAxisFunction.ticks(numXTicks); //override d3 ticks
    }
    mainSvgGroup
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisFunction);
    //xAxis label
    mainSvgGroup
        .append("text")
        .attr("class", "axes-label-text")
        .attr("transform", "translate(" + width / 2 + " ," + (height + margin.bottom / 2) + ")")
        .text(params.xAxisLabel);

    //Create Y axis using axisLeft configuration
    //If number of ticks isn't specified then let d3 decide
    let yAxisFunction: any = d3.axisLeft(yScale);
    if (!!params.numYTicks) {
        const numYTicks = params.numYTicks < 0 ? Math.ceil(width / 50) : params.numYTicks;
        yAxisFunction = yAxisFunction.ticks(numYTicks); //override d3 ticks
    }
    mainSvgGroup
        .append("g")
        .attr("class", "axis")
        .call(yAxisFunction);
    //yAxis label
    mainSvgGroup
        .append("text")
        .attr("class", "axes-label-text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left / 2)
        .attr("x", 0 - height / 2)
        .text(params.yAxisLabel);

    //Create function that will map points in data space to a curved line in physical space
    let line = d3
        .line<IDataPoint>()
        .x(function(d: IDataPoint, i: number) {
            return xScale(d.x);
        })
        .y(function(d: IDataPoint, i: number) {
            return yScale(d.y);
        });
    if (!!params.bCurvedLine) line = line.curve(d3.curveMonotoneX); // apply smoothing to the line

    //Loop through each dataset of type IDataPoint[] and, for each,
    // append a path, bind the data, and call the line generator
    datasets.forEach((dataset, ind) =>
        mainSvgGroup
            .append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line)
            .style("stroke", colorPallete[ind])
    );
    //Likewise, loop through and add a circle for each data point
    datasets.forEach((dataset, ind) =>
        mainSvgGroup
            .selectAll(".dot")
            .data(
                dataset,

                function key(d: any, i: number) {
                    //This is a 'key' function associating a unique index for each dataset;
                    //Each time you 'selectAll', it will look for .dot elements with this key
                    //if none are found, they'll get created by .enter() next
                    if (i === 0) console.log("--------");
                    console.log("d:", d);
                    return "key-" + ind + "-";
                }
            )
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function(d: IDataPoint, i) {
                return xScale(d.x);
            })
            .attr("cy", function(d: IDataPoint, i) {
                return yScale(d.y);
            })
            .attr("r", 5)
            .style("fill", colorPallete[ind])
            .style("stroke", colorPallete[ind])
            .on("mouseover", function(a, b, c) {
                const $this: HTMLElement | null = this as any;
                if (!!$this) $this.classList.add("focus");
            })
            .on("mouseout", function(a, b, c) {
                const $this: HTMLElement | null = this as any;
                if (!!$this) $this.classList.remove("focus");
            })
    );
}

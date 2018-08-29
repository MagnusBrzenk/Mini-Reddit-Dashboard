import * as d3 from "d3";
import { LineChart } from "__COMPONENTS/LineChart";
import PREZ from "__UTILS/frontendPresentation";
type IDataPoint = LineChart.IDataPoint;
type IChartParams = LineChart.IChartParams;
type Id3Selection = d3.Selection<d3.BaseType, {}, HTMLElement, any>;

/**
 * Draw d3 Simple Line Chart from scratch
 * @param svgDivWrapperId
 * @param plottingData
 * @param params
 */
export function drawD3Chart(svgDivWrapperId: string, plottingData: IDataPoint[][], params: IChartParams) {
    //
    //
    //Reset SVG
    const svgWrapperDiv = document.getElementById(svgDivWrapperId);
    if (!!svgWrapperDiv)
        svgWrapperDiv.childNodes.forEach(function(thisChild, key, parent) {
            svgWrapperDiv.removeChild(thisChild);
        });

    const colorPallete = PREZ.qualitativeColorPalette;

    const svgDivWrapper = document.getElementById(svgDivWrapperId);
    const wrapperWidth = !!svgDivWrapper ? svgDivWrapper!.offsetWidth : 20;
    const wrapperHeight = !!svgDivWrapper ? svgDivWrapper!.offsetHeight : 20;

    console.log("~~~~~~~~~~~~~~~~~~~~");
    console.log("wrapperWidth", wrapperWidth);
    console.log("wrapperHeight", wrapperHeight);
    console.log(plottingData);
    console.log(colorPallete);
    console.log("~~~~~~~~~~~~~~~~~~~~");

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = wrapperWidth - margin.left - margin.right;
    const height = wrapperHeight - margin.top - margin.bottom;

    //Parameterize graph appearance:
    const axisLabelsColor: string = PREZ.displayWhite;

    //Get/generate data:
    // const totalPoints: number = 21;
    // const dataset = d3.range(totalPoints).map(() => ({ y: d3.randomUniform(1)() }));

    // const totalPoints: number = this.state.data.length;
    // const dataset = this.state.data; //d3.range(totalPoints).map(() => ({ y: d3.randomUniform(1)() }));

    const totalPoints: number = plottingData!.length;
    const datasets: IDataPoint[][] = plottingData!; //d3.range(totalPoints).map(() => ({ y: d3.randomUniform(1)() }));
    // const dataset: IDataPoint[] = this.plottingData![0]; //d3.range(totalPoints).map(() => ({ y: d3.randomUniform(1)() }));

    console.log("<><><><><><><><>");
    console.log(datasets);
    // console.log(dataset.map(el => el.x));
    console.log("<><><><><><><><>");

    const maxXs: number[] = datasets.map(dataset => Math.ceil(Math.max.apply(null, dataset.map(el => el.x))));
    const maxX = Math.ceil(Math.max.apply(null, maxXs.map(el => el)));
    const maxYs: number[] = datasets.map(dataset => Math.ceil(Math.max.apply(null, dataset.map(el => el.y))));
    const maxY = Math.ceil(Math.max.apply(null, maxYs.map(el => el)));

    /////////////////
    // Begin d3-ing
    /////////////////

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

    //Create axis of axisBottom configuration
    mainSvgGroup
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale) as any);

    //Create axis of axisLeft configuration
    mainSvgGroup
        .append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(yScale) as any);

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

    //Loop through each data setAppend the path, bind the data, and call the line generator
    datasets.forEach((dataset, ind) =>
        mainSvgGroup
            .append("path")
            .datum(dataset) // 10. Binds data to the line
            .attr("class", "line") // Assign a class for styling
            .attr("d", line as any) // 11. Calls the line generator
            .style("stroke", colorPallete[ind])
    );
    // 12. Appends a circle for each datapoint
    datasets.forEach((dataset, ind) =>
        mainSvgGroup
            .selectAll(".dot")
            //enter data AND supply key function (use index of dataset as key)
            .data(dataset as any, function(d: any) {
                return ind + "";
            })
            .enter()
            .append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function(d: any, i) {
                // return xScale(i);
                return xScale(d.x);
            })
            .attr("cy", function(d: any, i) {
                return yScale(d.y);
            })
            .attr("r", 5)
            .style("fill", colorPallete[ind])
            .style("stroke", colorPallete[ind])
            .on("mouseover", function(a, b, c) {
                // console.log(a, b, c);
                const $this: HTMLElement | null = this as any;
                if (!!$this) $this.classList.add("focus");
            })
            .on("mouseout", function(a, b) {
                //
                // console.log(a, b);
                const $this: HTMLElement | null = this as any;
                if (!!$this) $this.classList.remove("focus");
            })
    );
}

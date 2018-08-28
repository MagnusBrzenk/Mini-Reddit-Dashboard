import * as d3 from "d3";
import { LineChart } from "./";
type IDataPoint = LineChart.IDataPoint;

export default class D3Controller {
    readonly svgDivWrapperId: string;
    // private plottingData: [IDataPoint[]] | undefined;
    constructor(refId: string) {
        this.svgDivWrapperId = refId;
    }

    public drawD3Chart(plottingData: [IDataPoint[]], color: string = "red") {
        this.resetSVG();

        const svgDivWrapper = document.getElementById(this.svgDivWrapperId);
        const wrapperWidth = !!svgDivWrapper ? svgDivWrapper!.offsetWidth : 20;
        const wrapperHeight = !!svgDivWrapper ? svgDivWrapper!.offsetHeight : 20;

        console.log("~~~~~~~~~~~~~~~~~~~~");
        console.log("wrapperWidth", wrapperWidth);
        console.log("wrapperHeight", wrapperHeight);
        console.log(plottingData);
        console.log("~~~~~~~~~~~~~~~~~~~~");

        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = wrapperWidth - margin.left - margin.right;
        const height = wrapperHeight - margin.top - margin.bottom;

        //Get/generate data:
        // const totalPoints: number = 21;
        // const dataset = d3.range(totalPoints).map(() => ({ y: d3.randomUniform(1)() }));

        // const totalPoints: number = this.state.data.length;
        // const dataset = this.state.data; //d3.range(totalPoints).map(() => ({ y: d3.randomUniform(1)() }));

        const totalPoints: number = plottingData!.length;
        const datasets: [IDataPoint[]] = plottingData!; //d3.range(totalPoints).map(() => ({ y: d3.randomUniform(1)() }));
        // const dataset: IDataPoint[] = this.plottingData![0]; //d3.range(totalPoints).map(() => ({ y: d3.randomUniform(1)() }));

        console.log("<><><><><><><><>");
        console.log(datasets);
        // console.log(dataset.map(el => el.x));
        console.log("<><><><><><><><>");

        const maxXs: number[] = datasets.map(dataset => Math.ceil(Math.max.apply(null, dataset.map(el => el.x))));
        const maxX = Math.ceil(Math.max.apply(null, maxXs.map(el => el)));
        const maxYs: number[] = datasets.map(dataset => Math.ceil(Math.max.apply(null, dataset.map(el => el.y))));
        const maxY = Math.ceil(Math.max.apply(null, maxYs.map(el => el)));

        // console.log("________________");
        // console.log(maxX, maxY);
        // console.log(
        //     // Math.ceil(Math.max.apply(dataset.map(el => el.y))),
        //     Math.max.apply(dataset.map(el => el.y)),
        //     dataset.map(el => el.y)
        // );
        // console.log("----------------");
        // console.log(dataset, dataset0);

        // 5. X scale will use the index of our data
        const xScale = d3
            .scaleLinear()
            // .domain([0, totalPoints - 1]) // input
            .domain([0, maxX]) // input
            .range([0, width]); // output

        // 6. Y scale will use the randomly generate number
        const yScale = d3
            .scaleLinear()
            // .domain([0, 1]) // input
            .domain([0, maxY]) // input
            .range([height, 0]); // output

        // 7. d3's line generator
        const line = d3
            .line()
            .x(function(d: any, i) {
                // return xScale(i);
                return xScale(d.x);
            }) // set the x values for the line generator
            .y(function(d: any, i) {
                return yScale(d.y);
            }) // set the y values for the line generator
            .curve(d3.curveMonotoneX); // apply smoothing to the line

        // 0. Create SVG
        const svgWrapper = d3.select("#" + this.svgDivWrapperId);

        // 1. Add the SVG to the page and employ #2
        const svg =
            // d3.select("#" + this.svgId)
            svgWrapper
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // console.log("#" + this.svgId, "svg", svg);

        // 3. Call the x axis in a group tag
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale) as any); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale) as any); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator
        datasets.forEach(
            dataset =>
                svg
                    .append("path")
                    .datum(dataset) // 10. Binds data to the line
                    .attr("class", "line") // Assign a class for styling
                    .attr("d", line as any) // 11. Calls the line generator
        );
        // 12. Appends a circle for each datapoint
        datasets.forEach((dataset, i) =>
            svg
                .selectAll(".dot")
                // .data(dataset)
                .data(dataset as any, function(d: any) {
                    return i + "";
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

    resetSVG() {
        const svgWrapperDiv = document.getElementById(this.svgDivWrapperId);
        if (!!svgWrapperDiv)
            svgWrapperDiv.childNodes.forEach(function(thisChild, key, parent) {
                svgWrapperDiv.removeChild(thisChild);
            });
    }
}

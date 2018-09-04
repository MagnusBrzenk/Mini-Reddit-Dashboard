import * as d3 from "d3";
import PREZ from "__UTILS/frontendPresentation";
import { PieChart } from "./index";
type Id3Selection = d3.Selection<d3.BaseType, {}, HTMLElement, any>;

/**
 * React component wrapping responsive DIV wherein well-separated d3 logic can perform its pie-charting magic
 */
export class PieChartD3 {
    //
    readonly svgDivWrapperId: string;
    private mainSvgGroup: Id3Selection | undefined;
    private arcData: number[] | undefined;
    private plotWidth: number | undefined;
    private plotHeight: number | undefined;

    constructor(svgDivWrapperId: string) {
        this.svgDivWrapperId = svgDivWrapperId;
    }

    resetPieChart(params: PieChart.IPieChartParams) {
        //
        // Reset SVG space
        //
        const svgWrapperDiv = document.getElementById(this.svgDivWrapperId);
        if (!!svgWrapperDiv)
            svgWrapperDiv.childNodes.forEach(function(thisChildNode, key, parent) {
                svgWrapperDiv.removeChild(thisChildNode);
            });

        // Dynamically parameterize size of chart based on container DIV
        const wrapperWidth = !!svgWrapperDiv ? svgWrapperDiv!.offsetWidth : 1;
        const wrapperHeight = !!svgWrapperDiv ? svgWrapperDiv!.offsetHeight : 1;
        const margin = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        };

        const width = wrapperWidth - margin.left - margin.right;
        const height = wrapperHeight - margin.top - margin.bottom;
        this.plotWidth = width;
        this.plotHeight = height;

        const radius = Math.min(this.plotWidth, this.plotHeight) / 2;

        const shadowSizePxls = 5;

        //Create our main svg, and append a group positioned within the defined margins
        const svgWrapper: Id3Selection = d3.select("#" + this.svgDivWrapperId);

        const mainSVG = svgWrapper.append("svg").call(svgElement => {
            svgElement
                .append("defs")
                .append("filter")
                .attr("id", "filter1")
                .attr("x", -shadowSizePxls)
                .attr("y", -shadowSizePxls)
                .attr("width", width + 2 * shadowSizePxls)
                .attr("height", height + 2 * shadowSizePxls)
                .call(filterElement => {
                    filterElement
                        .append("feOffset")
                        .attr("result", "offOut")
                        .attr("in", "SourceAlpha")
                        .attr("dx", "0")
                        .attr("dy", "0");
                    filterElement
                        .append("feGaussianBlur")
                        .attr("result", "blurOut")
                        .attr("in", "offOut")
                        .attr("stdDeviation", shadowSizePxls);
                    filterElement
                        .append("feBlend")
                        .attr("in", "SourceGraphic")
                        .attr("in2", "blurOut")
                        .attr("mode", "normal");
                });
            svgElement.append("g").call(group => {
                group.attr("class", "XXX");
                // group
                //     .append("rect")
                //     .attr("x", "0")
                //     .attr("y", "0")
                //     .attr("width", width)
                //     .attr("height", height)
                //     .attr("transform", `translate(${margin.left}, ${margin.top})`)
                //     .style("fill", "rgba(255,0,0,0.1)");
                group
                    .append("circle")
                    .attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height / 2})`)
                    .attr("class", "chart-circle")
                    .attr("cx", "0")
                    .attr("cy", "0")
                    .attr("r", radius)
                    .attr("filter", "url(#filter1)");
            });
        });

        this.mainSvgGroup = mainSVG
            .attr("width", this.plotWidth + margin.left + margin.right)
            .attr("height", this.plotHeight + margin.top + margin.bottom)
            // .append("g")
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")") //Plotting zone
            // .append("g")
            // .attr("transform", `translate(${margin.left + this.plotWidth / 2}, ${margin.top + this.plotHeight / 2})`);
            .append("g")
            .attr("transform", `translate(${margin.left + this.plotWidth / 2}, ${margin.top + this.plotHeight / 2})`);

        /////

        // this.mainSvgGroup
        // .style("box-shadow", "0px 0px 10px rgba(0,0,0,0.5)");

        ///// //Center drawing coords
    }

    updatePieChart(updatedArcData: number[], params: PieChart.IPieChartParams) {
        //
        // Update/estalish data and presentation params for update
        //
        this.arcData = updatedArcData;
        if (!this.plotWidth || !this.plotHeight || !this.arcData || !this.mainSvgGroup)
            throw new Error("updatePieChart being called before essential class properties have been defined!");
        const arcData = this.arcData;
        const width = this.plotWidth!;
        const height = this.plotHeight!;
        const mainSvgGroup = this.mainSvgGroup!;

        //Params for chart appearance
        const radius = Math.min(width, height) / 2;
        const colors = PREZ.qualitativeColorPalette;

        //Functions used to map data to angles
        const pie = d3
            .pie<number>()
            .value(d => d)
            .sort(null);
        const arc = d3
            .arc<number>()
            .innerRadius(0)
            .outerRadius(radius);

        //
        const path = mainSvgGroup.selectAll("path").data(pie(arcData)); //Dont need key function; default index is fine

        // Update existing arcs
        path.transition()
            .duration(700)
            // .attrTween("d", arcTween);
            .attrTween("d", function arcTween(a: any) {
                const i = d3.interpolate((this as any)._current, a);
                // this._current = i(1);
                (this! as any)._current = i(1);
                return (t: any) => arc(i(t))!;
            });

        // Enter new arcs
        path.enter()
            .append("path")
            // .attr("fill", (d, i) => color(i))
            .attr("fill", (d, i) => colors[i])
            .attr("d", arc as any)
            .attr("stroke", "white")
            .attr("stroke-width", "0px")
            .style("box-shadow", "0px 0px 10px rgba(0,0,0,0.5)")

            .each(function(d) {
                // this._current = d;
                (this! as any)._current = d;
            });
    }
}

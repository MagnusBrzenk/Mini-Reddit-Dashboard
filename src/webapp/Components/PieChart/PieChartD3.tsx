import * as d3 from "d3";
import PREZ from "__UTILS/frontendPresentation";
import { PieChart } from "./index";
import { genUniqueId } from "__UTILS/genUniqueId";
type Id3Selection = d3.Selection<d3.BaseType, {}, HTMLElement, any>;

export class PieChartD3 {
    //
    readonly dropShadowFilterId: string = "drop-shadow-filter-" + genUniqueId();
    readonly svgDivWrapperId: string;
    private mainSvgGroup: Id3Selection | undefined;
    private arcData: number[] | undefined;
    private plotWidth: number | undefined;
    private plotHeight: number | undefined;

    constructor(svgDivWrapperId: string) {
        this.svgDivWrapperId = svgDivWrapperId;
    }

    resetPieChart(params: PieChart.IPieChartParams): boolean {
        //
        // Reset any existing SVG and its contents
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
        //Calc size of main plotting zone
        const width = wrapperWidth - margin.left - margin.right;
        const height = wrapperHeight - margin.top - margin.bottom;
        //Persist these dimensions for later updates
        this.plotWidth = width;
        this.plotHeight = height;
        //Misc Appearance Params
        const radius = Math.min(width, height) / 2;
        const shadowSizePxls = params.pieChartShadowSizePxls;

        //Create SVG within parent wrapper DIV
        const mainSvg = d3
            .select("#" + this.svgDivWrapperId)
            .append("svg")
            .attr("width", `${this.plotWidth + margin.left + margin.right}px`)
            .attr("height", `${this.plotHeight + margin.top + margin.bottom}px`)
            //Append some sibling children to SVG
            .call(svgElement => {
                svgElement
                    .append("defs")
                    .append("filter") //For drop shadow
                    .attr("id", this.dropShadowFilterId)
                    .attr("filterUnits", "userSpaceOnUse")
                    .call(filterElement => {
                        filterElement
                            .append("feDropShadow")
                            .attr("dx", "0")
                            .attr("dy", "0")
                            .attr("x", `-${shadowSizePxls}px`)
                            .attr("y", `-${shadowSizePxls}px`)
                            .attr("width", `${2 * width}px`)
                            .attr("height", `${2 * height}px`)
                            .attr("stdDeviation", `${shadowSizePxls}`)
                            .attr("flood-color", "rgba(0,0,0,1.75)")
                            .attr("flood-opacity", "1");
                    });
                svgElement
                    .append("g")
                    .append("circle")
                    .attr("class", "chart-circle")
                    .attr("cx", `${margin.left + width / 2}px`)
                    .attr("cy", `${margin.top + height / 2}px`)
                    .attr("r", `${radius}px`)
                    .attr("fill", PREZ.primaryColorDarkest)
                    .attr("filter", `url(#${this.dropShadowFilterId})`);
            });

        //Append and persist for updates the main group in which the chart will be plotted
        this.mainSvgGroup = mainSvg
            .append("g")
            .attr("transform", `translate(${margin.left + this.plotWidth / 2}, ${margin.top + this.plotHeight / 2})`);

        //Signify to parent SVG is ready
        return true;
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

        //Create animated arc paths
        const path = mainSvgGroup.selectAll("path").data(pie(arcData)); //Dont need key function; default index is fine
        // Update existing arcs
        path.transition()
            .duration(700)
            .attrTween("d", function arcTween(a: any) {
                const i = d3.interpolate((this as any)._current, a);
                (this! as any)._current = i(1);
                return (t: any) => arc(i(t))!;
            });
        // Enter new arcs
        path.enter()
            .append("path")
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

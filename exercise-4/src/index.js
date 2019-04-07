import { json } from 'd3-fetch'
import { geoPath, geoMercator } from 'd3-geo'
import { select, event } from 'd3-selection'
import { transition } from 'd3-transition'
import * as topojson from 'topojson-client'
import { regions } from './spanish-regions'

// Use Spain communities topoJson file from es-atlas repo
// https://github.com/martgnz/es-atlas
const topoJsonFile =
  'https://unpkg.com/es-atlas@0.2.0/es/autonomous_regions.json'

// store zoomed community id
let zoomed = null

// get width & height
const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight

// set svg element, background & container
const svg = select('#map')
  .attr('width', width)
  .attr('height', height)
const background = svg
  .select('.background')
  .attr('width', width)
  .attr('height', height)
const container = svg.select('.container').style('stroke-width', '1px')

// get tooltip element
const tooltip = select('#tooltip')

// setup map projection & path generator
const projection = geoMercator()
  .scale(2500)
  .center([-3.8, 40.1])
  .translate([width / 2, height / 2])
const path = geoPath().projection(projection)

// Auxiliar method to set tooltip text & position
const setTooltip = (text, x, y) => {
  const tooltipNode = tooltip.node()
  tooltip
    .html(text)
    .style('top', `${Math.round(y - tooltipNode.offsetHeight / 2)}px`)
    .style('left', `${Math.round(x - tooltipNode.offsetWidth / 2)}px`)
    .style('opacity', 1)
}

// Auxiliar method to zoom to a given path
const zoomToPath = d => {
  zoomed = d.id
  // hide tooltip & reset active paths
  tooltip.style('opacity', 0)
  select('.path.active').classed('active', false)
  // add active class to current path
  select(event.target).classed('active', true)
  // get translate & scale values for path bounds
  const bounds = path.bounds(d)
  const dx = bounds[1][0] - bounds[0][0]
  const dy = bounds[1][1] - bounds[0][1]
  const x = (bounds[0][0] + bounds[1][0]) / 2
  const y = (bounds[0][1] + bounds[1][1]) / 2
  const scale = Math.min(8, 0.9 / Math.max(dx / width, dy / height))
  const translate = [
    Math.round(width / 2 - scale * x),
    Math.round(height / 2 - scale * y)
  ]
  // zoom in to current path
  container
    .transition()
    .duration(700)
    .style('stroke-width', `${1 / scale}px`)
    .attr(
      'transform',
      `translate(${translate[0]}, ${translate[1]}) scale(${scale})`
    )
    .on('end', () => {
      setTooltip(regions[d.id], width / 2, height / 2)
    })
}

// Auxiliar method to zoom out
const resetZoom = () => {
  if (zoomed) {
    zoomed = null
    // hide tooltip & reset active paths
    tooltip.style('opacity', 0)
    select('.path.active').classed('active', false)
    // reset zoom
    container
      .transition()
      .duration(400)
      .style('stroke-width', '1px')
      .attr('transform', 'translate(0,0) scale(1)')
  }
}

// Draw svg map from topoJson data
const drawMap = data => {
  // reset zoom on click in background
  background.on('click', resetZoom)
  // draw paths for communities from topoJson data
  container
    .selectAll('path')
    .data(topojson.feature(data, data.objects.autonomous_regions).features)
    .enter()
    .append('path')
    .attr('id', d => `path-${d.id}`)
    .attr('class', 'path')
    .attr('d', path)
    .on('mouseover', d => {
      if (zoomed) return
      // set current path name & position & show tooltip
      const centroid = path.centroid(d)
      setTooltip(regions[d.id], centroid[0], centroid[1])
    })
    .on('mouseout', d => {
      if (zoomed) return
      tooltip.style('opacity', 0) // hide tooltip
    })
    .on('click', d => {
      if (zoomed !== d.id) {
        zoomToPath(d)
      } else {
        resetZoom()
      }
    })
}

// Load topoJson file & draw the map
json(topoJsonFile).then(data => drawMap(data))

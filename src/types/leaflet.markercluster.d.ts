import "leaflet";
import "leaflet.markercluster";

declare module "leaflet" {
  interface MarkerClusterGroupOptions {
    maxClusterRadius?: number;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
  }

  class MarkerClusterGroup extends FeatureGroup {
    constructor(options?: MarkerClusterGroupOptions);
    addLayers(layers: Layer[]): this;
    removeLayers(layers: Layer[]): this;
    clearLayers(): this;
    setMaxZoom(maxZoom: number): this;
    getBounds(): LatLngBounds;
  }

  let markerClusterGroup: {
    (options?: MarkerClusterGroupOptions): MarkerClusterGroup;
  };
}

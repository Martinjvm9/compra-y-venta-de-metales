!function(b,a){L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animateAddingMarkers:!1,spiderfyDistanceMultiplier:1,chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(c){L.Util.setOptions(this,c),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.on(L.FeatureGroup.EVENTS,this._propagateEvent,this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.on(L.FeatureGroup.EVENTS,this._propagateEvent,this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[]},addLayer:function(h){if(h instanceof L.LayerGroup){var c=[];for(var d in h._layers){c.push(h._layers[d])}return this.addLayers(c)}if(!h.getLatLng){return this._nonPointGroup.addLayer(h),this}if(!this._map){return this._needsClustering.push(h),this}if(this.hasLayer(h)){return this}this._unspiderfy&&this._unspiderfy(),this._addLayer(h,this._maxZoom);var f=h,g=this._map.getZoom();if(h.__parent){for(;f.__parent._zoom>=g;){f=f.__parent}}return this._currentShownBounds.contains(f.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(h,f):this._animationAddLayerNonAnimated(h,f)),this},removeLayer:function(f){if(f instanceof L.LayerGroup){var c=[];for(var d in f._layers){c.push(f._layers[d])}return this.removeLayers(c)}return f.getLatLng?this._map?f.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(f)),this._removeLayer(f,!0),this._featureGroup.hasLayer(f)&&(this._featureGroup.removeLayer(f),f.setOpacity&&f.setOpacity(1)),this):this:(!this._arraySplice(this._needsClustering,f)&&this.hasLayer(f)&&this._needsRemoving.push(f),this):(this._nonPointGroup.removeLayer(f),this)},addLayers:function(y){var j,m,q,x,w=this._featureGroup,v=this._nonPointGroup,f=this.options.chunkedLoading,k=this.options.chunkInterval,c=this.options.chunkProgress;if(this._map){var z=0,p=(new Date).getTime(),g=L.bind(function(){for(var d=(new Date).getTime();z<y.length;z++){if(f&&0===z%200){var h=(new Date).getTime()-d;if(h>k){break}}if(x=y[z],x.getLatLng){if(!this.hasLayer(x)&&(this._addLayer(x,this._maxZoom),x.__parent&&2===x.__parent.getChildCount())){var l=x.__parent.getAllChildMarkers(),o=l[0]===x?l[1]:l[0];w.removeLayer(o)}}else{v.addLayer(x)}}c&&c(z,y.length,(new Date).getTime()-p),z===y.length?(this._featureGroup.eachLayer(function(e){e instanceof L.MarkerCluster&&e._iconNeedsUpdate&&e._updateIcon()}),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(g,this.options.chunkDelay)},this);g()}else{for(j=[],m=0,q=y.length;q>m;m++){x=y[m],x.getLatLng?this.hasLayer(x)||j.push(x):v.addLayer(x)}this._needsClustering=this._needsClustering.concat(j)}return this},removeLayers:function(j){var c,d,f,h=this._featureGroup,g=this._nonPointGroup;if(!this._map){for(c=0,d=j.length;d>c;c++){f=j[c],this._arraySplice(this._needsClustering,f),g.removeLayer(f)}return this}for(c=0,d=j.length;d>c;c++){f=j[c],f.__parent?(this._removeLayer(f,!0,!0),h.hasLayer(f)&&(h.removeLayer(f),f.setOpacity&&f.setOpacity(1))):g.removeLayer(f)}return this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),h.eachLayer(function(e){e instanceof L.MarkerCluster&&e._updateIcon()}),this},clearLayers:function(){return this._map||(this._needsClustering=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(c){delete c.__parent}),this._map&&this._generateInitialClusters(),this},getBounds:function(){var d=new L.LatLngBounds;this._topClusterLevel&&d.extend(this._topClusterLevel._bounds);for(var c=this._needsClustering.length-1;c>=0;c--){d.extend(this._needsClustering[c].getLatLng())}return d.extend(this._nonPointGroup.getBounds()),d},eachLayer:function(g,c){var d,f=this._needsClustering.slice();for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(f),d=f.length-1;d>=0;d--){g.call(c,f[d])}this._nonPointGroup.eachLayer(g,c)},getLayers:function(){var c=[];return this.eachLayer(function(d){c.push(d)}),c},getLayer:function(d){var c=null;return this.eachLayer(function(e){L.stamp(e)===d&&(c=e)}),c},hasLayer:function(f){if(!f){return !1}var c,d=this._needsClustering;for(c=d.length-1;c>=0;c--){if(d[c]===f){return !0}}for(d=this._needsRemoving,c=d.length-1;c>=0;c--){if(d[c]===f){return !1}}return !(!f.__parent||f.__parent._group!==this)||this._nonPointGroup.hasLayer(f)},zoomToShowLayer:function(f,c){var d=function(){if((f._icon||f.__parent._icon)&&!this._inZoomAnimation){if(this._map.off("moveend",d,this),this.off("animationend",d,this),f._icon){c()}else{if(f.__parent._icon){var e=function(){this.off("spiderfied",e,this),c()};this.on("spiderfied",e,this),f.__parent.spiderfy()}}}};f._icon&&this._map.getBounds().contains(f.getLatLng())?c():f.__parent._zoom<this._map.getZoom()?(this._map.on("moveend",d,this),this._map.panTo(f.getLatLng())):(this._map.on("moveend",d,this),this.on("animationend",d,this),this._map.setView(f.getLatLng(),f.__parent._zoom+1),f.__parent.zoomToBounds())},onAdd:function(g){this._map=g;var c,d,f;if(!isFinite(this._map.getMaxZoom())){throw"Map has no maxZoom specified"}for(this._featureGroup.onAdd(g),this._nonPointGroup.onAdd(g),this._gridClusters||this._generateInitialClusters(),c=0,d=this._needsRemoving.length;d>c;c++){f=this._needsRemoving[c],this._removeLayer(f,!0)}this._needsRemoving=[],this._zoom=this._map.getZoom(),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),d=this._needsClustering,this._needsClustering=[],this.addLayers(d)},onRemove:function(c){c.off("zoomend",this._zoomEnd,this),c.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),this._hideCoverage(),this._featureGroup.onRemove(c),this._nonPointGroup.onRemove(c),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(d){for(var c=d;c&&!c._icon;){c=c.__parent}return c||null},_arraySplice:function(f,c){for(var d=f.length-1;d>=0;d--){if(f[d]===c){return f.splice(d,1),!0}}},_removeLayer:function(q,f,j){var k=this._gridClusters,p=this._gridUnclustered,m=this._featureGroup,l=this._map;if(f){for(var d=this._maxZoom;d>=0&&p[d].removeObject(q,l.project(q.getLatLng(),d));d--){}}var g,c=q.__parent,v=c._markers;for(this._arraySplice(v,q);c&&(c._childCount--,!(c._zoom<0));){f&&c._childCount<=1?(g=c._markers[0]===q?c._markers[1]:c._markers[0],k[c._zoom].removeObject(c,l.project(c._cLatLng,c._zoom)),p[c._zoom].addObject(g,l.project(g.getLatLng(),c._zoom)),this._arraySplice(c.__parent._childClusters,c),c.__parent._markers.push(g),g.__parent=c.__parent,c._icon&&(m.removeLayer(c),j||m.addLayer(g))):(c._recalculateBounds(),j&&c._icon||c._updateIcon()),c=c.__parent}delete q.__parent},_isOrIsParent:function(d,c){for(;c;){if(d===c){return !0}c=c.parentNode}return !1},_propagateEvent:function(c){if(c.layer instanceof L.MarkerCluster){if(c.originalEvent&&this._isOrIsParent(c.layer._icon,c.originalEvent.relatedTarget)){return}c.type="cluster"+c.type}this.fire(c.type,c)},_defaultIconCreateFunction:function(f){var c=f.getChildCount(),d=" marker-cluster-";return d+=10>c?"small":100>c?"medium":"large",new L.DivIcon({html:"<div><span>"+c+"</span></div>",className:"marker-cluster"+d,iconSize:new L.Point(40,40)})},_bindEvents:function(){var g=this._map,c=this.options.spiderfyOnMaxZoom,d=this.options.showCoverageOnHover,f=this.options.zoomToBoundsOnClick;(c||f)&&this.on("clusterclick",this._zoomOrSpiderfy,this),d&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),g.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(d){var c=this._map;c.getMaxZoom()===c.getZoom()?this.options.spiderfyOnMaxZoom&&d.layer.spiderfy():this.options.zoomToBoundsOnClick&&d.layer.zoomToBounds(),d.originalEvent&&13===d.originalEvent.keyCode&&c._container.focus()},_showCoverage:function(d){var c=this._map;this._inZoomAnimation||(this._shownPolygon&&c.removeLayer(this._shownPolygon),d.layer.getChildCount()>2&&d.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(d.layer.getConvexHull(),this.options.polygonOptions),c.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var g=this.options.spiderfyOnMaxZoom,c=this.options.showCoverageOnHover,d=this.options.zoomToBoundsOnClick,f=this._map;(g||d)&&this.off("clusterclick",this._zoomOrSpiderfy,this),c&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),f.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=this._map._zoom,this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var c=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._zoom,c),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._map._zoom,c),this._currentShownBounds=c}},_generateInitialClusters:function(){var g=this._map.getMaxZoom(),c=this.options.maxClusterRadius,d=c;"function"!=typeof c&&(d=function(){return c}),this.options.disableClusteringAtZoom&&(g=this.options.disableClusteringAtZoom-1),this._maxZoom=g,this._gridClusters={},this._gridUnclustered={};for(var f=g;f>=0;f--){this._gridClusters[f]=new L.DistanceGrid(d(f)),this._gridUnclustered[f]=new L.DistanceGrid(d(f))}this._topClusterLevel=new L.MarkerCluster(this,-1)},_addLayer:function(q,f){var j,k,p=this._gridClusters,m=this._gridUnclustered;for(this.options.singleMarkerMode&&(q.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[q]}}));f>=0;f--){j=this._map.project(q.getLatLng(),f);var l=p[f].getNearObject(j);if(l){return l._addChild(q),q.__parent=l,void 0}if(l=m[f].getNearObject(j)){var d=l.__parent;d&&this._removeLayer(l,!1);var g=new L.MarkerCluster(this,f,l,q);p[f].addObject(g,this._map.project(g._cLatLng,f)),l.__parent=g,q.__parent=g;var c=g;for(k=f-1;k>d._zoom;k--){c=new L.MarkerCluster(this,k,c),p[k].addObject(c,this._map.project(l.getLatLng(),k))}for(d._addChild(c),k=f;k>=0&&m[k].removeObject(l,this._map.project(l.getLatLng(),k));k--){}return}m[f].addObject(q,j)}this._topClusterLevel._addChild(q),q.__parent=this._topClusterLevel},_enqueue:function(c){this._queue.push(c),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var c=0;c<this._queue.length;c++){this._queue[c].call(this)}this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){this._processQueue(),this._zoom<this._map._zoom&&this._currentShownBounds.contains(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,this._map._zoom)):this._zoom>this._map._zoom?(this._animationStart(),this._animationZoomOut(this._zoom,this._map._zoom)):this._moveEnd()},_getExpandedVisibleBounds:function(){if(!this.options.removeOutsideVisibleBounds){return this.getBounds()}var j=this._map,c=j.getBounds(),d=c._southWest,f=c._northEast,h=L.Browser.mobile?0:Math.abs(d.lat-f.lat),g=L.Browser.mobile?0:Math.abs(d.lng-f.lng);return new L.LatLngBounds(new L.LatLng(d.lat-h,d.lng-g,!0),new L.LatLng(f.lat+h,f.lng+g,!0))},_animationAddLayerNonAnimated:function(f,c){if(c===f){this._featureGroup.addLayer(f)}else{if(2===c._childCount){c._addToMap();var d=c.getAllChildMarkers();this._featureGroup.removeLayer(d[0]),this._featureGroup.removeLayer(d[1])}else{c._updateIcon()}}}}),L.MarkerClusterGroup.include(L.DomUtil.TRANSITION?{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_animationZoomIn:function(h,c){var d,f=this._getExpandedVisibleBounds(),g=this._featureGroup;this._topClusterLevel._recursively(f,h,0,function(k){var j,e=k._latlng,i=k._markers;for(f.contains(e)||(e=null),k._isSingleParent()&&h+1===c?(g.removeLayer(k),k._recursivelyAddChildrenToMap(null,c,f)):(k.setOpacity(0),k._recursivelyAddChildrenToMap(e,c,f)),d=i.length-1;d>=0;d--){j=i[d],f.contains(j._latlng)||g.removeLayer(j)}}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(f,c),g.eachLayer(function(e){e instanceof L.MarkerCluster||!e._icon||e.setOpacity(1)}),this._topClusterLevel._recursively(f,h,c,function(e){e._recursivelyRestoreChildPositions(c)}),this._enqueue(function(){this._topClusterLevel._recursively(f,h,0,function(e){g.removeLayer(e),e.setOpacity(1)}),this._animationEnd()})},_animationZoomOut:function(d,c){this._animationZoomOutSingle(this._topClusterLevel,d-1,c),this._topClusterLevel._recursivelyAddChildrenToMap(null,c,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,d,this._getExpandedVisibleBounds())},_animationZoomOutSingle:function(h,c,d){var f=this._getExpandedVisibleBounds();h._recursivelyAnimateChildrenInAndAddSelfToMap(f,c+1,d);var g=this;this._forceLayout(),h._recursivelyBecomeVisible(f,d),this._enqueue(function(){if(1===h._childCount){var e=h._markers[0];e.setLatLng(e.getLatLng()),e.setOpacity&&e.setOpacity(1)}else{h._recursively(f,d,0,function(i){i._recursivelyRemoveChildrenFromMap(f,c+1)})}g._animationEnd()})},_animationAddLayer:function(g,c){var d=this,f=this._featureGroup;f.addLayer(g),c!==g&&(c._childCount>2?(c._updateIcon(),this._forceLayout(),this._animationStart(),g._setPos(this._map.latLngToLayerPoint(c.getLatLng())),g.setOpacity(0),this._enqueue(function(){f.removeLayer(g),g.setOpacity(1),d._animationEnd()})):(this._forceLayout(),d._animationStart(),d._animationZoomOutSingle(c,this._map.getMaxZoom(),this._map.getZoom())))},_forceLayout:function(){L.Util.falseFn(a.body.offsetWidth)}}:{_animationStart:function(){},_animationZoomIn:function(d,c){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,d),this._topClusterLevel._recursivelyAddChildrenToMap(null,c,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(d,c){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,d),this._topClusterLevel._recursivelyAddChildrenToMap(null,c,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(d,c){this._animationAddLayerNonAnimated(d,c)}}),L.markerClusterGroup=function(c){return new L.MarkerClusterGroup(c)},L.MarkerCluster=L.Marker.extend({initialize:function(g,c,d,f){L.Marker.prototype.initialize.call(this,d?d._cLatLng||d.getLatLng():new L.LatLng(0,0),{icon:this}),this._group=g,this._zoom=c,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._bounds=new L.LatLngBounds,d&&this._addChild(d),f&&this._addChild(f)},getAllChildMarkers:function(f){f=f||[];for(var c=this._childClusters.length-1;c>=0;c--){this._childClusters[c].getAllChildMarkers(f)}for(var d=this._markers.length-1;d>=0;d--){f.push(this._markers[d])}return f},getChildCount:function(){return this._childCount},zoomToBounds:function(){for(var k,c=this._childClusters.slice(),d=this._group._map,f=d.getBoundsZoom(this._bounds),j=this._zoom+1,h=d.getZoom();c.length>0&&f>j;){j++;var g=[];for(k=0;k<c.length;k++){g=g.concat(c[k]._childClusters)}c=g}f>j?this._group._map.setView(this._latlng,j):h>=f?this._group._map.setView(this._latlng,h+1):this._group._map.fitBounds(this._bounds)},getBounds:function(){var c=new L.LatLngBounds;return c.extend(this._bounds),c},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(d,c){this._iconNeedsUpdate=!0,this._expandBounds(d),d instanceof L.MarkerCluster?(c||(this._childClusters.push(d),d.__parent=this),this._childCount+=d._childCount):(c||this._markers.push(d),this._childCount++),this.__parent&&this.__parent._addChild(d,!0)},_expandBounds:function(g){var c,d=g._wLatLng||g._latlng;g instanceof L.MarkerCluster?(this._bounds.extend(g._bounds),c=g._childCount):(this._bounds.extend(d),c=1),this._cLatLng||(this._cLatLng=g._cLatLng||d);var f=this._childCount+c;this._wLatLng?(this._wLatLng.lat=(d.lat*c+this._wLatLng.lat*this._childCount)/f,this._wLatLng.lng=(d.lng*c+this._wLatLng.lng*this._childCount)/f):this._latlng=this._wLatLng=new L.LatLng(d.lat,d.lng)},_addToMap:function(c){c&&(this._backupLatlng=this._latlng,this.setLatLng(c)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(f,c,d){this._recursively(f,0,d-1,function(j){var e,g,h=j._markers;for(e=h.length-1;e>=0;e--){g=h[e],g._icon&&(g._setPos(c),g.setOpacity(0))}},function(j){var e,g,h=j._childClusters;for(e=h.length-1;e>=0;e--){g=h[e],g._icon&&(g._setPos(c),g.setOpacity(0))}})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(f,c,d){this._recursively(f,d,0,function(e){e._recursivelyAnimateChildrenIn(f,e._group._map.latLngToLayerPoint(e.getLatLng()).round(),c),e._isSingleParent()&&c-1===d?(e.setOpacity(1),e._recursivelyRemoveChildrenFromMap(f,c)):e.setOpacity(0),e._addToMap()})},_recursivelyBecomeVisible:function(d,c){this._recursively(d,0,c,null,function(e){e.setOpacity(1)})},_recursivelyAddChildrenToMap:function(f,c,d){this._recursively(d,-1,c,function(e){if(c!==e._zoom){for(var h=e._markers.length-1;h>=0;h--){var g=e._markers[h];d.contains(g._latlng)&&(f&&(g._backupLatlng=g.getLatLng(),g.setLatLng(f),g.setOpacity&&g.setOpacity(0)),e._group._featureGroup.addLayer(g))}}},function(g){g._addToMap(f)})},_recursivelyRestoreChildPositions:function(h){for(var c=this._markers.length-1;c>=0;c--){var d=this._markers[c];d._backupLatlng&&(d.setLatLng(d._backupLatlng),delete d._backupLatlng)}if(h-1===this._zoom){for(var f=this._childClusters.length-1;f>=0;f--){this._childClusters[f]._restorePosition()}}else{for(var g=this._childClusters.length-1;g>=0;g--){this._childClusters[g]._recursivelyRestoreChildPositions(h)}}},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(h,c,d){var f,g;this._recursively(h,-1,c-1,function(e){for(g=e._markers.length-1;g>=0;g--){f=e._markers[g],d&&d.contains(f._latlng)||(e._group._featureGroup.removeLayer(f),f.setOpacity&&f.setOpacity(1))}},function(e){for(g=e._childClusters.length-1;g>=0;g--){f=e._childClusters[g],d&&d.contains(f._latlng)||(e._group._featureGroup.removeLayer(f),f.setOpacity&&f.setOpacity(1))}})},_recursively:function(p,d,g,j,m){var l,k,c=this._childClusters,f=this._zoom;if(d>f){for(l=c.length-1;l>=0;l--){k=c[l],p.intersects(k._bounds)&&k._recursively(p,d,g,j,m)}}else{if(j&&j(this),m&&this._zoom===g&&m(this),g>f){for(l=c.length-1;l>=0;l--){k=c[l],p.intersects(k._bounds)&&k._recursively(p,d,g,j,m)}}}},_recalculateBounds:function(){var f,c=this._markers,d=this._childClusters;for(this._bounds=new L.LatLngBounds,delete this._wLatLng,f=c.length-1;f>=0;f--){this._expandBounds(c[f])}for(f=d.length-1;f>=0;f--){this._expandBounds(d[f])}},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}}),L.DistanceGrid=function(c){this._cellSize=c,this._sqCellSize=c*c,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(l,d){var f=this._getCoord(d.x),g=this._getCoord(d.y),k=this._grid,j=k[g]=k[g]||{},h=j[f]=j[f]||[],c=L.Util.stamp(l);this._objectPoint[c]=d,h.push(l)},updateObject:function(d,c){this.removeObject(d),this.addObject(d,c)},removeObject:function(p,d){var g,j,m=this._getCoord(d.x),l=this._getCoord(d.y),k=this._grid,c=k[l]=k[l]||{},f=c[m]=c[m]||[];for(delete this._objectPoint[L.Util.stamp(p)],g=0,j=f.length;j>g;g++){if(f[g]===p){return f.splice(g,1),1===j&&delete c[m],!0}}},eachObject:function(q,f){var j,k,p,m,l,d,g,c=this._grid;for(j in c){l=c[j];for(k in l){for(d=l[k],p=0,m=d.length;m>p;p++){g=q.call(f,d[p]),g&&(p--,m--)}}}},getNearObject:function(A){var j,m,v,z,y,w,f,k,c=this._getCoord(A.x),B=this._getCoord(A.y),q=this._objectPoint,g=this._sqCellSize,x=null;for(j=B-1;B+1>=j;j++){if(z=this._grid[j]){for(m=c-1;c+1>=m;m++){if(y=z[m]){for(v=0,w=y.length;w>v;v++){f=y[v],k=this._sqDist(q[L.Util.stamp(f)],A),g>k&&(g=k,x=f)}}}}}return x},_getCoord:function(c){return Math.floor(c/this._cellSize)},_sqDist:function(g,c){var d=c.x-g.x,f=c.y-g.y;return d*d+f*f}},function(){L.QuickHull={getDistant:function(g,c){var d=c[1].lat-c[0].lat,f=c[0].lng-c[1].lng;return f*(g.lat-c[0].lat)+d*(g.lng-c[0].lng)},findMostDistantPointFromBaseLine:function(l,d){var f,g,k,j=0,h=null,c=[];for(f=d.length-1;f>=0;f--){g=d[f],k=this.getDistant(g,l),k>0&&(c.push(g),k>j&&(j=k,h=g))}return{maxPoint:h,newPoints:c}},buildConvexHull:function(g,c){var d=[],f=this.findMostDistantPointFromBaseLine(g,c);return f.maxPoint?(d=d.concat(this.buildConvexHull([g[0],f.maxPoint],f.newPoints)),d=d.concat(this.buildConvexHull([f.maxPoint,g[1]],f.newPoints))):[g[0]]},getConvexHull:function(l){var d,f=!1,g=!1,k=null,j=null;for(d=l.length-1;d>=0;d--){var h=l[d];(f===!1||h.lat>f)&&(k=h,f=h.lat),(g===!1||h.lat<g)&&(j=h,g=h.lat)}var c=[].concat(this.buildConvexHull([j,k],l),this.buildConvexHull([k,j],l));return c}}}(),L.MarkerCluster.include({getConvexHull:function(){var g,c,d=this.getAllChildMarkers(),f=[];for(c=d.length-1;c>=0;c--){g=d[c].getLatLng(),f.push(g)}return L.QuickHull.getConvexHull(f)}}),L.MarkerCluster.include({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:Math.PI/6,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(this._group._spiderfied!==this&&!this._group._inZoomAnimation){var h,c=this.getAllChildMarkers(),d=this._group,f=d._map,g=f.latLngToLayerPoint(this._latlng);this._group._unspiderfy(),this._group._spiderfied=this,c.length>=this._circleSpiralSwitchover?h=this._generatePointsSpiral(c.length,g):(g.y+=10,h=this._generatePointsCircle(c.length,g)),this._animationSpiderfy(c,h)}},unspiderfy:function(c){this._group._inZoomAnimation||(this._animationUnspiderfy(c),this._group._spiderfied=null)},_generatePointsCircle:function(l,d){var f,g,k=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+l),j=k/this._2PI,h=this._2PI/l,c=[];for(c.length=l,f=l-1;f>=0;f--){g=this._circleStartAngle+f*h,c[f]=new L.Point(d.x+j*Math.cos(g),d.y+j*Math.sin(g))._round()}return c},_generatePointsSpiral:function(l,d){var f,g=this._group.options.spiderfyDistanceMultiplier*this._spiralLengthStart,k=this._group.options.spiderfyDistanceMultiplier*this._spiralFootSeparation,j=this._group.options.spiderfyDistanceMultiplier*this._spiralLengthFactor,h=0,c=[];for(c.length=l,f=l-1;f>=0;f--){h+=k/g+0.0005*f,c[f]=new L.Point(d.x+g*Math.cos(h),d.y+g*Math.sin(h))._round(),g+=this._2PI*j/h}return c},_noanimationUnspiderfy:function(){var j,c,d=this._group,f=d._map,h=d._featureGroup,g=this.getAllChildMarkers();for(this.setOpacity(1),c=g.length-1;c>=0;c--){j=g[c],h.removeLayer(j),j._preSpiderfyLatlng&&(j.setLatLng(j._preSpiderfyLatlng),delete j._preSpiderfyLatlng),j.setZIndexOffset&&j.setZIndexOffset(0),j._spiderLeg&&(f.removeLayer(j._spiderLeg),delete j._spiderLeg)}d._spiderfied=null}}),L.MarkerCluster.include(L.DomUtil.TRANSITION?{SVG_ANIMATION:function(){return a.createElementNS("http://www.w3.org/2000/svg","animate").toString().indexOf("SVGAnimate")>-1}(),_animationSpiderfy:function(C,q){var x,B,A,y,f=this,k=this._group,e=k._map,D=k._featureGroup,v=e.latLngToLayerPoint(this._latlng);for(x=C.length-1;x>=0;x--){B=C[x],B.setOpacity?(B.setZIndexOffset(1000000),B.setOpacity(0),D.addLayer(B),B._setPos(v)):D.addLayer(B)}k._forceLayout(),k._animationStart();var j=L.Path.SVG?0:0.3,z=L.Path.SVG_NS;for(x=C.length-1;x>=0;x--){if(y=e.layerPointToLatLng(q[x]),B=C[x],B._preSpiderfyLatlng=B._latlng,B.setLatLng(y),B.setOpacity&&B.setOpacity(1),A=new L.Polyline([f._latlng,y],{weight:1.5,color:"#222",opacity:j}),e.addLayer(A),B._spiderLeg=A,L.Path.SVG&&this.SVG_ANIMATION){var g=A._path.getTotalLength();A._path.setAttribute("stroke-dasharray",g+","+g);var w=a.createElementNS(z,"animate");w.setAttribute("attributeName","stroke-dashoffset"),w.setAttribute("begin","indefinite"),w.setAttribute("from",g),w.setAttribute("to",0),w.setAttribute("dur",0.25),A._path.appendChild(w),w.beginElement(),w=a.createElementNS(z,"animate"),w.setAttribute("attributeName","stroke-opacity"),w.setAttribute("attributeName","stroke-opacity"),w.setAttribute("begin","indefinite"),w.setAttribute("from",0),w.setAttribute("to",0.5),w.setAttribute("dur",0.25),A._path.appendChild(w),w.beginElement()}}if(f.setOpacity(0.3),L.Path.SVG){for(this._group._forceLayout(),x=C.length-1;x>=0;x--){B=C[x]._spiderLeg,B.options.opacity=0.5,B._path.setAttribute("stroke-opacity",0.5)}}setTimeout(function(){k._animationEnd(),k.fire("spiderfied")},200)},_animationUnspiderfy:function(q){var f,j,k,p=this._group,m=p._map,l=p._featureGroup,d=q?m._latLngToNewLayerPoint(this._latlng,q.zoom,q.center):m.latLngToLayerPoint(this._latlng),g=this.getAllChildMarkers(),c=L.Path.SVG&&this.SVG_ANIMATION;for(p._animationStart(),this.setOpacity(1),j=g.length-1;j>=0;j--){f=g[j],f._preSpiderfyLatlng&&(f.setLatLng(f._preSpiderfyLatlng),delete f._preSpiderfyLatlng,f.setOpacity?(f._setPos(d),f.setOpacity(0)):l.removeLayer(f),c&&(k=f._spiderLeg._path.childNodes[0],k.setAttribute("to",k.getAttribute("from")),k.setAttribute("from",0),k.beginElement(),k=f._spiderLeg._path.childNodes[1],k.setAttribute("from",0.5),k.setAttribute("to",0),k.setAttribute("stroke-opacity",0),k.beginElement(),f._spiderLeg._path.setAttribute("stroke-opacity",0)))}setTimeout(function(){var e=0;for(j=g.length-1;j>=0;j--){f=g[j],f._spiderLeg&&e++}for(j=g.length-1;j>=0;j--){f=g[j],f._spiderLeg&&(f.setOpacity&&(f.setOpacity(1),f.setZIndexOffset(0)),e>1&&l.removeLayer(f),m.removeLayer(f._spiderLeg),delete f._spiderLeg)}p._animationEnd()},200)}}:{_animationSpiderfy:function(p,d){var g,j,m,l,k=this._group,c=k._map,f=k._featureGroup;for(g=p.length-1;g>=0;g--){l=c.layerPointToLatLng(d[g]),j=p[g],j._preSpiderfyLatlng=j._latlng,j.setLatLng(l),j.setZIndexOffset&&j.setZIndexOffset(1000000),f.addLayer(j),m=new L.Polyline([this._latlng,l],{weight:1.5,color:"#222"}),c.addLayer(m),j._spiderLeg=m}this.setOpacity(0.3),k.fire("spiderfied")},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerClusterGroup.include({_spiderfied:null,_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Path.SVG&&!L.Browser.touch&&this._map._initPathRoot()},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(c){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(c))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(c){this._spiderfied&&this._spiderfied.unspiderfy(c)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(c){c._spiderLeg&&(this._featureGroup.removeLayer(c),c.setOpacity(1),c.setZIndexOffset(0),this._map.removeLayer(c._spiderLeg),delete c._spiderLeg)}})}(window,document);
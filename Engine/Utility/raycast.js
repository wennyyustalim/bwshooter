define([], function(){
	var RayCast = function( option ){
		// adaptation from : http://gamedev.stackexchange.com/questions/18436/most-efficient-aabb-vs-ray-collision-algorithms

		// ray starting position
		var rx = option.x;
		var ry = option.y;
		
		// ray direction
		var dx = option.tx - option.x;
		var dy = option.ty - option.y;

		var walls = option.walls;
		var callback = option.callback || function(){};
		
		// ray length
		var r = Math.sqrt( dx * dx + dy * dy );
		
		// direction fraction 1 / normalize( vector )
		var dfx = r/dx;
		var dfy = r/dy;
		
		var range = r;
		var wall = false;

		for( var i = 0; i < walls.length; ++ i ){
			var p = walls[i];
			var t1 = ( p.x - rx ) * dfx;
			var t2 = ( p.x + p.width - rx ) * dfx;

			var t3 = ( p.y - ry ) * dfy;
			var t4 = ( p.y - p.height - ry ) * dfy;
			
			var tmin = Math.max( Math.min(t1,t2), Math.min(t3,t4) );
			var tmax = Math.min( Math.max(t1,t2), Math.max(t3,t4) );
			
			// if tmax < 0, ray (line) is intersecting AABB, but whole AABB is behing us
			if (tmax < 0){
				continue;
			}
			
			// if tmin > tmax, ray doesn't intersect AABB
			if (tmin > tmax){
				continue;
			}
			
			// finding first object to collide with the ray
			if( tmin < range ){
				range = tmin;
				wall = p;
				
				callback({ range : tmin, wall : p });
			}
		}
		
		return { range : range, wall : wall };
	}
	
	return RayCast;
});

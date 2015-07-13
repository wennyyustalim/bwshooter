define(['Engine/Utility/underscore','Engine/Utility/Converter'], function( _, Converter ){
	var defaults = {
		x : 0,
		y : 0,
		penetrable : false,
		width : 100
	};
	
	var Platform = function( option ){
		_.extend( this, _.defaults( option, defaults ) );
	}
	
	var PlatformConverter = new Converter.BasicConverter({
		x : Converter.type.NUMBER,
		y : Converter.type.NUMBER,
		penetrable : Converter.type.BOOLEAN,
		width : Converter.type.NUMBER
	});
	
	_.extend( Platform.prototype, {
		toBin : function(){
			PlatformConverter.convertToBin( this );
		},
		parseBin : function( bin ){
			_.extend( this, PlatformConverter.convertToClass( bin ) );
		}
	});
	
	
	return Platform;
});

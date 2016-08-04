(function () {

	'use strict';

 	angular.module('Strom').directive( 'myfile', [ function () 
 	{
	
 		var MyFile = {};

 		MyFile.restrict = 'E';

 		MyFile.require = '^form';

 		MyFile.replace = true;

 		MyFile.templateUrl = '/directives/html/myfile.html';

 		MyFile.scope = {};

 		MyFile.scope.label = '@';
 		MyFile.scope.name = '@';
 		MyFile.scope.required = '@';
 		MyFile.scope.model = '=';

 		MyFile.link = function ( scope, element, attributes, form )
 		{
			scope.form = form;
			scope.selecetd;

			function removeElement (argument) 
			{
				var file = $(argument.toElement);

				scope.model = scope.model.filter(function (el) 
				{
	             	return el.name !== file.attr('id');
	         	} );

				if( scope.model.length == 0 )
				{
					scope.model = null;
				}

				scope.$apply();
	         	file.remove(); 
			};

			function addFileList( file )
			{
				var li = document.createElement( 'li' );
				
				li.setAttribute( 'id', file.name );
				li.setAttribute( 'class', 'file-list' );

				li.innerHTML =  '<div data-ng-class"file-list-selected : selected === " ' + file + ' data-ng-model="' + file + '" data-ng-click="selected=' + file + '">' +
									'<i class="' + getIcon( file.type ) + '"></i>' +
									'<span>' + file.name + '</span>' +
               					'</div>';

				document.getElementById( 'myfilelist' ).insertBefore( li, null );
			};

			function getIcon( type )
			{
				var extension = 'fa-file-o';

				if ( type.match( 'images.*' ) ) 		extension = 'fa-file-image-o';
      		
	          	if( type.match( 'application/pdf' ) ) 	extension = 'fa-file-pdf-o';
	          	
	          	if( type.match( 'application/zip' ) ) 	extension = 'fa-file-zip-o';
	          	
	          	if( type.match('video.*' ) ) 	  		extension = 'fa-file-video-o';

	          	if( type.indexOf( 'sheet')  >= 0 ) 		extension = 'fa-file-excel-o';

	          	if( type.indexOf( 'document' )  >= 0 )  extension = 'fa-file-word-o';
	          	
	          	if( type.indexOf( 'ext/plain' )  >= 0 ) extension = 'fa-file-text-o';
	          					
				return 'fa ' + extension + ' icon-upload';
			};

			function handleFileSelect( evt ) 
			{
			    var file = evt.target.files[0];
			    
			    var attachment = {};

			    if ( file && file.name )
			   	{
					$('#uploadFile').val( file.name );

			   		attachment.name = file.name;
			   		attachment.type = file.type;

			   		addFileList( attachment );
			   	}
				
		      	var reader = new FileReader();

		        reader.addEventListener( "loadend"  , loadEnd);
		        reader.addEventListener( "loadstart", loadStart);

				function loadEnd( e )
				{
				  $('#loadstart').remove();
				};

				function loadStart( e )
				{
		  			var span = document.createElement('span');
	          		span.innerHTML = '<i id="loadstart" class="fa fa-spinner fa-pulse fa-3x fa-fw icon-loading" ></i>';

	          		document.getElementById('action-postings').insertBefore(span, null);		
				};

		      	reader.onload = ( function( theFile )
		      	{
		        	return function( e ) 
		        	{
 		
			          	attachment.base64 = e.target.result;

                        if ( ! scope.model )
                        {
                            scope.model = [];    
                        }


                        scope.model.push( attachment );
		        	};

		      	} )( file );

		      	reader.readAsDataURL( file );
			};
			
			document.getElementById('files').addEventListener('change', handleFileSelect, false);
		};

		return MyFile;
	} ] );

} ) ();
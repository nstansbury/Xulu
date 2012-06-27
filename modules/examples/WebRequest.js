	
	System.Import( "System.Net" );
	System.Import( "System.Text" );

	// The state object
	asyncState = {
		Request: null,
		Response : null,
		Stream : null,
		Buffer : [],
		Data : new System.Text.StringBuilder(),
		Callback : null
	};
	
	// Get a web request object
	asyncState.Request = System.Net.WebRequest.Create( "http://www.mozilla.org" );
	
	function responseCallback( asyncResult )	{
		// Get the state object back
		var asyncState = asyncResult.AsyncState;
		// Get the async GetResponse() result
		asyncState.Response = asyncState.Request.EndGetResponse( asyncResult );
		// Get the response stream
		asyncState.Stream = asyncState.Response.GetResponseStream();
		// Begin a stream sync read
		asyncState.Stream.BeginRead( asyncState.Buffer, 0, -1, asyncState.Callback, asyncState );
	}
	
	function streamCallback( asyncResult )	{
		// Get the state object back
		var asyncState = asyncResult.AsyncState;
		// Get the async Read() result
		var bytesRead = asyncState.Stream.EndRead( asyncResult );
		// Add to data buffer
		asyncState.Data.Append( asyncState.Buffer );
		Console.WriteLine( "Bytes Read: " +bytesRead );
		if ( bytesRead != 0 )		{
			// If the stream has more data
			asyncState.Stream.BeginRead( asyncState.Buffer, 0, -1, asyncState.Callback, asyncState );
		}
		else	{
			// Else write it out
			Console.WriteLine( "Buffer : " + bytesRead +"\n" +asyncState.Data.ToString() );
		}
	}
	
	// Create a stream Read delegate
	var streamDelegate = new System.AsyncCallback( streamCallback );
	asyncState.Callback = streamDelegate;
	
	// Create a requestCallback delegate
	var responseDelegate = new System.AsyncCallback( responseCallback );
	// Start the request
	asyncState.Request.BeginGetResponse( responseDelegate, asyncState );
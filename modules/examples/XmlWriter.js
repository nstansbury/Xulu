
	System.Import( "System.Xml" );
	System.Import( "System.IO" );
	
	var stream = new Stream();
	var xmlWriter = XmlWriter.Create( stream );
	
	xmlWriter.WriteStartDocument();
	
	xmlWriter.WriteStartElement( "soap", "Envelope", "http://schemas.xmlsoap.org/soap/envelope/" );
		xmlWriter.WriteAttributeString( "soap", "soapAction", "http://schemas.xmlsoap.org/soap/envelope/", "acceptRequest" );
	
		xmlWriter.WriteStartElement( "soap", "Header", "http://schemas.xmlsoap.org/soap/envelope/" );
		xmlWriter.WriteEndElement();
	
		xmlWriter.WriteStartElement( "soap", "Header", "http://schemas.xmlsoap.org/soap/envelope/" );
		xmlWriter.WriteEndElement();
	
		xmlWriter.WriteStartElement( "soap", "Body", "http://schemas.xmlsoap.org/soap/envelope/" );
			xmlWriter.WriteAttributeString( "xmlns", "soapenc", null, "http://schemas.xmlsoap.org/soap/encoding/" );
			xmlWriter.WriteValue( "SOAP Body value" );
		xmlWriter.WriteEndElement();

	xmlWriter.WriteEndElement();
	
	xmlWriter.WriteStartElement( "soap", "Header", "http://schemas.xmlsoap.org/soap/envelope/" );
	xmlWriter.WriteEndElement();

	xmlWriter.Close();
	
	var buf = [];
	stream.Read( buf, 0, -1 );
	Console.WriteLine( buf );
	
	stream.Close();
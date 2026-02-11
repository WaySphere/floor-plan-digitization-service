# Floor Plan Digitization Service

A Node.js service that converts DXF (Drawing Exchange Format) files into GeoJSON format for digital floor plan processing.

## Features

- Upload DXF files via REST API
- Parse DXF entities (LINE, LWPOLYLINE, CIRCLE, TEXT)
- Convert floor plan elements to GeoJSON format
- Extract walls, rooms, and points of interest

## Installation

```bash
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

The server will run at `http://localhost:6565`

## API Endpoint

### Upload DXF File

**POST** `/api/dxf/upload`

- **Content-Type**: `multipart/form-data`
- **Body**: Form field `file` with DXF file

**Response**:
```json
{
  "success": true,
  "geoJSON": {
    "type": "FeatureCollection",
    "features": [...]
  }
}
```

## Project Structure

```
.
├── app.js                      # Express server entry point
├── package.json                # Dependencies and scripts
├── src/
│   ├── controllers/
│   │   └── dxfController.js    # Request handling logic
│   ├── routes/
│   │   └── dxfRoutes.js        # API route definitions
│   └── utils/
│       └── dxfParser.js        # DXF parsing and GeoJSON conversion
└── uploads/                    # Temporary file storage (auto-created)
```

## Dependencies

- **express**: Web framework
- **multer**: File upload handling
- **dxf-parser**: DXF file parsing

## License

MIT License - see [LICENSE](LICENSE) file for details

const fs = require('fs');
const DxfParser = require('dxf-parser');

exports.parseDXF = (filePath) => {
    const parser = new DxfParser();
    const dxfContent = fs.readFileSync(filePath, 'utf-8');
    const dxfData = parser.parseSync(dxfContent);

    return dxfData.entities.map(entity => {
        if (['LINE', 'LWPOLYLINE', 'CIRCLE', 'TEXT'].includes(entity.type)) {
            return {
                type: entity.type,
                startPoint: entity.startPoint || null,
                endPoint: entity.endPoint || null,
                vertices: entity.vertices || null,
                text: entity.text || null,
            };
        }
    }).filter(Boolean);
};

exports.toGeoJSON = (elements) => {
    return {
        type: "FeatureCollection",
        features: elements.map(element => {
            if (element.type === 'LINE') {
                return {
                    type: "Feature",
                    properties: { type: "wall" },
                    geometry: {
                        type: "LineString",
                        coordinates: [[element.vertices[0].x, element.vertices[0].y], [element.vertices[1].x, element.vertices[1].y]]
                    }
                };
            } else if (element.type === 'LWPOLYLINE') {
                return {
                    type: "Feature",
                    properties: { type: "room" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [element.vertices.map(v => [v.x, v.y])]
                    }
                };
            } else if (element.type === 'TEXT') {
                return {
                    type: "Feature",
                    properties: { type: "poi", name: element.text },
                    geometry: {
                        type: "Point",
                        coordinates: [[element.startPoint.x, element.startPoint.y], [element.endPoint.x, element.endPoint.y]]
                    }
                };
            }
        })
    };
};

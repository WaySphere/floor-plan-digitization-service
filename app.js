const express = require('express');
const dxfRoutes = require('./src/routes/dxfRoutes');

const app = express();
const PORT = 6565;

app.use(express.json());
app.use('/api/dxf', dxfRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

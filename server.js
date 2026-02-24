const app = require("./app");
const dashboardRoutes = require('./routes/dashboardRoutes');
const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});
app.use('/', dashboardRoutes);
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
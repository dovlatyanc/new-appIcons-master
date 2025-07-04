const appcfg = require('./appcfg')
const express = require("express")  // импортировали пакет для работы веб-сервера
const port = appcfg.webServerPort

// создаем объект класса приложения express (веб-сервера)
const app = express()
const app_folder = "C:\\Users\\User\\Desktop\\new-appIcons-master\\dist"
app.use('/', express.static(app_folder))
// Обслуживаем корневую директорию по всем типам запросов
app.all('/', (req, res) => {
    res.status(200).sendFile('/',
        {root: app_folder})
})
app.listen(port, () => {
    console.log("Node Express server is listening on http://localhost:" + port)
})

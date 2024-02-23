import http from 'http'
import { createApp,useModules,finishApp } from './app';



(async () => {

    const app = createApp();

    // useHttpLogging(app);
    // console.log('mongo-----', process.env.MONGO_URI)
    const co = {
        cookie:
        {
            domain: 'localhost',
            max_age: 86400000,
            path: '/',
            http_only: true,
            same_site: 'strict',
            secure: false
        }
    }


    const se = {
        session: {
            redis_url: 'redis://localhost:6379?prefix=goal2',
            secret: 'VnBHZv0bOycEj8XodmQiJFDB0uTjd5fPntJ0bO4rwXpSW5rWyC8h1s8Oc37Nxz6PZJ5Fz1Ig5xr83ob0emYQvA'
        }
    }


    app.get('/healthy', (req, res) => {
        // console.log(req.sessionID, 'dkd')
        res.send({ 'msg': "this is testing api" })
    })

    useModules(app);

    finishApp(app);
    try {
        const PORT = process.env.PORT || 5001;
        const server = http.createServer(app);
        await server.listen(PORT);
        console.log(`server connected at ${PORT}`)

    } catch (err) {
        console.log(err)
    }

})();

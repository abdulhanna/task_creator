import mongoose from 'mongoose';

(async () => {
    const MONGO_URL = 'mongodb://mgres-8upzazjkzbg-h9ujms5ozqldfngn:C6rUDwQAk1QkbN-uOUOouKmTJ2LIPbFIsVmcfTF6@mgsvc-mnyxkk3nbrh0agx-w4wixqgvtkie-0.mgsvc-mnyxkk3nbrh0agx-w4wixqgvtkie.goal2-91328.svc.cluster.local:27017/goal2'

    const url = 'mongodb://com-goal2-admin:d9Q3yScNYPAA2Zmb9SKGo056hFqYn7XmQ1Q6eD2jtW1--1ce_sL8QzrHDjfthsRZpeWe_7_bVcQ3Efm3dHyNwQ@mongo-mongodb-0.mongo-service.helm-mongo:27017,mongo-mongodb-1.mongo-service.helm-mongo:27017/com-goal2-db?authSource=com-goal2-db&replicaSet=rs0'
    try {
        const mongoUri = 'mongodb://localhost:27017/task_creator';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.error('mongo is connected');
    } catch (err) {
        console.error('mongo is not connected', err);
    }
})();


import mongoose from 'mongoose';

(async () => {
     
  let  password = "XgMYoOUsgPNcEzOl"
//   let user = abdulhannan
  let cluster = 'mongodb+srv://abdulhannan:XgMYoOUsgPNcEzOl@cluster0.mvhte7n.mongodb.net/'

    try {
        const mongoUri = 'mongodb://localhost:27017/task_creator';
        await mongoose.connect(cluster, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.error('mongo is connected');
    } catch (err) {
        console.error('mongo is not connected', err);
    }
})();


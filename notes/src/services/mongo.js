import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGODB_URI;

console.log(`Connecting to`, url);
mongoose.set(`strictQuery`, false);

mongoose.connect(url, {family : 4})
    .then(result => {
        console.log(`Connected to the database.`);
    })
    .catch(err => {
        console.log(`Error connecting to the database: `, err.message);
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();   //It's an object hence converted to string
        delete ret._id;
        delete ret.__v;
    }
})


export default mongoose.model('Note', noteSchema);


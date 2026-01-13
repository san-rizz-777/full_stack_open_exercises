import mongoose from 'mongoose';

if(process.argv.length < 3) {
    console.log(`Please enter the password`);
    process.exit();
}

const password = process.argv[2];

//Url to connect to the database
const url = `mongodb+srv://Cluster43176:${password}@cluster43176.q48ktxd.mongodb.net/phoneApp?appName=Cluster43176`;

mongoose.set(`strictQuery`, false);

///Connecting to the database
mongoose.connect(url, {family : 4});

//Create a schema
const schema = new mongoose.Schema({
    name : String,
    number: Number,
});

//create a model
const pBook = mongoose.model('Person', schema);



if(process.argv.length === 3)
{
    //get them all the entries
     await pBook.find({}).then(list => {
        list.forEach(person => {
            console.log(person);
        })
     });
     console.log(`Printing......`);
     mongoose.connection.close();
}
else if(process.argv.length === 5){
   //console.log(typeof process.argv[4]);
      ///create a document with the given info
    const person = new pBook({
        name: process.argv[3],
        number: Number(process.argv[4]),
    });

    ///save it now
    person.save().then(() => {
        console.log(`Successfully created ${person.name}`);
        mongoose.connection.close();
    })
}
// Import Mongo connection packages
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const {ObjectId} = require('mongodb');

// Setup Database Object
const url = process.env.DB_URL;
const db_name = process.env.DB_NAME;
const col_name = process.env.COL_NAME;
const options = {
    useUnifiedTopology: true
};

// Read all books
const readBooks = (bookYear = '') => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            if (bookYear === '') {
                collection.find({}).toArray((err, docs) => {
                    assert.equal(err, null);
                    resolve(docs);
                    client.close();
                });
            } else  {
                collection.findOne({year: bookYear}, (err, doc) => {
                    assert.equal(err, null);
                    resolve(doc);
                    client.close();
                });
            }
        })
    });
    return iou;
}

// Create a book
const createBook = (book) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.insertOne(book, (err, result) => {
                assert.equal(err, null);
                resolve(result.ops);
                client.close();
            })
        })
    });
    return iou;
}

// Modify/Update a book
const updateBook = (id, book) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: {...book}}, (err, result) => {
                assert.equal(err, null);
                resolve(result.value);
                client.close();
            })
        })
    });
    return iou;
}

// Modify/Replace a book
const replaceBook = (id, book) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const objId = new ObjectId(id);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndReplace({_id: objId}, book, {upsert: true}, (err, result) => {
                assert.equal(err, null);
                resolve(result.value);
                client.close();
            })
        })
    });
    return iou;
}

// Delete a book
const deleteBook = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndDelete({_id: new ObjectId(id)}, (err, result) => {
                assert.equal(err, null);
                resolve(result.value);
                client.close();
            });
        });
    });
    return iou;
}

// Export CRUD functions
module.exports = {
    readBooks,
    createBook,
    updateBook,
    replaceBook,
    deleteBook
}
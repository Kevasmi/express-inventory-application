#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async');
const Product = require('./models/product');
const Theme = require('./models/theme');
const ProductInstance = require('./models/productinstance');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const themes = [];
const products = [];
const productinstances = [];

function themeCreate(name, cb) {
  const theme = new Theme({ name: name });

  theme.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Theme: ' + theme);
    themes.push(theme);
    cb(null, theme);
  });
}

function productCreate(
  name,
  price,
  pieceCount,
  theme,
  setNumber,
  difficulty,
  cb
) {
  productdetail = {
    name: name,
    price: price,
    pieceCount: pieceCount,
    theme: theme,
    setNumber: setNumber,
    difficulty: difficulty,
  };

  const product = new Product(productdetail);
  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Product: ' + product);
    products.push(product);
    cb(null, product);
  });
}

function productInstanceCreate(product, status, cb) {
  productinstancedetail = {
    product: product,
    status: status,
  };

  const productinstance = new ProductInstance(productinstancedetail);
  productinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING ProductInstance: ' + productinstance);
      cb(err, null);
      return;
    }
    console.log('New ProductInstance: ' + productinstance);
    productinstances.push(productinstance);
    cb(null, product);
  });
}

function createThemes(cb) {
  async.series(
    [
      function (callback) {
        themeCreate('Technic', callback);
      },
      function (callback) {
        themeCreate('Star Wars', callback);
      },
      function (callback) {
        themeCreate('Creator Expert', callback);
      },
      function (callback) {
        themeCreate('Marvel', callback);
      },
    ],
    // optional callback
    cb
  );
}

function createProducts(cb) {
  async.parallel(
    [
      function (callback) {
        productCreate(
          'Ford Mustang',
          169.99,
          1471,
          themes[2],
          10265,
          '3 - Expert',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Lamborghini Sián FKP 37',
          449.99,
          3696,
          themes[0],
          42115,
          '4 - Master',
          callback
        );
      },
      function (callback) {
        productCreate(
          'AT-AT',
          849.99,
          6785,
          themes[1],
          75313,
          '3 - Expert',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Captain Rex Helmet',
          69.99,
          75349,
          themes[1],
          75349,
          '1 - Intermediate',
          callback
        );
      },
      function (callback) {
        productCreate(
          'Thanos Mech Armor',
          14.99,
          113,
          themes[3],
          76242,
          '0 - Beginner',
          callback
        );
      },
      function (callback) {
        productCreate(
          'The Daily Bugle',
          349.99,
          3772,
          themes[3],
          76178,
          '2 - Advanced',
          callback
        );
      },
      function (callback) {
        productCreate(
          'The Razor Crest',
          599.99,
          6187,
          themes[1],
          75331,
          '3 - Expert',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createProductInstances(cb) {
  async.parallel(
    [
      function (callback) {
        productInstanceCreate(products[0], 'Available', callback);
      },
      function (callback) {
        productInstanceCreate(products[1], 'Coming Soon!', callback);
      },
      function (callback) {
        productInstanceCreate(products[2], 'Available', callback);
      },
      function (callback) {
        productInstanceCreate(products[3], 'Available', callback);
      },
      function (callback) {
        productInstanceCreate(products[3], 'Out of Stock', callback);
      },
      function (callback) {
        productInstanceCreate(products[5], 'Available', callback);
      },
      function (callback) {
        productInstanceCreate(products[4], 'Available', callback);
      },
      function (callback) {
        productInstanceCreate(products[4], 'Out of Stock', callback);
      },
      function (callback) {
        productInstanceCreate(products[6], 'Out of Stock', callback);
      },
      function (callback) {
        productInstanceCreate(products[0], 'Available', callback);
      },
      function (callback) {
        productInstanceCreate(products[1], 'Coming Soon!', callback);
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createThemes, createProducts, createProductInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('ProductInstances: ' + productinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

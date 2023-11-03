declare namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }
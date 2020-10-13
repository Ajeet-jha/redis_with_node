const redis = require("../config/connection");

module.exports = class Redis {
  constructor() {}

  set = function (key, data, expire = 86400) {
    var promise = new Promise((resolve, reject) => {
      if (typeof data === "object") {
        data = JSON.stringify(data);
      }
      redis.set(key, data, (err, response) => {
        if (response == "OK") {
          if (expire) {
            this.expires(key, expire);
          }
          resolve(1);
        } else {
          resolve(0);
        }
      });
    });
    return promise;
  };

  get = function (key) {
    var promise = new Promise((resolve, reject) => {
      redis.get(key, (err, success) => {
        if (!err && success) {
          try {
            success = JSON.parse(success);
          } catch (error) {}
          resolve(success);
        } else {
          resolve("");
        }
      });
    });
    return promise;
  };

  hashSet = function (id, key, data, expire = 86400) {
    var promise = new Promise((resolve, reject) => {
      if (typeof data === "object") {
        data = JSON.stringify(data);
      }
      redis.hset(id, key, data, (err, response) => {
        if (response == 1) {
          if (expire) {
            this.expires(key, expire);
          }
          resolve(1);
        } else {
          resolve(0);
        }
      });
    });
    return promise;
  };

  hashGetAll = function (id) {
    var promise = new Promise(function (resolve, reject) {
      redis.hgetall(id, function (err, success) {
        if (!err && success) {
          try {
            success = JSON.parse(success);
          } catch (error) {}
          resolve(success);
        } else {
          resolve("");
        }
      });
    });
    return promise;
  };

  hashGet = function (id, $key) {
    var promise = new Promise(function (resolve, reject) {
      redis.hget(id, $key, function (err, success) {
        resolve(success);
      });
    });
    return promise;
  };

  hashDelete = function (id, key) {
    var promise = new Promise(function (resolve, reject) {
      redis.del(id, key, function (err, response) {
        if (response == 1) {
          resolve(1);
        } else {
          resolve(0);
        }
      });
    });
    return promise;
  };

  listLPush = function (key, data) {
    var promise = new Promise(function (resolve, reject) {
      if (typeof data === "object") {
        data = JSON.stringify(data);
      }
      redis.lpush(key, data, function (err, response) {
        if (response > 0) {
          resolve(response);
        } else {
          resolve(0);
        }
      });
    });
    return promise;
  };

  listLPop = function (key) {
    var promise = new Promise(function (resolve, reject) {
      redis.lpop(key, function (err, success) {
        if (!err && success) {
          try {
            success = JSON.parse(success);
          } catch (error) {}
          resolve(success);
        } else {
          resolve("");
        }
      });
    });
    return promise;
  };

  deleted = function (key) {
    var promise = new Promise(function (resolve, reject) {
      redis.del(key, function (err, response) {
        if (response == 1) {
          resolve(response);
        } else {
          resolve(0);
        }
      });
    });
    return promise;
  };
  hashIncrement = function (key, hashKey, count) {
    var promise = new Promise(function (resolve, reject) {
      redis.hincrby(key, hashKey, count, (err, data) => {
        if (err) {
          reject("-2");
        }
        resolve("1");
      });
    });
    return promise;
  };

  listPushUniq = function (key, value) {
    var promise = new Promise(function (resolve, reject) {
      redis.sadd(key, value, function (err, response) {
        if (response == 1) {
          resolve(1);
        } else {
          resolve(0);
        }
      });
    });
    return promise;
  };

  listPopUniq = function (key) {
    var promise = new Promise(function (resolve, reject) {
      redis.spop(key, function (err, success) {
        if (!err && success) {
          resolve(success);
        } else {
          resolve("err");
        }
      });
    });
    return promise;
  };

  expires = function (key, expire = 0) {
    redis.expire(key, expire);
  };
};

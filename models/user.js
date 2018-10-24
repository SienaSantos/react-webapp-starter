var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var MAX_LOGIN_ATTEMPTS = 5;
var LOCK_TIME = 2 * 60 * 60 * 1000;

var userSchema = new mongoose.Schema({
    email: { type: String, required:true },
    username : {type : String, required: true, unique: true },
    authToken: { type: String, unique:true },
    fullname: { type: String, required:true },
    password: { type: String, required:true },
    user_id: { type: String, required:true },
    isAuthenticated: { type: Boolean, required:false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hasLoggedin: {type: Boolean, required: false},
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number },

},
{
  timestamps : true
});

var reasons = userSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};


userSchema.virtual('isLocked').get(function() {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});


userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcryptjs.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcryptjs.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcryptjs.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    return this.update(updates, cb);
};



userSchema.statics.getAuthenticated = function(username, password, cb) {
    this.findOne({ username: username }, function(err, user) {
        if (err) return cb(err);

        // make sure the user exists
        if (!user) {
          var result = {reason : reasons.NOT_FOUND, lockUntil: 0, loginAttempts: 0}
            return cb(null, null, result);
        }

        // check if the account is currently locked
        if (user.isLocked) {
            // just increment login attempts if account is already locked
            var result = {reason : reasons.MAX_ATTEMPTS, lockUntil: user.lockUntil, loginAttempts: user.loginAttempts}

            return user.incLoginAttempts(function(err) {
              if (err) return cb(err);
              return cb(null, null, result);
            });
        }

        // test for a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) return cb(err);

            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
                // reset attempts and lock info
                var updates = {
                    $set: { loginAttempts: 0 },
                    $unset: { lockUntil: 1 }
                };
                return user.update(updates, function(err) {
                    if (err) return cb(err);
                    return cb(null, user);
                });
            }

            // password is incorrect, so increment login attempts before responding
            user.incLoginAttempts(function(err) {
                var result = {reason : reasons.PASSWORD_INCORRECT, lockUntil: 0, loginAttempts: 0}
                if (err) return cb(err);
                return cb(null, null, result);
            });
        });
    });
};

module.exports = userSchema

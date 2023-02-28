const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, maxLength: 50, unique: true },
    password: { type: String, required: true, maxLength: 150, minLength: 6 },
    numTel: { type: String, maxLength: 15, minLength: 8 },
    language: { type: String, default: "fr", enum: ["fr", "en"] },
    picture: { type: String, default: "user.png" },
    role:{ type: String,  enum: ["condidate", "recruter"] },
    diplomat:{ type: String},
    name_enterprise:{type:String},
    views:{ type: Number, default: 0 },
    cv:{ type: String},
    job_rec:[{
      job_id:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
      },
      date:{type:Date}
    }],
    experience:[{ 
      years:{ type: String},
      description:{ type: String},
      company_name:{ type: String},
      job:{type: String},
      location:{type: String},
      type:{type: String}

     }],
     certificate:[{ 
      years:{ type: String},
      institue:{ type: String},
      certif_name:{ type: String},
     }],
     study:[{ 
      years:{ type: String},
      description:{ type: String},
      ins_name:{ type: String},
     
     }],
     resume:{ type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", Users);

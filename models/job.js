const mongoose = require("mongoose");

const Jobs = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    recruter: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    year:{ type: String},
    time_start:{ type: String},
    time_work:{ type: String},
    isActive: { type: Boolean, default:true },
    cv:[
        {
            path_CV:{ type: String},
            owner:{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            }
        }   
    ],
    description:{ type: String},
    type:{ type: String},
    diplomat:{ type: String},
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
        },
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jobs", Jobs);
